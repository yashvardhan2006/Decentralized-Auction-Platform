// components/AnimatedBackground.tsx
"use client";

import React, { ReactNode } from "react";

type Props = { children: ReactNode };

export default function AnimatedBackground({ children }: Props) {
  return (
    <>
      <div className="animated-bg">
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .animated-bg {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .animated-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          /* same deep purples/fuchsias, with an extra stop for more drama */
          background: linear-gradient(
            270deg,
            #3c096c,   /* violet-950 */
            #581c87,   /* purple-800 */
            #701a75,   /* fuchsia-900 */
            #7e1e9c    /* deeper magenta */
          );
          /* larger “canvas” so you see more shift */
          background-size: 800% 800%;
          /* faster, infinite loop for a more dynamic feel */
          animation: gradientShift 9s ease-in-out infinite;
          /* a tad more opaque so you actually see it */
          opacity: 0.2;
          z-index: -1;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        @keyframes gradientShift {
          0%   { background-position:   0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position:   0% 50%; }
        }
      `}</style>
    </>
  );
}
