import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Trophy, Award, Star } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "Hackathon Winner", description: "Won first place at XYZ Hackathon 2024", year: "2024" },
  { icon: Award, title: "Dean's List", description: "Maintained top academic standing for 4 semesters", year: "2023" },
  { icon: Star, title: "Open Source Contributor", description: "500+ contributions to popular open source projects", year: "2023" },
];

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" title="Achievements" subtitle="Milestones I'm proud of">
      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="glass rounded-xl p-6 text-center transition-all hover:neon-border"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <span className="font-display text-xs font-medium text-accent">{item.year}</span>
            <h3 className="mt-1 font-display text-base font-bold text-foreground">{item.title}</h3>
            <p className="mt-2 font-body text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
