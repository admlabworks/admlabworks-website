'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  imageSrc: string
  grid?: number
  mouse?: number
  strength?: number
  relaxation?: number
}

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max))
}

export default function ImageDistortion({
  imageSrc,
  grid = 34,
  mouse = 0.25,
  strength = 1,
  relaxation = 0.9,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroyed = false
    let rafId = 0
    let renderer: THREE.WebGLRenderer | null = null
    let geometry: THREE.PlaneGeometry | null = null
    let material: THREE.ShaderMaterial | null = null
    let camera: THREE.OrthographicCamera | null = null
    let dataTexture: THREE.DataTexture | null = null
    let scene: THREE.Scene | null = null
    let width = 0
    let height = 0

    const mouseState = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vX: 0, vY: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / width
      const y = (e.clientY - rect.top) / height
      mouseState.vX = x - mouseState.prevX
      mouseState.vY = y - mouseState.prevY
      mouseState.x = x
      mouseState.y = y
      mouseState.prevX = x
      mouseState.prevY = y
    }

    const handleResize = () => {
      if (!renderer || !material || !camera) return
      const w = container.offsetWidth
      const h = container.offsetHeight
      if (w === 0 || h === 0) return
      width = w
      height = h
      renderer.setSize(w, h)

      const aspect = w / h
      camera.left = -0.5 * aspect
      camera.right = 0.5 * aspect
      camera.top = 0.5
      camera.bottom = -0.5
      camera.updateProjectionMatrix()
    }

    const init = (img: HTMLImageElement) => {
      if (destroyed) return

      width = container.offsetWidth
      height = container.offsetHeight
      if (width === 0 || height === 0) {
        rafId = requestAnimationFrame(() => init(img))
        return
      }

      scene = new THREE.Scene()

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 1)
      container.appendChild(renderer.domElement)

      camera = new THREE.OrthographicCamera(
        -0.5, 0.5,
        0.5, -0.5,
        -1000, 1000,
      )
      camera.position.set(0, 0, 2)
      camera.lookAt(0, 0, 0)

      const texture = new THREE.Texture(img)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.needsUpdate = true

      const texSize = grid
      const texData = new Float32Array(2 * texSize * texSize)

      dataTexture = new THREE.DataTexture(texData, texSize, texSize, THREE.RGFormat, THREE.FloatType)
      dataTexture.magFilter = THREE.NearestFilter
      dataTexture.minFilter = THREE.NearestFilter

      material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: texture },
          uDataTexture: { value: dataTexture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uDataTexture;
          uniform sampler2D uTexture;
          varying vec2 vUv;
          void main() {
            vec4 offset = texture2D(uDataTexture, vUv);
            vec4 color = texture2D(uTexture, vUv - 0.02 * offset.rg);
            gl_FragColor = color;
          }
        `,
      })

      const aspect = width / height
      geometry = new THREE.PlaneGeometry(aspect, 1, 1, 1)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', handleResize)
      handleResize()

      const render = () => {
        if (destroyed || !renderer || !scene || !camera || !dataTexture || !material) return

        const data = dataTexture.image.data as Float32Array
        for (let i = 0; i < data.length; i += 2) {
          data[i] *= relaxation
          data[i + 1] *= relaxation
        }

        const gridMouseX = texSize * mouseState.x
        const gridMouseY = texSize * (1 - mouseState.y)
        const maxDist = texSize * mouse
        const aspect = height / width

        for (let i = 0; i < texSize; i++) {
          for (let j = 0; j < texSize; j++) {
            const distance = ((gridMouseX - i) ** 2) / aspect + (gridMouseY - j) ** 2
            const maxDistSq = maxDist ** 2
            if (distance < maxDistSq) {
              const index = 2 * (i + texSize * j)
              const power = clamp(maxDist / Math.sqrt(distance), 0, 10)
              data[index] += strength * 100 * mouseState.vX * power
              data[index + 1] -= strength * 100 * mouseState.vY * power
            }
          }
        }

        mouseState.vX *= 0.9
        mouseState.vY *= 0.9
        dataTexture.needsUpdate = true

        renderer.render(scene, camera)
        rafId = requestAnimationFrame(render)
      }
      render()
    }

    container.style.aspectRatio = '16 / 9'

    const preload = new Image()
    preload.crossOrigin = 'anonymous'
    preload.onload = () => {
      if (destroyed) return
      const ar = preload.naturalWidth / preload.naturalHeight
      container.style.aspectRatio = `${ar} / 1`
      init(preload)
    }
    preload.src = imageSrc

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (renderer) {
        renderer.dispose()
        geometry?.dispose()
        material?.dispose()
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement)
        }
      }
    }
  }, [imageSrc, grid, mouse, strength, relaxation])

  return (
    <div
      ref={containerRef}
      className="distortion-wrap"
    >
      <img src={imageSrc} alt="" className="distortion-fallback" />
    </div>
  )
}
