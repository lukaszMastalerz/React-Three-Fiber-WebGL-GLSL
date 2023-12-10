import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useFrame, extend, useLoader } from "@react-three/fiber";
import bgVertexShader from "../shaders/bVertex.glsl";
import bgFragmentShader from "../shaders/bFragment.glsl";
import bgFragmentShader2 from "../shaders/fragment2.glsl";
import bgFragmentShader3 from "../shaders/fragment3.glsl";
import bgFragmentShader4 from "../shaders/fragment4.glsl";
import bgFragmentShader5 from "../shaders/fragment5.glsl";
import triangleBgFragmentShader from "../shaders/triangleFragment.glsl";
import triangleBgVertexShader from "../shaders/triangleVertex.glsl";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import ResizablePlanesTriangle from "../components/ResponsivenessTriangles.jsx";
import {
  EffectComposer,
  SelectiveBloom,
  Selection,
  Select,
} from "@react-three/postprocessing";

gsap.registerPlugin(ScrollTrigger);

const clock = new Clock();

const mouse = { x: 0, y: 0 };

const handleMouseMove = (event) => {
  mouse.x = event.clientX / window.innerWidth;
  mouse.y = 1 - event.clientY / window.innerHeight;
};

document.addEventListener("mousemove", handleMouseMove);

export default function Model(props) {
  const bgMaterials = Array.from({ length: 5 }, () => useRef());
  const planeRefs = Array.from({ length: 6 }, () => useRef());

  const [bgMaterial, bgMaterial2, bgMaterial3, bgMaterial4, bgMaterial5] =
    bgMaterials;
  const [planeRef, planeRef2, planeRef3, planeRef4, planeRef5, planeRef6] =
    planeRefs;

  const lightRef2 = useRef();
  const triangleBgMaterial = useRef();

  const bg1 = useLoader(TextureLoader, "1bjj_text_small.jpg");
  const bg2 = useLoader(TextureLoader, "2bjj_text_small.jpg");
  const bg3 = useLoader(TextureLoader, "3bjj_text_small.jpg");
  const bg4 = useLoader(TextureLoader, "4bjj_text_small.jpg");
  const bg5 = useLoader(TextureLoader, "5bjj_text_small.jpg");
  const triangleBg = useLoader(TextureLoader, "triangle.png");

  useEffect(() => {
    const animateMaterials = (materials) => {
      materials.forEach(
        ({ material, trigger, endTrigger, scrub, start, value }) => {
          gsap.to(material, {
            ease: "none",
            scrollTrigger: {
              trigger,
              endTrigger,
              scrub,
              start,
            },
            value,
          });
        }
      );
    };

    const materials = [
      {
        material: bgMaterial.current.uniforms.progress,
        trigger: ".section1",
        endTrigger: null,
        scrub: 3,
        start: "center center",
        value: 0.5,
      },
      {
        material: bgMaterial2.current.uniforms.progress,
        trigger: ".section1",
        endTrigger: ".section3",
        scrub: 3,
        start: "center 50px",
        value: 2.0,
      },
      {
        material: bgMaterial3.current.uniforms.progress,
        trigger: ".section2",
        endTrigger: ".section3",
        scrub: 3,
        start: "center 50px",
        value: 1.5,
      },
      {
        material: bgMaterial4.current.uniforms.progress,
        trigger: ".section3",
        endTrigger: ".section4",
        scrub: 3,
        start: "center 50px",
        value: 1.0,
      },
      {
        material: bgMaterial5.current.uniforms.progress,
        trigger: ".section4",
        endTrigger: ".section5",
        scrub: 3,
        start: "center 50px",
        value: 1.0,
      },
    ];

    animateMaterials(materials);

    const triangleMaterials = [
      {
        material: bgMaterial.current.uniforms.triangleProgress,
        trigger: ".section1",
        endTrigger: null,
        scrub: 3,
        start: "top center",
        value: 1.0,
      },
      {
        material: bgMaterial2.current.uniforms.triangleProgress,
        trigger: ".section1",
        endTrigger: ".section2",
        scrub: 3,
        start: "center -50px",
        value: 1.0,
      },
      {
        material: bgMaterial3.current.uniforms.triangleProgress,
        trigger: ".section2",
        endTrigger: ".section3",
        scrub: 3,
        start: "center -50px",
        value: 1.0,
      },
      {
        material: bgMaterial4.current.uniforms.triangleProgress,
        trigger: ".section3",
        endTrigger: ".section4",
        scrub: 3,
        start: "center -50px",
        value: 1.0,
      },
      {
        material: bgMaterial5.current.uniforms.triangleProgress,
        trigger: ".section4",
        endTrigger: ".section5",
        scrub: 3,
        start: "center -50px",
        value: 1.0,
      },
    ];

    animateMaterials(triangleMaterials);

    const planes = [
      {
        tl: gsap.timeline({
          ease: "none",
          scrollTrigger: { trigger: ".section2", scrub: 3, start: "top 15%" },
        }),
        ref: planeRef2,
      },
      {
        tl: gsap.timeline({
          ease: "none",
          delay: 5,
          scrollTrigger: { trigger: ".section3", scrub: 3, start: "top 15%" },
        }),
        ref: planeRef3,
      },
      {
        tl: gsap.timeline({
          ease: "none",
          delay: 5,
          scrollTrigger: { trigger: ".section4", scrub: 3, start: "top 15%" },
        }),
        ref: planeRef4,
      },
      {
        tl: gsap.timeline({
          ease: "none",
          delay: 5,
          scrollTrigger: { trigger: ".section5", scrub: 3, start: "top 15%" },
        }),
        ref: planeRef5,
      },
    ];

    planes.forEach(({ tl, ref }) => {
      tl.to(ref.current.position, { y: -0.25 })
        .to(ref.current.position, { z: -20 })
        .to(ref.current.scale, { x: 0, y: 0 });
    });

    const planeAnimations = [
      {
        target: planeRef.current.position,
        ease: "none",
        scrollTrigger: { trigger: ".section1", scrub: 3, start: "top -15%" },
        values: { z: -20 },
      },
      {
        target: planeRef.current.scale,
        ease: "none",
        scrollTrigger: { trigger: ".section1", scrub: 3, start: "top -15%" },
        values: { x: 0, y: 0 },
      },
      {
        target: planeRef6.current.scale,
        ease: "none",
        scrollTrigger: {
          trigger: ".section4",
          scrub: 2,
          start: "center -130%",
        },
        values: { x: 1.2, y: 1.5 },
      },
      {
        target: planeRef6.current.position,
        ease: "none",
        scrollTrigger: {
          trigger: ".section4",
          scrub: 2,
          start: "center -130%",
        },
        values: { z: -2 },
      },
    ];

    planeAnimations.forEach(({ target, ease, scrollTrigger, values }) => {
      gsap.to(target, {
        ease,
        scrollTrigger,
        ...values,
      });
    });

    // ---------mouse

    const handleMouseMove = (event) => {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = 1 - event.clientY / window.innerHeight;
      if (triangleBgMaterial.current) {
        triangleBgMaterial.current.uniforms.mouse.value = [mouse.x, mouse.y];
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return () => {
      triangleBgMaterial.dispose();
      bgMaterial.dispose();
      bgMaterial2.dispose();
      bgMaterial3.dispose();
      bgMaterial4.dispose();
      bgMaterial5.dispose();
    };
  }, [
    triangleBgMaterial,
    bgMaterial,
    bgMaterial2,
    bgMaterial3,
    bgMaterial4,
    bgMaterial5,
  ]);

  useFrame(() => {
    if (triangleBgMaterial.current) {
      triangleBgMaterial.current.uniforms.time.value += clock.getElapsedTime();
    }
  });

  return (
    <group {...props} dispose={null}>
      <Selection>
        <EffectComposer autoClear={false}>
          <SelectiveBloom
            intensity={6.0}
            luminanceThreshold={0.01}
            luminanceSmoothing={0.2}
            lights={[lightRef2]}
            selection={[planeRef6]}
          />
        </EffectComposer>
        <Select enabled>
          <mesh
            ref={planeRef6}
            position={[0, 0.5, 6]}
            rotation={[-0.268, 0, 0]}
            scale={[7.2, 7.5, 1]}
          >
            <planeGeometry args={[15, 7, 1, 1]} />
            <triangleBgMaterial
              ref={triangleBgMaterial}
              triangleTexture={triangleBg}
              transparent={true}
            />
            <ambientLight intensity={0.1} ref={lightRef2} />
          </mesh>
        </Select>
      </Selection>
      <mesh ref={planeRef}>
        <planeGeometry args={[15, 7, 8, 8]} />
        <bgMaterial ref={bgMaterial} bgTexture1={bg1} />
      </mesh>
      <mesh ref={planeRef2} position={[0, -13, 0]}>
        <planeGeometry args={[15, 7, 8, 8]} />
        <bgMaterial2 ref={bgMaterial2} bgTexture2={bg2} />
      </mesh>
      <mesh ref={planeRef3} position={[0, -13, 0]}>
        <planeGeometry args={[15, 7, 8, 8]} />
        <bgMaterial3 ref={bgMaterial3} bgTexture3={bg3} />
      </mesh>
      <mesh ref={planeRef4} position={[0, -13, 0]}>
        <planeGeometry args={[15, 7, 8, 8]} />
        <bgMaterial4 ref={bgMaterial4} bgTexture4={bg5} />
      </mesh>
      <mesh ref={planeRef5} position={[0, -13, 0]}>
        <planeGeometry args={[15, 7, 8, 8]} />
        <bgMaterial5 ref={bgMaterial5} bgTexture5={bg4} />
      </mesh>
      <ResizablePlanesTriangle
        planeRef={planeRef}
        planeRef2={planeRef2}
        planeRef3={planeRef3}
        planeRef4={planeRef4}
        planeRef5={planeRef5}
      />
    </group>
  );
}

//---------- BG Shaders

const createShaderMaterial = (shaderConfig, vertexShader, fragmentShader) => {
  return shaderMaterial(shaderConfig, vertexShader, fragmentShader);
};

const shaderMaterials = [
  {
    material: createShaderMaterial(
      {
        progress: 0.0,
        triangleProgress: 0.0,
        bgTexture1: null,
      },
      bgVertexShader,
      bgFragmentShader
    ),
    name: "BgMaterial",
  },
  {
    material: createShaderMaterial(
      {
        progress: 0.0,
        triangleProgress: 0.0,
        bgTexture2: null,
      },
      bgVertexShader,
      bgFragmentShader2
    ),
    name: "BgMaterial2",
  },
  {
    material: createShaderMaterial(
      {
        progress: 0.0,
        triangleProgress: 0.0,
        bgTexture3: null,
      },
      bgVertexShader,
      bgFragmentShader3
    ),
    name: "BgMaterial3",
  },
  {
    material: createShaderMaterial(
      {
        progress: 0.0,
        triangleProgress: 0.0,
        bgTexture4: null,
      },
      bgVertexShader,
      bgFragmentShader4
    ),
    name: "BgMaterial4",
  },
  {
    material: createShaderMaterial(
      {
        progress: 0.0,
        triangleProgress: 0.0,
        bgTexture5: null,
      },
      bgVertexShader,
      bgFragmentShader5
    ),
    name: "BgMaterial5",
  },
  {
    material: createShaderMaterial(
      {
        progress: 0.0,
        time: 0.0,
        triangleTexture: null,
        mouse: [0.0, 0.0],
        resolution: [window.innerWidth, window.innerHeight],
      },
      triangleBgVertexShader,
      triangleBgFragmentShader
    ),
    name: "TriangleBgMaterial",
  },
];

shaderMaterials.forEach(({ material, name }) => {
  extend({ [name]: material });
});
