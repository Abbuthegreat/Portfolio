import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Jatayu D1",
    description: "An autonomous aerial surveillance and response system inspired by real-world disaster and defense applications.",
    tags: ["Flight Controller", "Embedded systems", "OpenCV", "Raspberry pi"],
    link: "https://drive.google.com/drive/folders/12YX5pjyT1Fjl0WNLUFVX5zzzPg_WiEOv",
    github: "#",
    completion: 100,
  },
  {
    title: "Zetta Bot",
    description: "A robot for AI-driven inspection and hazard detection in high-risk environments.",
    tags: ["Sensor Fusion", "YoloV9", "Fusion 360", "3D Printing", "IOT", "Motor Drivers"],
    link: "https://drive.google.com/drive/folders/12_gcHIv-iD-Z1lqpiPO9hPV0qqGiMJV0",
    github: "#",
    completion: 100,
  },
  {
    title: "Agastya",
    description: "An autonomous waste-management robotic car that self-navigates lanes using SLAM and performs real-time vision-based waste detection and segregation.",
    tags: ["ROS2", "Gazebo", "SLAM", "PID Control", "Solid Works", "Rviz", "Inverse Kinematics"],
    link: "https://drive.google.com/drive/folders/198Pduv--P_eIOXOvLYBdBivkf02pXA90",
    github: "#",
    completion: 60,
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Some things I've built">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="group glass rounded-xl p-4 sm:p-6 transition-all hover:neon-border flex flex-col"
          >
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-body text-xs text-muted-foreground">Project Progress</span>
                <span className="font-display text-xs text-primary font-bold">{project.completion}%</span>
              </div>
              <div className="h-1.5 sm:h-2 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.completion}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 font-body text-xs text-primary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 sm:mt-4 flex gap-3">
              <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
