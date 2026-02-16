import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description: "A full-stack web application with real-time features and modern UI.",
    tags: ["React", "Node.js", "WebSocket"],
    link: "#",
    github: "#",
  },
  {
    title: "Project Beta",
    description: "Mobile-first e-commerce platform with payment integration.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "Project Gamma",
    description: "AI-powered dashboard for data visualization and analytics.",
    tags: ["Python", "React", "D3.js"],
    link: "#",
    github: "#",
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Some things I've built">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="group glass rounded-xl p-6 transition-all hover:neon-border"
          >
            <div className="mb-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${60 + i * 15}%` }}
              />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 font-body text-muted-foreground">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 font-body text-xs text-primary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
