import "./styles/style.css";
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import ParticlesBelt from "./components/PartBelt.jsx";
import BG from "./components/BGDist.jsx";
import Belts from "./components/FiveBelts.jsx";
import Preloader from "./components/Preloader";
import Credits from "./components/Credits.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const App = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const simulateLoading = () => {
      let startTimestamp;
      const duration = 3500;

      const step = (timestamp) => {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }

        const progress = Math.min(1, (timestamp - startTimestamp) / duration);

        setLoadingProgress(Math.floor(progress * 100));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    simulateLoading();
  }, []);

  const canvasProps = useMemo(() => {
    return {
      pixelratio: [1, 2],
      gl: {
        antialias: false,
        powerPreference: "high-performance",
      },
    };
  }, []);

  return (
    <>
      <Preloader progress={loadingProgress} />
      <Canvas {...canvasProps}>
        <ParticlesBelt />
        <BG />
        <Belts />
        <Credits />
      </Canvas>
    </>
  );
};

root.render(<App />);
