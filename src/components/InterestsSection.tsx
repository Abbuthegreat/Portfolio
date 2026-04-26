import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import HeroRobot from "./HeroRobot";
import { Bot, Zap, Film, Trophy } from "lucide-react";

const interests = [
  { icon: Bot, label: "Robotics", description: "Designing intelligent machines and autonomous systems" },
  { icon: Zap, label: "Electronics", description: "Building and experimenting with circuits and Embedded Systems" },
  { icon: Film, label: "Movies", description: "Exploring storytelling through cinema and visual art" },
  { icon: Trophy, label: "Football", description: "Following the game, strategy, and competitive spirit on the field" },
];

export default function InterestsSection() {
  return (
    <SectionWrapper id="interests" title="My Interests" subtitle="Things I'm passionate about">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        {/* Interest cards */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
          {interests.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-4 sm:p-5 transition-all hover:neon-border"
            >
              <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h3 className="mt-2 sm:mt-3 font-display text-xs sm:text-sm font-bold text-foreground">{item.label}</h3>
              <p className="mt-1 font-body text-xs text-muted-foreground leading-snug">{item.description}</p>
            </motion.div>
          ))}
        </div>
        {/* 3D Robot */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 h-[240px] sm:h-[280px] lg:h-[320px]">
          <HeroRobot />
        </div>
      </div>
    </SectionWrapper>
  );
}
