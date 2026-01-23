import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | string;
        "auto-rotate"?: boolean | string;
        ar?: boolean | string;
        "ar-modes"?: string;
        "shadow-intensity"?: string | number;
        exposure?: string | number;
      };
    }
  }
}

export {};