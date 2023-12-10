import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import beltlVertexShader from "../shaders/particlesVertex.glsl";
import beltFragmentShader from "../shaders/particlesFragment.glsl";
import {
  generateRandomTriangleCoordinates,
  applyBouncingAnimation,
  TRIANGLE_SIZE,
  PARTICLE_COUNT,
} from "../components/ParticlesLogic.jsx";

gsap.registerPlugin(ScrollTrigger);

const clock = new Clock();

export default function Model(props) {
  const beltMaterial = useRef();
  const modelRef = useRef();

  const particlesPosition = useMemo(() => {
    return generateRandomTriangleCoordinates(TRIANGLE_SIZE, PARTICLE_COUNT);
  }, []);

  const BeltMaterial = shaderMaterial(
    {
      time: 0.0,
      progress: 0.0,
    },
    beltlVertexShader,
    beltFragmentShader
  );
  extend({ BeltMaterial });

  useFrame(() => {
    const time = clock.getElapsedTime();
    const { array } = modelRef.current.geometry.attributes.position;
    applyBouncingAnimation(array, time);

    modelRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    const { uniforms } = beltMaterial.current;

    gsap.to(uniforms.progress, {
      duration: 10,
      scrollTrigger: {
        trigger: ".section1",
        endTrigger: ".section6",
        scrub: 10,
        start: "center top",
        end: "center bottom",
      },
      value: 1,
    });

    gsap.to(modelRef.current.position, {
      ease: "none",
      scrollTrigger: {
        trigger: ".section1",
        endTrigger: ".section16",
        scrub: 5,
        start: "top top",
      },
      z: 2000,
      duration: 5,
    });
  }, [beltMaterial, modelRef]);
  useEffect(() => {
    const cleanup = () => {
      beltMaterial.current.dispose();
      modelRef.current.geometry.dispose();
      modelRef.current.material.dispose();
    };

    return cleanup;
  }, [beltMaterial, modelRef]);

  return (
    <group {...props} dispose={null}>
      <points
        ref={modelRef}
        position={[0, 0, 10]}
        scale={[-12, 9, -1]}
        rotation={[0, 0, 0]}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <beltMaterial
          ref={beltMaterial}
          alphaTest={0.001}
          sizeAttenuation={true}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}
