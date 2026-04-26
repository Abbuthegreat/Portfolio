const ITEMS = [
  "ROBOTICS", "EMBEDDED SYSTEMS", "ROS2", "AUTONOMOUS DRONES", "SLAM",
  "FUSION 360", "PID CONTROL", "PYTHON", "ALTIUM DESIGNER", "GAZEBO",
  "OPENCV", "3D PRINTING", "MOTOR DRIVERS", "RASPBERRY PI",
  "POWERTRAIN ELECTRONICS", "SOLIDWORKS", "SENSOR FUSION", "YOLOV9",
];

export default function ScrollTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-primary/10 py-3 bg-background/40 backdrop-blur-sm">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 35s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 px-5 font-display text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors"
          >
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: i % 3 === 0
                  ? "hsl(160,100%,50%)"
                  : i % 3 === 1
                  ? "hsl(280,100%,65%)"
                  : "hsl(200,100%,60%)",
                boxShadow: "0 0 6px currentColor",
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
