// Preloader.jsx
import { useEffect, useRef } from "react";
import finger from "../finger.png";
import gsap from "gsap";
import "../styles/preloader.css";

const Preloader = ({ progress }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;

    if (progress < 100) {
      gsap.to(overlay, { opacity: 1 });
    } else {
      gsap.to(overlay, {
        duration: 1.5,
        yPercent: 100,
        ease: "expo.out",
        force3D: true,
      });
    }
    return () => gsap.killTweensOf(overlay);
  }, [progress]);

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="progress-text">
        <span>{`${progress}%`}</span>
        <p>
          Stay calm...
          <br />
          ...and prepare your finger.
        </p>
        <img className="finger" src={finger} alt="Pain" />
      </div>
    </div>
  );
};

export default Preloader;
