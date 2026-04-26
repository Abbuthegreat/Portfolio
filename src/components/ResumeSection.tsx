import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import BB8Robot from "./BB8Robot";
import { Download, Cpu, Bot, Layers, Code2, Navigation, Box } from "lucide-react";

const skills = [
  { name: "Embedded Systems", icon: Cpu, category: "Hardware" },
  { name: "ROS2", icon: Bot, category: "Robotics" },
  { name: "Gazebo", icon: Layers, category: "Simulation" },
  { name: "Python", icon: Code2, category: "Programming" },
  { name: "SLAM", icon: Navigation, category: "Navigation" },
  { name: "Fusion 360", icon: Box, category: "CAD" },
  { name: "OpenCV", icon: Layers, category: "Vision" },
  { name: "Motor Drivers", icon: Cpu, category: "Hardware" },
  { name: "Raspberry Pi", icon: Cpu, category: "Hardware" },
  { name: "Solid Works", icon: Box, category: "CAD" },
  { name: "PID Control", icon: Navigation, category: "Control" },
  { name: "3D Printing", icon: Box, category: "Fabrication" },
];

const categoryColors: Record<string, string> = {
  Hardware:     "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Robotics:     "text-primary border-primary/30 bg-primary/10",
  Simulation:   "text-violet-400 border-violet-400/30 bg-violet-400/10",
  Programming:  "text-sky-400 border-sky-400/30 bg-sky-400/10",
  Navigation:   "text-amber-400 border-amber-400/30 bg-amber-400/10",
  CAD:          "text-rose-400 border-rose-400/30 bg-rose-400/10",
  Vision:       "text-violet-400 border-violet-400/30 bg-violet-400/10",
  Control:      "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Fabrication:  "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export default function ResumeSection() {
  return (
    <SectionWrapper id="resume" title="Resume" subtitle="My skills & qualifications">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">

          {/* Skills heading */}
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Technical Skills
          </p>

          {/* Skill chips grid */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              const colorClass = categoryColors[skill.category] ?? "text-primary border-primary/30 bg-primary/10";
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-3 py-2 sm:px-4 sm:py-2.5 font-body text-xs sm:text-sm font-semibold cursor-default transition-all duration-200 hover:shadow-[0_0_18px_currentColor/30] ${colorClass}`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>{skill.name}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
            {[...new Set(skills.map(s => s.category))].map(cat => (
              <span key={cat} className={`flex items-center gap-1.5 font-display text-[10px] font-medium uppercase tracking-wider ${categoryColors[cat]?.split(" ")[0] ?? "text-primary"}`}>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                {cat}
              </span>
            ))}
          </div>

          {/* Download button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-2"
          >
            <a
              href="https://drive.google.com/file/d/1UDm2tXJOkVtsfxvm5JrLAtvFaw4lV0gF/view?usp=sharing"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg bg-primary px-5 py-3 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-black transition-all hover:shadow-[0_0_30px_hsl(160_100%_50%/0.4)]"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>
        </div>

        <div className="hidden lg:block h-[260px] xl:h-[300px]">
          <BB8Robot 
            scale={5}
            yOffset={-1.5}
            xOffset={0}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
