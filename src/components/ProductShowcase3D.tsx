import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

interface ProductShowcase3DProps {
  productName?: string
  color?: string
}

function ProductModel({ color = '#0ea5e9' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      <mesh position={[0, 0, 1.1]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

const ProductShowcase3D = ({ productName = 'Product', color = '#0ea5e9' }: ProductShowcase3DProps) => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
        <Environment preset="city" />
        {/* @ts-ignore - PresentationControls config props */}
        <PresentationControls
          global
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <ProductModel color={color} />
        </PresentationControls>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <h3 className="text-white text-xl font-bold mb-2">{productName}</h3>
        <p className="text-gray-300 text-sm">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default ProductShowcase3D
