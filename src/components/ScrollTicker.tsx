const ITEMS = [
  "ROBOTICS",
  "EMBEDDED SYSTEMS",
  "ROS2",
  "AUTONOMOUS DRONES",
  "SLAM",
  "FUSION 360",
  "PID CONTROL",
  "PYTHON",
  "ALTIUM DESIGNER",
  "GAZEBO",
  "OPENCV",
  "3D PRINTING",
  "MOTOR DRIVERS",
  "RASPBERRY PI",
  "POWERTRAIN ELECTRONICS",
  "SOLIDWORKS",
  "SENSOR FUSION",
  "YOLOV9",
];

export default function ScrollTicker() {
  // Repeat 4× so the loop is completely seamless at any screen size
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden border-y border-primary/10 py-3"
      style={{ background: "hsl(220,20%,5%/0.6)", backdropFilter: "blur(8px)" }}
    >
      {/* Inject self-contained keyframes — no dependency on Tailwind config */}
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: scrollLeft 40s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: "linear-gradient(to right, hsl(220,20%,5%), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: "linear-gradient(to left, hsl(220,20%,5%), transparent)" }}
      />

      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap select-none"
          >
            {/* Glowing bullet separator */}
            <span
              className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
              style={{
                backgroundColor:
                  i % 3 === 0
                    ? "hsl(160,100%,50%)"
                    : i % 3 === 1
                    ? "hsl(280,100%,65%)"
                    : "hsl(200,100%,60%)",
                boxShadow:
                  i % 3 === 0
                    ? "0 0 6px hsl(160,100%,50%)"
                    : i % 3 === 1
                    ? "0 0 6px hsl(280,100%,65%)"
                    : "0 0 6px hsl(200,100%,60%)",
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
