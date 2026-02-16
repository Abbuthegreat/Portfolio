import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import MiniRobot from "./MiniRobot";

const experience = [
  {
    role: "Software Engineer Intern",
    company: "Tech Corp",
    period: "Jun 2024 – Aug 2024",
    description: "Worked on the frontend team building React components and improving performance.",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "Jan 2023 – Present",
    description: "Building custom websites and web apps for clients across various industries.",
  },
  {
    role: "Teaching Assistant",
    company: "University",
    period: "Sep 2022 – May 2023",
    description: "Assisted in teaching Data Structures and Algorithms to 200+ students.",
  },
];

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="Where I've worked">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative border-l-2 border-primary/30 pl-6 space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <span className="font-display text-xs font-medium text-accent">{item.period}</span>
                <h3 className="mt-1 font-display text-base font-bold text-foreground">{item.role}</h3>
                <p className="font-body text-sm text-primary">{item.company}</p>
                <p className="mt-2 font-body text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-[280px]">
          <MiniRobot color="hsl(200, 100%, 60%)" />
        </div>
      </div>
    </SectionWrapper>
  );
}
