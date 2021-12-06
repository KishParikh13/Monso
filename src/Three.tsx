import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree} from "react-three-fiber";
import { Stats, Plane, Sphere, Dodecahedron, TransformControls, OrbitControls } from "@react-three/drei";
import * as three from "three";

import "./styles.css";

const Scene = () => {
  return (
    <>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[5, 3, 5]} />

      <TransformControls mode="translate">
        <Sphere>
          <meshBasicMaterial attach="material" color="hotpink" />
        </Sphere> 
      </TransformControls>
    </>
  );
};

const Three = () => {
  return (
    <div
      style={{
        height: "98vh",
        width: "100%",
      }}
    >
      <Canvas
        // concurrent
        camera={{
          position: [4, 4, 4],
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934");
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Three;
