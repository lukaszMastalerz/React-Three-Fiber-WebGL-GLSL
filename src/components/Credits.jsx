import { useEffect, useRef } from "react";
import { Text, Billboard } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const openClick = (url) => {
  window.open(url, "_blank");
};

const Credits = () => {
  const billboardRef = useRef();
  useEffect(() => {
    gsap.to(billboardRef.current.position, {
      ease: "none",
      scrollTrigger: {
        trigger: ".section19",
        scrub: 3,
        start: "bottom bottom",
      },
      y: 0.3,
    });
    const handleResize = () => {
      const resizeTransitionMesh = () => {
        if (window.innerWidth < 700) {
          gsap.to(billboardRef.current.scale, {
            x: 0.3,
            y: 0.3,
          });
        } else {
          gsap.to(billboardRef.current.scale, {
            x: 0.6,
            y: 0.6,
          });
        }
      };

      resizeTransitionMesh(billboardRef);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Billboard
      ref={billboardRef}
      position-y={-8}
      position-z={2.1}
      scale={0.5}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <Text
        fontSize={0.3}
        position-y={-1.3}
        onClick={() => openClick("https://threejs.org/")}
      >
        Three.js by Ricardo Cabello
      </Text>
      <Text
        fontSize={0.3}
        position-y={0.5}
        position-x={1.3}
        rotation-z={-1}
        onClick={() => openClick("https://threejs-journey.com/")}
      >
        Three.js-Journey by Bruno Simon
      </Text>
      <Text
        fontSize={0.3}
        position-y={0.5}
        position-x={-1.3}
        rotation-z={1}
        onClick={() => openClick("https://docs.pmnd.rs/")}
      >
        React Three Fiber by Poimandres
      </Text>
      <Text
        fontSize={0.2}
        position-y={-2}
        onClick={() => openClick("https://unsplash.com/@timothyeberly")}
      >
        1st and 2nd photo by Timothy Eberly on Unsplash
      </Text>
      <Text
        fontSize={0.2}
        position-y={-2.3}
        onClick={() =>
          openClick(
            "https://www.pxfuel.com/en/desktop-wallpaper-xmwyv/download/1920x1080"
          )
        }
      >
        3th photo on pxfuel.com
      </Text>
      <Text
        fontSize={0.2}
        position-y={-2.6}
        onClick={() =>
          openClick("https://www.wallpaperuse.com/downloaden/ohimxT/")
        }
      >
        5th photo on wallpaperuse.com
      </Text>
      <Text
        fontSize={0.2}
        position-y={-2.9}
        onClick={() => openClick("https://unsplash.com/@jonathanborba")}
      >
        4th photo by Jonathan Borba on Unsplash
      </Text>
      <Text
        fontSize={0.2}
        position-y={-3.2}
        onClick={() => openClick("https://www.freepik.com/author/master1305")}
      >
        Original 6th, 7th, 8th, 9th, 10th photo by master1305 on Feepik
      </Text>
      <Text
        fontSize={0.2}
        position-y={-3.5}
        onClick={() =>
          openClick(
            "https://www.elitesports.com/blogs/news/the-ultimate-guide-brazilian-jiu-jitsu-belt-system"
          )
        }
      >
        BJJ info be Elite
      </Text>
    </Billboard>
  );
};

export default Credits;
