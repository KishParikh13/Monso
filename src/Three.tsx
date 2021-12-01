import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree} from "react-three-fiber";
import { Stats } from "@react-three/drei";
import * as three from "three";
import { OrbitControls } from "@react-three/drei";

import "./styles.css";

function Dodecahedron() {
    const { viewport } = useThree()
    // viewport = canvas in 3d units (meters)
  
    const dodecahedron = useRef<three.Mesh>();
    useFrame(({ mouse }) => {
      const x = (mouse.x * viewport.width) / 2
      const z = ((mouse.y * viewport.height) / 2)
      dodecahedron.current!.position.set(x, 0, -z)
      dodecahedron.current!.rotation.set(-z, x, 0)
    })
  
    return (
      <mesh ref={dodecahedron} castShadow>
        <dodecahedronBufferGeometry attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh>
    )
  }
  
const Sphere = () => {
    const { viewport } = useThree()
  const sphere = useRef<three.Mesh>();

  useFrame(({ mouse }) => {

    const x = (mouse.x * viewport.width) / 2
    const z = ((mouse.y * viewport.height) / 2)
    sphere.current!.rotation.x += 0.01;
    sphere.current!.rotation.y += 0.01;
    sphere.current!.position.set(-x, 0, z);

    // sphere.current!.position.z += mouse;
  });

  return (
    <mesh ref={sphere}>
      <sphereBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0391BA" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      <Sphere />
      <Dodecahedron />
    </>
  );
};

const Three = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        // concurrent
        camera={{
          position: [2, 6, 2],
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934");
        }}
      >
        {/* <Stats /> */}
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Three;
