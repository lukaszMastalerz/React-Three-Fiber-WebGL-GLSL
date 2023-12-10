import { useEffect } from "react";
import gsap from "gsap";

const ResizablePlanesTriangle = ({
  planeRef,
  planeRef2,
  planeRef3,
  planeRef4,
  planeRef5,
}) => {
  const handleResize = () => {
    const handleResizeForPlane = (ref) => {
      if (window.innerWidth < 700) {
        gsap.to(ref.current.scale, {
          x: 0.3,
          y: 0.3,
        });
      } else {
        gsap.to(ref.current.scale, {
          x: 1,
          y: 1,
        });
      }
    };

    handleResizeForPlane(planeRef);
    handleResizeForPlane(planeRef2);
    handleResizeForPlane(planeRef3);
    handleResizeForPlane(planeRef4);
    handleResizeForPlane(planeRef5);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [planeRef, planeRef2, planeRef3, planeRef4, planeRef5]);

  return null;
};

export default ResizablePlanesTriangle;
