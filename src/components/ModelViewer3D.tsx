import "@google/model-viewer";
import React, { useRef, useState, useEffect } from "react";

type Hotspot = {
  id: string;
  position: string; // "x y z"
  label: string;
};

type ModelViewer3DProps = {
  src: string;
  alt: string;
  hotspots?: Hotspot[];
};

// Web-component wrapper
const RawModelViewer: React.FC<any> = (props) => {
  return React.createElement("model-viewer" as any, props);
};

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ src, alt, hotspots = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${
        isFullscreen ? "bg-black" : "rounded-xl border border-slate-800"
      }`}
    >
      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 z-20
                   bg-slate-900/80 backdrop-blur
                   text-white text-xs px-3 py-1.5
                   rounded-md border border-slate-700
                   hover:bg-slate-800 transition"
      >
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>

      {/* 3D Viewer */}
      <RawModelViewer
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        interaction-prompt="none"
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{
          width: "100%",
          height: isFullscreen ? "100vh" : "360px",
          background: "#020617",
          touchAction: "none",
        }}
        shadow-intensity="1"
        exposure="1"
      >
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            slot={`hotspot-${hotspot.id}`}
            data-position={hotspot.position}
            data-normal="0m 1m 0m"
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(
                activeHotspot === hotspot.id ? null : hotspot.id
              );
            }}
            className="relative w-3 h-3 rounded-full bg-blue-500 cursor-pointer
                       shadow-md shadow-blue-500/60"
          >
            {activeHotspot === hotspot.id && (
              <div
                className="absolute left-1/2 top-[-0.75rem]
                           -translate-x-1/2 -translate-y-full
                           whitespace-nowrap
                           bg-slate-900 text-white text-xs
                           px-2 py-1 rounded-md border border-slate-700
                           pointer-events-auto"
              >
                {hotspot.label}
              </div>
            )}
          </div>
        ))}
      </RawModelViewer>
    </div>
  );
};

export default ModelViewer3D;