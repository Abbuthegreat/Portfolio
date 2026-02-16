import { motion } from "framer-motion";
import HeroRobot from "./HeroRobot";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center grid-bg">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      
      <div className="container relative mx-auto grid grid-cols-1 gap-8 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <p className="font-body text-lg font-medium text-accent uppercase tracking-widest">
            Hello, I'm
          </p>
          <h1 className="mt-2 font-display text-5xl font-black leading-tight text-foreground md:text-7xl">
            Your <span className="text-primary neon-text-strong">Name</span>
          </h1>
          <p className="mt-4 max-w-lg font-body text-xl leading-relaxed text-muted-foreground">
            A passionate developer & designer crafting immersive digital experiences. 
            I build things that live on the internet.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(160_100%_50%/0.4)]"
            >
              View Projects
            </a>
            <a
              href="#resume"
              className="rounded-lg border border-primary/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/10 hover:border-primary/60"
            >
              My Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[400px] lg:h-[500px]"
        >
          <HeroRobot />
        </motion.div>
      </div>
    </section>
  );
}
