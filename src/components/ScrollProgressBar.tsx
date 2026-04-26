import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const scrolled = document.documentElement.scrollTop;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9990] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background: "linear-gradient(90deg, hsl(160,100%,50%), hsl(280,100%,65%), hsl(160,100%,50%))",
          boxShadow: "0 0 8px hsl(160,100%,50%), 0 0 20px hsl(160,100%,50%/0.45)",
          transition: "width 0.06s linear",
        }}
      />
    </div>
  );
}
