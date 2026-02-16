import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import MiniRobot from "./MiniRobot";
import { Download } from "lucide-react";

const skills = [
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "Node.js / Express", level: 80 },
  { name: "Python", level: 75 },
  { name: "CSS / Tailwind", level: 90 },
  { name: "Git / DevOps", level: 70 },
];

export default function ResumeSection() {
  return (
    <SectionWrapper id="resume" title="Resume" subtitle="My skills & qualifications">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between mb-1">
                <span className="font-body text-foreground font-medium">{skill.name}</span>
                <span className="font-display text-sm text-primary">{skill.level}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(160_100%_50%/0.4)]"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>
        </div>
        <div className="h-[280px]">
          <MiniRobot color="hsl(40, 100%, 60%)" />
        </div>
      </div>
    </SectionWrapper>
  );
}
