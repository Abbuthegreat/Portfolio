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
    <section id={id} className={`relative py-14 sm:py-20 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary neon-text">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 font-body text-base sm:text-lg text-muted-foreground">{subtitle}</p>
          )}
          <div className="mt-4 h-0.5 w-16 sm:w-20 bg-primary opacity-60" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
