"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";

const CARD_URL = "/data/card.glb";
const LANYARD_URL = "/images/lanyard.png";

function Card({
  frontImage,
  backImage,
  drag,
  setDrag,
  cardRef,
  position = [2, 0, 0],
}) {
  const { nodes, materials } = useGLTF(CARD_URL);
  const frontTexture = useTexture(frontImage || LANYARD_URL);
  const backTexture = useTexture(backImage || LANYARD_URL);

  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "grab" : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setDrag(true);
    event.target.setPointerCapture(event.pointerId);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    setDrag(false);
    document.body.style.cursor = hovered ? "grab" : "auto";
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    setHovered(false);
  };

  return (
    <RigidBody
      ref={cardRef}
      position={position}
      colliders={false}
      enabledTranslations
      enabledRotations
      linearDamping={4}
      angularDamping={5}
      restitution={0.2}
      friction={0.8}
      gravityScale={1}
      type="dynamic"
      userData={{ type: "card" }}
    >
      <group
        ref={groupRef}
        scale={2.25}
        rotation={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh
          geometry={nodes.card?.geometry}
          material={materials.card}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={frontTexture}
            transparent
            roughness={0.45}
            metalness={0.08}
          />
        </mesh>

        {nodes.cardBack?.geometry && (
          <mesh
            geometry={nodes.cardBack.geometry}
            material={materials.cardBack || materials.card}
            rotation={[0, Math.PI, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={backTexture}
              transparent
              roughness={0.5}
              metalness={0.08}
            />
          </mesh>
        )}

        <mesh position={[0, -0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.08]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>

      <CuboidCollider args={[0.95, 1.35, 0.12]} />
    </RigidBody>
  );
}

function Band({
  position = [0, 0, 0],
  gravity = [0, -40, 0],
  frontImage,
  backImage,
  lanyardWidth = 0.055,
}) {
  const band = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);

  const [drag, setDrag] = useState(false);

  const { camera, size } = useThree();

  const segment1 = useRef(null);
  const segment2 = useRef(null);
  const segment3 = useRef(null);
  const segment4 = useRef(null);

  const lineMaterial = useRef(null);

  useRopeJoint(fixed, j1, [0, 0, 0], [0, 0, 0], 1.1);
  useRopeJoint(j1, j2, [0, 0, 0], [0, 0, 0], 1.1);
  useRopeJoint(j2, j3, [0, 0, 0], [0, 0, 0], 1.1);
  useSphericalJoint(j3, card, [0, 0, 0], [0, 1.35, 0]);

  const pointer = useRef(new THREE.Vector3());
  const dragOffset = useRef(new THREE.Vector3());

  const linePoints = useRef([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);

  useEffect(() => {
    if (!lineMaterial.current) return;

    lineMaterial.current.resolution.set(size.width, size.height);
  }, [size]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!card.current) return;

      card.current.applyImpulse(
        {
          x: 0.65,
          y: 0.15,
          z: 0,
        },
        true
      );

      card.current.applyTorqueImpulse(
        {
          x: 0,
          y: 0,
          z: -0.12,
        },
        true
      );
    }, 180);

    return () => clearTimeout(timeout);
  }, []);

  useFrame((state) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current
    ) {
      return;
    }

    if (drag) {
      const vector = new THREE.Vector3(
        state.pointer.x,
        state.pointer.y,
        0
      );

      vector.unproject(camera);

      const direction = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / direction.z;

      pointer.current
        .copy(camera.position)
        .add(direction.multiplyScalar(distance));

      const target = pointer.current.clone().add(dragOffset.current);

      card.current.setNextKinematicTranslation(target);
      card.current.wakeUp();

      j3.current.wakeUp();
      j2.current.wakeUp();
      j1.current.wakeUp();
    }

    const positions = [
      fixed.current.translation(),
      j1.current.translation(),
      j2.current.translation(),
      j3.current.translation(),
      card.current.translation(),
    ];

    positions.forEach((position, index) => {
      linePoints.current[index].set(
        position.x,
        position.y,
        position.z
      );
    });

    const curve = new THREE.CatmullRomCurve3(
      linePoints.current
    );

    const points = curve.getPoints(32);

    const positionsArray = [];

    points.forEach((point) => {
      positionsArray.push(point.x, point.y, point.z);
    });

    const geometry = new LineGeometry();
    geometry.setPositions(positionsArray);

    if (segment1.current) {
      segment1.current.geometry.dispose();
      segment1.current.geometry = geometry;
    }

    if (lineMaterial.current) {
      lineMaterial.current.linewidth = lanyardWidth * 10;
    }

    if (card.current && !drag) {
      const velocity = card.current.linvel();

      card.current.setAngvel({
        x: velocity.x * 0.03,
        y: velocity.y * 0.03,
        z: velocity.z * 0.04,
      });
    }
  });

  const handleCardPointerDown = (event) => {
    event.stopPropagation();

    if (!card.current) return;

    const current = card.current.translation();

    const hitPoint = event.point;

    dragOffset.current.set(
      current.x - hitPoint.x,
      current.y - hitPoint.y,
      current.z - hitPoint.z
    );

    card.current.setBodyType("kinematicPosition");
    card.current.wakeUp();

    setDrag(true);

    if (event.target?.setPointerCapture) {
      event.target.setPointerCapture(event.pointerId);
    }
  };

  const handleCardPointerUp = (event) => {
    event.stopPropagation();

    if (!card.current) return;

    card.current.setBodyType("dynamic");
    card.current.wakeUp();

    setDrag(false);
  };

  return (
    <group position={position}>
      <RigidBody
        ref={fixed}
        type="fixed"
        position={[0, 4.4, 0]}
      >
        <BallCollider args={[0.12]} />
      </RigidBody>

      <RigidBody
        ref={j1}
        position={[0.35, 3.35, 0]}
        colliders={false}
        linearDamping={2}
        angularDamping={3}
      >
        <BallCollider args={[0.1]} />
      </RigidBody>

      <RigidBody
        ref={j2}
        position={[0.7, 2.25, 0]}
        colliders={false}
        linearDamping={2}
        angularDamping={3}
      >
        <BallCollider args={[0.1]} />
      </RigidBody>

      <RigidBody
        ref={j3}
        position={[1.05, 1.15, 0]}
        colliders={false}
        linearDamping={2}
        angularDamping={3}
      >
        <BallCollider args={[0.11]} />
      </RigidBody>

      <RigidBody
        ref={card}
        position={[1.35, -0.15, 0]}
        colliders={false}
        linearDamping={3.5}
        angularDamping={4.5}
        restitution={0.15}
        friction={0.9}
        onPointerDown={handleCardPointerDown}
        onPointerUp={handleCardPointerUp}
      >
        <Card
          frontImage={frontImage}
          backImage={backImage}
          drag={drag}
          setDrag={setDrag}
          cardRef={card}
          position={[0, 0, 0]}
        />
      </RigidBody>

      <line ref={segment1} />
    </group>
  );
}

function LanyardScene({
  position,
  gravity,
  frontImage,
  backImage,
  lanyardWidth,
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{
        position: [0, 0, 20],
        fov: 18,
        near: 0.1,
        far: 100,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      shadows
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
      }}
    >
      <ambientLight intensity={1.7} />

      <directionalLight
        position={[4, 8, 10]}
        intensity={2}
        castShadow
      />

      <directionalLight
        position={[-4, 3, 5]}
        intensity={1}
      />

      <Physics
        gravity={gravity}
        timeStep="vary"
        interpolate
      >
        <Band
          position={position}
          gravity={gravity}
          frontImage={frontImage}
          backImage={backImage}
          lanyardWidth={lanyardWidth}
        />
      </Physics>
    </Canvas>
  );
}

export default function Lanyard({
  position = [0, 0, 0],
  gravity = [0, -40, 0],
  frontImage,
  backImage,
  lanyardWidth = 0.055,
}) {
  return (
    <div
      className="lanyard-wrapper"
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
      }}
    >
      <LanyardScene
        position={position}
        gravity={gravity}
        frontImage={frontImage}
        backImage={backImage}
        lanyardWidth={lanyardWidth}
      />
    </div>
  );
}

useGLTF.preload(CARD_URL);