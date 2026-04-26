import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Trophy, Award, Star } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "Competition Winner", description: "2nd at State level Technical paper presentation Competition", year: "2023" },
  { icon: Award, title: "15X Hackathons Finalist", description: "Won as well as loose competitions, while gaining lots of experience", year: "2024" },
  { icon: Star, title: "Projects", description: "Made several small and big projects", year: "2025" },
];

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" title="Achievements" subtitle="Milestones I'm proud of">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="glass rounded-xl p-5 sm:p-6 text-center transition-all hover:neon-border"
          >
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/10">
              <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <span className="font-display text-xs font-medium text-accent">{item.year}</span>
            <h3 className="mt-1 font-display text-sm sm:text-base font-bold text-foreground">{item.title}</h3>
            <p className="mt-2 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
