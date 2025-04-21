import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function DynamicModel({ path, scale, position, rotation }) {
  const { scene } = useGLTF(path);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
        modelRef.current.rotation.y += 0.015;
    }
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef}
      scale={scale} 
      position={position} 
      rotation={rotation}
    />
  );
}
