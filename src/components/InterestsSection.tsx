import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import MiniRobot from "./MiniRobot";
import { Code, Palette, Gamepad2, Music } from "lucide-react";

const interests = [
  { icon: Code, label: "Web Development", description: "Building modern, responsive web applications" },
  { icon: Palette, label: "UI/UX Design", description: "Crafting beautiful user experiences" },
  { icon: Gamepad2, label: "Gaming", description: "Exploring virtual worlds and game dev" },
  { icon: Music, label: "Music", description: "Playing instruments and music production" },
];

export default function InterestsSection() {
  return (
    <SectionWrapper id="interests" title="My Interests" subtitle="Things I'm passionate about">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
          {interests.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-5 transition-all hover:neon-border"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-sm font-bold text-foreground">{item.label}</h3>
              <p className="mt-1 font-body text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="col-span-1 lg:col-span-3 h-[300px]">
          <MiniRobot color="hsl(280, 100%, 65%)" />
        </div>
      </div>
    </SectionWrapper>
  );
}
