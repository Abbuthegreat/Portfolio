import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionWrapper({ children, id, title, subtitle, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-primary neon-text md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 font-body text-lg text-muted-foreground">{subtitle}</p>
          )}
          <div className="mt-4 h-0.5 w-20 bg-primary opacity-60" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
