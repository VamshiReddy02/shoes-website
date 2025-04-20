import { useGLTF } from '@react-three/drei';

export default function DynamicModel({ path, scale, position, rotation }) {
  const { scene } = useGLTF(path);

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position} 
      rotation={rotation}
    />
  );
}
