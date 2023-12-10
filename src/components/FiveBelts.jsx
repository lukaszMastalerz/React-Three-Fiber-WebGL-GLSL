import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shaderMaterial } from "@react-three/drei";
import { extend, useLoader } from "@react-three/fiber";
import transitionVS from "../shaders/transitionVertex.glsl";
import transitionFS from "../shaders/transitionFragment.glsl";
import transitionFS2 from "../shaders/transitionFragment2.glsl";
import transitionFS3 from "../shaders/transitionFragment3.glsl";
import transitionFS4 from "../shaders/transitionFragment4.glsl";
import transitionFS5 from "../shaders/transitionFragment5.glsl";
import endTransitionVS from "../shaders/endVertex.glsl";
import endTransitionFS from "../shaders/endFragment.glsl";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import ResizablePlanesInfos from "../components/ResponsivenessInfos.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Belt(props) {
  const transitionShader = useRef();
  const transitionShader2 = useRef();
  const transitionShader3 = useRef();
  const transitionShader4 = useRef();
  const transitionShader5 = useRef();
  const endingShader = useRef();

  const transitionTex = useRef();
  const transitionTex2 = useRef();
  const transitionTex3 = useRef();
  const transitionTex4 = useRef();
  const transitionTex5 = useRef();
  const endingTex = useRef();

  const KeepC = useRef();

  const transTex = useLoader(
    TextureLoader,
    "transitionTex_must_PNG_need_alpha_noise.png"
  );
  const info1 = useLoader(TextureLoader, "whiteInfo_small.jpg");
  const info2 = useLoader(TextureLoader, "blueInfo_small.jpg");
  const info3 = useLoader(TextureLoader, "purpleInfo_small.jpg");
  const info4 = useLoader(TextureLoader, "brownInfo_small.jpg");
  const info5 = useLoader(TextureLoader, "blackInfo_small.jpg");
  const end1 = useLoader(TextureLoader, "end_tex1.png");
  const end2 = useLoader(TextureLoader, "end_tex2.png");

  const info1Mask = useLoader(TextureLoader, "mask1_full_small.jpg");
  const info2Mask = useLoader(TextureLoader, "mask2_full_small.jpg");
  const info3Mask = useLoader(TextureLoader, "mask3_full_small.jpg");
  const info4Mask = useLoader(TextureLoader, "mask4_full_small.jpg");
  const info5Mask = useLoader(TextureLoader, "mask5_full_small.jpg");

  const keepCalm = useLoader(TextureLoader, "keepCalm_small.jpg");

  const TransitionShader = useMemo(
    () =>
      shaderMaterial(
        {
          progress: 0.0,
          infoTexture1: null,
          infoTexture1Mask: null,
          transitionTexture: null,
        },
        transitionVS,
        transitionFS
      ),
    []
  );

  extend({ TransitionShader });

  const TransitionShader2 = useMemo(
    () =>
      shaderMaterial(
        {
          progress: 0.0,
          infoTexture2: null,
          infoTexture2Mask: null,
          transitionTexture: null,
        },
        transitionVS,
        transitionFS2
      ),
    []
  );
  extend({ TransitionShader2 });

  const TransitionShader3 = useMemo(
    () =>
      shaderMaterial(
        {
          progress: 0.0,
          infoTexture3: null,
          infoTexture3Mask: null,
          transitionTexture: null,
        },
        transitionVS,
        transitionFS3
      ),
    []
  );
  extend({ TransitionShader3 });
  const TransitionShader4 = useMemo(
    () =>
      shaderMaterial(
        {
          progress: 0.0,
          infoTexture4: null,
          infoTexture4Mask: null,
          transitionTexture: null,
        },
        transitionVS,
        transitionFS4
      ),
    []
  );
  extend({ TransitionShader4 });
  const TransitionShader5 = useMemo(
    () =>
      shaderMaterial(
        {
          progress: 0.0,
          infoTexture5: null,
          infoTexture5Mask: null,
          transitionTexture: null,
        },
        transitionVS,
        transitionFS5
      ),
    []
  );
  extend({ TransitionShader5 });
  const EndingShader = useMemo(
    () =>
      shaderMaterial(
        {
          progress: 0.0,
          endTexture: null,
          endTexture2: null,
          endAlphaTexture: null,
        },
        endTransitionVS,
        endTransitionFS
      ),
    []
  );
  extend({ EndingShader });

  useEffect(() => {
    const shaderAnimations = [
      {
        shader: transitionShader.current.uniforms.progress,
        trigger: ".section7",
        endTrigger: ".section8",
        scrub: 3,
        start: "center center",
        value: 1,
      },
      {
        shader: transitionShader2.current.uniforms.progress,
        trigger: ".section9",
        endTrigger: ".section10",
        scrub: 3,
        start: "center center",
        value: 1,
      },
      {
        shader: transitionShader3.current.uniforms.progress,
        trigger: ".section11",
        endTrigger: ".section12",
        scrub: 3,
        start: "center center",
        value: 1,
      },
      {
        shader: transitionShader4.current.uniforms.progress,
        trigger: ".section13",
        endTrigger: ".section14",
        scrub: 3,
        start: "center center",
        value: 1,
      },
      {
        shader: transitionShader5.current.uniforms.progress,
        trigger: ".section15",
        endTrigger: ".section16",
        scrub: 2,
        start: "center center",
        value: 1,
      },
      {
        shader: endingShader.current.uniforms.progress,
        trigger: ".section18",
        endTrigger: ".section19",
        scrub: 2,
        start: "center center",
        value: 1,
      },
    ];

    shaderAnimations.forEach(
      ({ shader, trigger, endTrigger, scrub, start, value }) => {
        gsap.to(shader, {
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

    const texturePositionAnimations = [
      {
        texture: endingTex.current.position,
        trigger: ".section17",
        endTrigger: ".section19",
        scrub: 2,
        start: "center center",
        values: { y: 0, z: 2 },
      },
      {
        texture: transitionTex.current.position,
        trigger: ".section6",
        scrub: 3,
        start: "bottom bottom",
        values: { y: 0.2 },
      },
      {
        texture: transitionTex2.current.position,
        trigger: ".section8",
        scrub: 3,
        start: "bottom bottom",
        values: { y: 0.2 },
      },
      {
        texture: transitionTex3.current.position,
        trigger: ".section10",
        scrub: 3,
        start: "bottom bottom",
        values: { y: 0.2 },
      },
      {
        texture: transitionTex4.current.position,
        trigger: ".section12",
        scrub: 2,
        start: "bottom bottom",
        values: { y: 0.2 },
      },
      {
        texture: transitionTex5.current.position,
        trigger: ".section14",
        scrub: 3,
        start: "bottom bottom",
        values: { y: 0.2 },
      },
      {
        texture: KeepC.current.position,
        trigger: ".section16",
        scrub: 3,
        start: "bottom bottom",
        values: { y: 0.2 },
      },
    ];

    texturePositionAnimations.forEach(
      ({ texture, trigger, endTrigger, scrub, start, values }) => {
        gsap.to(texture, {
          scrollTrigger: {
            trigger,
            endTrigger,
            scrub,
            start,
          },
          ...values,
        });
      }
    );
  }, []);

  useEffect(() => {
    const disposeTextures = () => {
      transTex.dispose();
      info1.dispose();
      info2.dispose();
      info3.dispose();
      info4.dispose();
      info5.dispose();
      end1.dispose();
      end2.dispose();
      info1Mask.dispose();
      info2Mask.dispose();
      info3Mask.dispose();
      info4Mask.dispose();
      info5Mask.dispose();
      keepCalm.dispose();
    };

    disposeTextures();

    return disposeTextures;
  }, [
    transTex,
    info1,
    info2,
    info3,
    info4,
    info5,
    end1,
    end2,
    info1Mask,
    info2Mask,
    info3Mask,
    info4Mask,
    info5Mask,
    keepCalm,
  ]);

  return (
    <group {...props} dispose={null}>
      <mesh ref={transitionTex} position={[0, -9, -1]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <transitionShader
          ref={transitionShader}
          transitionTexture={transTex}
          infoTexture1={info1}
          infoTexture1Mask={info1Mask}
        />
      </mesh>
      <mesh ref={transitionTex2} position={[0, -9, -1]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <transitionShader2
          ref={transitionShader2}
          transitionTexture={transTex}
          infoTexture2={info2}
          infoTexture2Mask={info2Mask}
        />
      </mesh>
      <mesh ref={transitionTex3} position={[0, -9, -0.999]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <transitionShader3
          ref={transitionShader3}
          transitionTexture={transTex}
          infoTexture3={info3}
          infoTexture3Mask={info3Mask}
        />
      </mesh>
      <mesh ref={transitionTex4} position={[0, -9, -0.999]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <transitionShader4
          ref={transitionShader4}
          transitionTexture={transTex}
          infoTexture4={info4}
          infoTexture4Mask={info4Mask}
        />
      </mesh>
      <mesh ref={transitionTex5} position={[0, -9, -0.999]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <transitionShader5
          ref={transitionShader5}
          transitionTexture={transTex}
          infoTexture5={info5}
          infoTexture5Mask={info5Mask}
        />
      </mesh>
      <mesh ref={KeepC} position={[0, -9, -0.998]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <meshBasicMaterial map={keepCalm} />
      </mesh>
      <mesh ref={endingTex} position={[0, 10, -3]} scale={[1, 1, 1]}>
        <planeGeometry args={[12, 6, 1, 1]} />
        <endingShader
          ref={endingShader}
          endTexture={end1}
          endTexture2={end2}
          transparent={true}
        />
      </mesh>
      <ResizablePlanesInfos
        transitionTex={transitionTex}
        transitionTex2={transitionTex2}
        transitionTex3={transitionTex3}
        transitionTex4={transitionTex4}
        transitionTex5={transitionTex5}
        KeepC={KeepC}
      />
    </group>
  );
}
