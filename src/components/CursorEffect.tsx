import { useEffect, useRef } from "react";

const TRAIL = 7;
const LERP  = 0.16;

export default function CursorEffect() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const trailRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const spotRef     = useRef<HTMLDivElement>(null);
  const rippleRef   = useRef<HTMLDivElement>(null);

  const mouse    = useRef({ x: -500, y: -500 });
  const pos      = useRef(Array.from({ length: TRAIL }, () => ({ x: -500, y: -500 })));
  const hovering = useRef(false);
  const raf      = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      spotRef.current?.style.setProperty("--mx", `${e.clientX}px`);
      spotRef.current?.style.setProperty("--my", `${e.clientY}px`);
      hovering.current = !!(document.elementFromPoint(e.clientX, e.clientY)?.closest("a,button"));
    };

    const onClick = (e: MouseEvent) => {
      if (!rippleRef.current) return;
      const colors = ["hsl(160,100%,50%)", "hsl(280,100%,65%)", "hsl(200,100%,60%)"];
      colors.forEach((color, i) => {
        const el = document.createElement("div");
        el.style.cssText = `
          position:fixed; left:${e.clientX}px; top:${e.clientY}px;
          width:8px; height:8px; border-radius:50%;
          border:1.5px solid ${color}; box-shadow:0 0 8px ${color};
          transform:translate(-50%,-50%);
          pointer-events:none;
          animation:rippleBurst .65s ${i * 90}ms ease-out forwards;
        `;
        rippleRef.current!.appendChild(el);
        setTimeout(() => el.remove(), 800 + i * 90);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    const tick = () => {
      pos.current[0] = { ...mouse.current };
      for (let i = 1; i < TRAIL; i++) {
        pos.current[i].x += (pos.current[i - 1].x - pos.current[i].x) * LERP;
        pos.current[i].y += (pos.current[i - 1].y - pos.current[i].y) * LERP;
      }

      /* dot — instant */
      if (dotRef.current) {
        const s = hovering.current ? 1.7 : 1;
        dotRef.current.style.transform = `translate(${pos.current[0].x - 5}px,${pos.current[0].y - 5}px) scale(${s})`;
      }

      /* ring — 1 step behind */
      if (ringRef.current) {
        const s = hovering.current ? 2.2 : 1;
        ringRef.current.style.transform = `translate(${pos.current[1].x - 20}px,${pos.current[1].y - 20}px) scale(${s})`;
        ringRef.current.style.borderColor = hovering.current ? "hsl(160,100%,65%/0.9)" : "hsl(160,100%,50%/0.5)";
        ringRef.current.style.boxShadow   = hovering.current
          ? "0 0 20px hsl(160,100%,50%/0.6), inset 0 0 12px hsl(160,100%,50%/0.15)"
          : "0 0 12px hsl(160,100%,50%/0.25), inset 0 0 8px hsl(160,100%,50%/0.07)";
      }

      /* comet trail dots */
      for (let i = 2; i < TRAIL; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const ratio = 1 - i / TRAIL;
        const sz    = Math.max(2, 7 * ratio);
        el.style.transform = `translate(${pos.current[i].x - sz / 2}px,${pos.current[i].y - sz / 2}px)`;
        el.style.width  = `${sz}px`;
        el.style.height = `${sz}px`;
      }

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes rippleBurst {
          0%   { width:8px;  height:8px;  opacity:1; }
          100% { width:90px; height:90px; opacity:0; }
        }
      `}</style>

      {/* ripple host */}
      <div ref={rippleRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9993 }} />

      {/* dual-tone spotlight */}
      <div ref={spotRef} className="fixed inset-0 pointer-events-none" style={{
        zIndex: 9992,
        background: "radial-gradient(650px circle at var(--mx,-9999px) var(--my,-9999px), hsl(160 100% 50%/0.09), hsl(280 100% 65%/0.04) 45%, transparent 70%)",
      }} />

      {/* comet trail */}
      {Array.from({ length: TRAIL - 2 }, (_, k) => k + 2).map(i => (
        <div key={i} ref={el => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none will-change-transform rounded-full"
          style={{
            zIndex: 9995,
            backgroundColor: i % 2 === 0 ? "hsl(160,100%,50%)" : "hsl(280,100%,65%)",
            opacity: (1 - i / TRAIL) * 0.75,
            boxShadow: `0 0 ${(1 - i / TRAIL) * 16}px ${i % 2 === 0 ? "hsl(160,100%,50%)" : "hsl(280,100%,65%)"}`,
          }}
        />
      ))}

      {/* lagging ring */}
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none will-change-transform" style={{
        zIndex: 9997, width: 40, height: 40, borderRadius: "50%",
        border: "1.5px solid hsl(160,100%,50%/0.5)",
        transition: "border-color .15s, box-shadow .15s, transform .06s",
      }} />

      {/* neon dot */}
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none will-change-transform" style={{
        zIndex: 9999, width: 10, height: 10, borderRadius: "50%",
        backgroundColor: "hsl(160,100%,55%)",
        boxShadow: "0 0 8px 2px hsl(160,100%,55%), 0 0 22px hsl(160,100%,50%/0.6)",
        transition: "transform .04s",
      }} />
    </>
  );
}
