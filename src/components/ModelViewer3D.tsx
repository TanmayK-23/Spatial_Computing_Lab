import React, { useRef, useState, useEffect } from "react";

type ModelViewer3DProps = {
  src: string;
  alt: string;
};

// Web-component wrapper
const RawModelViewer: React.FC<any> = (props) => {
  return React.createElement("model-viewer" as any, props);
};

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      />
    </div>
  );
};

export default ModelViewer3D;