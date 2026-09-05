"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

extend({
  MeshLineGeometry,
  MeshLineMaterial,
});

const FRONT_UV_RECT = {
  x: 0,
  y: 0,
  w: 0.5,
  h: 0.755,
};

const BACK_UV_RECT = {
  x: 0.5,
  y: 0,
  w: 0.5,
  h: 0.757,
};

export default function Lanyard({
  position = [0, 0, 17],
  gravity = [0, -40, 0],
  fov = 18,
  transparent = true,
  frontImage = "/images/profile.png",
  backImage = null,
  imageFit = "cover",
  lanyardImage = "/images/lanyard.png",
  lanyardWidth = 0.9,
}) {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{
          position,
          fov,
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          alpha: transparent,
          antialias: false,
          powerPreference: "high-performance",
        }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor(
            new THREE.Color(0x000000),
            transparent ? 0 : 1
          );
        }}
      >
        <ambientLight intensity={1.8} />

        <directionalLight
          position={[2, 4, 8]}
          intensity={2.5}
        />

        <directionalLight
          position={[-3, 1, 5]}
          intensity={1.2}
        />

        <Physics
          gravity={gravity}
          timeStep={1 / 60}
          interpolate
        >
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 35,
  minSpeed = 0,
  isMobile = false,
  frontImage = "/images/profile.png",
  backImage = null,
  imageFit = "cover",
  lanyardImage = "/images/lanyard.png",
  lanyardWidth = 0.9,
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const ang = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const rot = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const dir = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const segmentProps = useMemo(
    () => ({
      type: "dynamic",
      canSleep: true,
      angularDamping: 5,
      linearDamping: 5,
      colliders: false,
    }),
    []
  );

  const { nodes, materials } = useGLTF(
    "/data/card.glb"
  );

  const texture = useTexture(lanyardImage);

  const frontTex = useTexture(
    frontImage || "/images/profile.png"
  );

  const backTex = useTexture(
    backImage || "/images/profile.png"
  );

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;

    if (!baseMap) {
      return null;
    }

    if (!frontImage && !backImage) {
      return baseMap;
    }

    const baseImg = baseMap.image;

    if (!baseImg || !frontTex.image) {
      return baseMap;
    }

    const width = baseImg.width;
    const height = baseImg.height;

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return baseMap;
    }

    ctx.drawImage(
      baseImg,
      0,
      0,
      width,
      height
    );

    const drawFitted = (img, rect) => {
      if (!img) {
        return;
      }

      const rx = rect.x * width;
      const ry = rect.y * height;
      const rw = rect.w * width;
      const rh = rect.h * height;

      const scaleMode =
        imageFit === "contain"
          ? Math.min
          : Math.max;

      const scale = scaleMode(
        rw / img.width,
        rh / img.height
      );

      const dw = img.width * scale;
      const dh = img.height * scale;

      const dx =
        rx + (rw - dw) / 2;

      const dy =
        ry + (rh - dh) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(
        rx,
        ry,
        rw,
        rh
      );
      ctx.clip();

      ctx.drawImage(
        img,
        dx,
        dy,
        dw,
        dh
      );

      ctx.restore();
    };

    drawFitted(
      frontTex.image,
      FRONT_UV_RECT
    );

    if (backImage && backTex.image) {
      drawFitted(
        backTex.image,
        BACK_UV_RECT
      );
    }

    const composite =
      new THREE.CanvasTexture(canvas);

    composite.colorSpace =
      THREE.SRGBColorSpace;

    composite.flipY =
      baseMap.flipY;

    composite.anisotropy = 2;
    composite.needsUpdate = true;

    return composite;
  }, [
    frontImage,
    backImage,
    imageFit,
    frontTex,
    backTex,
    materials.base.map,
  ]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] =
    useState(false);

  const [hovered, hover] =
    useState(false);

  useRopeJoint(
    fixed,
    j1,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );

  useRopeJoint(
    j1,
    j2,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );

  useRopeJoint(
    j2,
    j3,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );

  useSphericalJoint(
    j3,
    card,
    [
      [0, 0, 0],
      [0, 1.5, 0],
    ]
  );

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? "grabbing"
        : "grab"
      : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (
      !card.current ||
      !j1.current ||
      !j2.current ||
      !j3.current
    ) {
      return;
    }

    if (dragged) {
      vec
        .set(
          state.pointer.x,
          state.pointer.y,
          0.5
        )
        .unproject(state.camera);

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize();

      vec.add(
        dir.multiplyScalar(
          state.camera.position.length()
        )
      );

      card.current.wakeUp();
      j1.current.wakeUp();
      j2.current.wakeUp();
      j3.current.wakeUp();

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      !fixed.current ||
      !band.current
    ) {
      return;
    }

    const points = [j1, j2];

    points.forEach((ref) => {
      if (!ref.current) {
        return;
      }

      if (!ref.current.lerped) {
        ref.current.lerped =
          new THREE.Vector3().copy(
            ref.current.translation()
          );
      }

      const distance =
        ref.current.lerped.distanceTo(
          ref.current.translation()
        );

      const clampedDistance =
        Math.max(
          0.1,
          Math.min(1, distance)
        );

      ref.current.lerped.lerp(
        ref.current.translation(),
        delta *
          (minSpeed +
            clampedDistance *
              (maxSpeed - minSpeed))
      );
    });

    curve.points[0].copy(
      j3.current.translation()
    );

    curve.points[1].copy(
      j2.current.lerped
    );

    curve.points[2].copy(
      j1.current.lerped
    );

    curve.points[3].copy(
      fixed.current.translation()
    );

    band.current.geometry.setPoints(
      curve.getPoints(
        isMobile ? 10 : 16
      )
    );

    if (!dragged) {
      ang.copy(
        card.current.angvel()
      );

      rot.copy(
        card.current.rotation()
      );

      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.18,
        z: ang.z,
      });
    }
  });

  curve.curveType = "chordal";

  texture.wrapS =
    texture.wrapT =
      THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
        />

        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? "kinematicPosition"
              : "dynamic"
          }
        >
          <CuboidCollider
            args={[0.8, 1.125, 0.01]}
          />

          <group
            scale={4}
            position={[
              0,
              -1.2,
              -0.05,
            ]}
            onPointerOver={() =>
              hover(true)
            }
            onPointerOut={() =>
              hover(false)
            }
            onPointerUp={(event) => {
              event.target.releasePointerCapture(
                event.pointerId
              );

              drag(false);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();

              event.target.setPointerCapture(
                event.pointerId
              );

              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(
                    vec.copy(
                      card.current.translation()
                    )
                  )
              );
            }}
          >
            <mesh
              geometry={
                nodes.card.geometry
              }
            >
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={2}
                clearcoat={0}
                clearcoatRoughness={0.3}
                roughness={0.9}
                metalness={0.35}
                emissive={
                  new THREE.Color(
                    0x181818
                  )
                }
                emissiveIntensity={0.25}
              />
            </mesh>

            <mesh
              geometry={
                nodes.clip.geometry
              }
              material={materials.metal}
              material-roughness={0.45}
            />

            <mesh
              geometry={
                nodes.clamp.geometry
              }
              material={materials.metal}
            />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />

        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={
            isMobile
              ? [700, 1400]
              : [900, 900]
          }
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/data/card.glb");
