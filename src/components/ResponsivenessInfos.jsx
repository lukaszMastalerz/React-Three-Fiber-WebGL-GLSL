import { useEffect } from "react";
import { gsap } from "gsap";

const ResizablePlanesInfos = ({
  transitionTex,
  transitionTex2,
  transitionTex3,
  transitionTex4,
  transitionTex5,
  KeepC,
}) => {
  useEffect(() => {
    const handleResize = () => {
      const resizeTransitionMesh = (ref2) => {
        if (window.innerWidth < 700) {
          gsap.to(ref2.current.scale, {
            x: 0.4,
            y: 0.4,
          });
        } else {
          gsap.to(ref2.current.scale, {
            x: 1,
            y: 1,
          });
        }
      };

      resizeTransitionMesh(transitionTex);
      resizeTransitionMesh(transitionTex2);
      resizeTransitionMesh(transitionTex3);
      resizeTransitionMesh(transitionTex4);
      resizeTransitionMesh(transitionTex5);
      resizeTransitionMesh(KeepC);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    transitionTex,
    transitionTex2,
    transitionTex3,
    transitionTex4,
    transitionTex5,
    KeepC,
  ]);

  return null;
};

export default ResizablePlanesInfos;
