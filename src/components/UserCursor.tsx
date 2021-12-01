
import React, { Suspense, useRef } from "react";
import { User } from "../types";
import { connectionIdToColor } from "../utils";
import { Canvas, useFrame, useThree} from "react-three-fiber";
import { Stats } from "@react-three/drei";
import * as three from "three";
import { OrbitControls } from "@react-three/drei";

export interface UserCursorProps {
  cursor: { x: number; y: number };
  connectionId: number;
  isActive: boolean;
}


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

export const UserCursor = React.memo(
  ({ cursor, connectionId, isActive }: UserCursorProps) => {
    return (
      <>
      <Dodecahedron />
      {/* <circle
        cx={cursor.x}
        cy={cursor.y}
        r={4}
        fill={isActive ? connectionIdToColor(connectionId) : "grey"}
      /> */}
      </>
    );
  }
);