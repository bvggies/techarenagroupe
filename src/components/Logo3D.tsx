import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function RotatingLogo() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <MeshDistortMaterial
        color="#0ea5e9"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

function LogoText() {
  return (
    <Text
      position={[0, -2, 0]}
      fontSize={0.5}
      color="#0ea5e9"
      anchorX="center"
      anchorY="middle"
    >
      TechArena
    </Text>
  )
}

const Logo3D = () => {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        <RotatingLogo />
        <LogoText />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}

export default Logo3D
