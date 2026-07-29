import "@google/model-viewer";
import React, { useRef, useState, useEffect } from "react";

type Hotspot = {
  id: string;
  position: string; // "x y z"
  label: string;
  normal?: string; // "x y z"
};

type ModelViewer3DProps = {
  src: string;
  alt: string;
  hotspots?: Hotspot[];
  disableZoom?: boolean;
};

// Web-component wrapper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RawModelViewer: React.FC<any> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement("model-viewer" as any, props);
};

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ src, alt, hotspots = [], disableZoom = false }) => {
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

    // Aggressive scroll prevention: block wheel and touchmove on the entire container using CAPTURE
    const container = containerRef.current;
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (container) {
      container.addEventListener('wheel', preventScroll, { passive: false, capture: true });
      container.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    }

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      if (container) {
        container.removeEventListener('wheel', preventScroll, { capture: true });
        container.removeEventListener('touchmove', preventScroll, { capture: true });
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden backdrop-blur-md ${isFullscreen ? "bg-canvas" : "rounded-xl border border-hairline bg-surface-card/30"
        }`}
    >
      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-20
                   bg-surface-card/80 backdrop-blur-sm
                   text-ink font-medium text-xs px-4 py-2
                   rounded-full border border-hairline
                   hover:bg-surface-strong transition-colors
                   shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
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
        bounds="tight"
        field-of-view="15deg"
        min-camera-orbit="auto auto 10%"
        max-camera-orbit={disableZoom ? "auto auto auto" : "auto auto 65%"}
        camera-orbit={disableZoom ? "0deg 75deg auto" : "0deg 75deg 65%"}
        style={{
          width: "100%",
          height: isFullscreen ? "100vh" : "550px",
          background: "transparent",
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
            data-normal={hotspot.normal || "0m 1m 0m"}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(
                activeHotspot === hotspot.id ? null : hotspot.id
              );
            }}
            className="relative w-3.5 h-3.5 rounded-full bg-ink cursor-pointer
                       shadow-[0_2px_8px_rgba(0,0,0,0.15)] ring-2 ring-white/50"
          >
            {activeHotspot === hotspot.id && (
              <div
                className="absolute left-1/2 top-[-0.75rem]
                           -translate-x-1/2 -translate-y-full
                           w-max max-w-[220px] text-wrap text-center
                           bg-surface-card text-ink text-sm font-medium
                           px-3 py-2 rounded-lg border border-hairline
                           shadow-[0_4px_16px_rgba(0,0,0,0.08)]
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