import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import CrazyRobot from "./CrazyRobot";
import { MapPin, Briefcase, Clock } from "lucide-react";

const experience = [
  {
    company: "DJS Racing",
    type: "Part-time · 1 yr 1 mo",
    location: "Thane, Maharashtra, India · On-site",
    roles: [
      {
        role: "Senior Powertrain Electronics Team Member",
        period: "Aug 2025 – Mar 2026 · 8 mos",
        description: "Leading powertrain electronics design and development for the racing team's high-performance vehicle systems.",
        skills: ["Altium Designer", "Proteus"],
      },
      {
        role: "Powertrain Electronics Team Member",
        period: "Mar 2025 – Aug 2025 · 6 mos",
        description: "Developed and tested embedded electronics for powertrain systems, focusing on communication protocols and system integration.",
        skills: ["Communication Protocols", "Embedded Systems", "Circuit Design", "PCB Design", "Testing"],
      },
    ],
  },
  {
    company: "Apex52",
    type: "Internship · 4 mos",
    location: "Mumbai, Maharashtra, India · On-site",
    roles: [
      {
        role: "Jr Web Developer",
        period: "Jul 2024 – Oct 2024",
        description: "Designed and developed static and dynamic websites using WordPress and AI-based tools. Built responsive layouts, customized themes, managed content, and integrated contact forms. Key project: Arihant Industries website — complete business site with professional design, smooth navigation, and mobile responsiveness.",
        skills: ["WordPress", "JavaScript", "HTML/CSS", "Responsive Design", "AI Tools"],
      },
    ],
  },
  {
    company: "Damania Solutions",
    type: "Full-time · 5 yrs 2 mos",
    location: "Mumbai, Maharashtra, India · On-site",
    roles: [
      {
        role: "Lead Engineer",
        period: "May 2019 – Jun 2024",
        description: "Led engineering operations handling computer repairs, desktop support, and technical infrastructure across multiple client sites.",
        skills: ["Computer Repair", "Desktop Support", "Hardware Troubleshooting", "Network Setup", "IT Support", "System Administration", "Client Management", "Team Leadership", "Technical Documentation"],
      },
    ],
  },
];

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="Where I've worked">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">

        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="space-y-8 sm:space-y-10">
            {experience.map((company, ci) => (
              <motion.div
                key={company.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.15, duration: 0.5 }}
                className="glass rounded-xl p-4 sm:p-6 hover:neon-border transition-all"
              >
                {/* Company header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-base sm:text-lg font-bold text-primary neon-text">
                    {company.company}
                  </h3>
                  <span className="flex items-center gap-1 font-body text-xs text-accent font-medium">
                    <Clock className="h-3 w-3 shrink-0" />
                    {company.type}
                  </span>
                </div>
                <p className="flex items-center gap-1.5 font-body text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {company.location}
                </p>

                {/* Roles within company */}
                <div className="space-y-5 border-l-2 border-primary/20 pl-4 sm:pl-5">
                  {company.roles.map((item, ri) => (
                    <motion.div
                      key={item.role}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.15 + ri * 0.1 + 0.1, duration: 0.4 }}
                      className="relative"
                    >
                      {/* dot */}
                      <div className="absolute -left-[21px] sm:-left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_8px_hsl(160_100%_50%/0.5)]" />

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                        <h4 className="font-display text-sm font-bold text-foreground">{item.role}</h4>
                        <span className="font-body text-xs text-muted-foreground">{item.period}</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2.5">
                        {item.description}
                      </p>
                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-primary/10 px-2 py-0.5 font-body text-xs text-primary border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Robot — desktop only */}
        <div className="hidden lg:block h-[320px] xl:h-[360px]">
          <CrazyRobot color="hsl(200, 100%, 60%)" accentColor="hsl(280, 100%, 65%)" scale={0.8} />
        </div>

      </div>
    </SectionWrapper>
  );
}
