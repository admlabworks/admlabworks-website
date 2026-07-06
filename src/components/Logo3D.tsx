'use client'

import { Suspense, useRef, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { usePreloaderDone } from '@/context/PreloaderContext'

const mouse = { x: 0, y: 0 }
let cursorWeight = 1
let mouseInWindow = true
let trackingEnabled = false

function Model() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/logo.glb')
  const initialized = useRef(false)
  const baseY = useRef(0)

  useLayoutEffect(() => {
    if (initialized.current) return
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3()
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        box.expandByObject(child)
      }
    })
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const s = maxDim > 0 ? 3.0 / maxDim : 10
    scene.scale.set(s, s, s)
    scene.position.set(-center.x * s, -center.y * s, -center.z * s)
    baseY.current = -center.y * s
    scene.updateMatrix()
    initialized.current = true
  }, [scene])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.y = baseY.current + Math.sin(t * 1.5) * 0.3
    let targetWeight = 1
    if (!mouseInWindow) {
      targetWeight = 0
    } else {
      const ctaEl = document.querySelector('.hero-cta')
      if (ctaEl) {
        const rect = ctaEl.getBoundingClientRect()
        const cursorY = (1 - mouse.y) / 2 * window.innerHeight
        const dist = cursorY - rect.bottom
        if (dist > 0) targetWeight = Math.max(0, 1 - dist / 60)
      }
    }
    cursorWeight += (targetWeight - cursorWeight) * 0.08
    const idleYaw = Math.sin(t * 0.25) * 0.08
    let targetPitch = 0
    let targetYaw = idleYaw
    if (trackingEnabled) {
      targetPitch = -mouse.y * 0.8 * cursorWeight
      targetYaw += mouse.x * 0.8 * cursorWeight
    }
    groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * 0.08
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * 0.08
  })

  return <primitive ref={groupRef} object={scene} />
}

export default function Logo3D() {
  const { isPreloaderDone } = usePreloaderDone()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onEnter = () => { mouseInWindow = true }
    const onLeave = () => { mouseInWindow = false }
    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    if (!isPreloaderDone) return
    const timer = setTimeout(() => { trackingEnabled = true }, 2000)
    return () => clearTimeout(timer)
  }, [isPreloaderDone])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0)
        state.gl.domElement.style.background = 'transparent'
        const container = state.gl.domElement.closest('.hero-logo-3d')
        if (container) container.classList.add('canvas-ready')
      }}
    >
      <ambientLight intensity={0.25} />
      <hemisphereLight args={['#ffffff', '#1a1a1a', 0.3]} />
      <directionalLight position={[0, 5, 1]} intensity={1.2} />
      <directionalLight position={[0, 0.5, 4]} intensity={0.45} />
      <directionalLight position={[4, 0, 1]} intensity={0.4} />
      <directionalLight position={[-4, 0, 1]} intensity={0.25} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
