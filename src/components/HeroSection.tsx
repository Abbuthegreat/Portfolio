import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import profileImage from "../../image/IMG_SEGMENT_.png";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center grid-bg pt-16">
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-0">

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
        >
          <p className="font-body text-sm sm:text-base md:text-lg font-medium text-accent uppercase tracking-widest">
            Hello, I'm
          </p>
          <h1 className="mt-2 font-display text-4xl font-black leading-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl">
            Abbas{" "}
            <span className="text-primary neon-text-strong">Damaniya</span>
          </h1>
          <p className="mt-4 font-body text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
            I am an engineering student with a deep interest in machines and
            electronics, guided towards robotics — combining electronics,
            automation, and problem-solving to build real working systems.
            I've built autonomous drones, industrial robot concepts, and aim
            to create practical, industry-focused robotic solutions.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#projects"
              className="rounded-lg bg-primary px-5 py-2.5 sm:px-6 sm:py-3 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(160_100%_50%/0.4)]"
            >
              View Projects
            </a>
            <a
              href="#resume"
              className="rounded-lg border border-primary/30 px-5 py-2.5 sm:px-6 sm:py-3 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/10 hover:border-primary/60"
            >
              My Resume
            </a>
          </div>
        </motion.div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          {/* Wrapper for photo + popup */}
          <div className="relative flex flex-col items-center">

            {/* Clickable photo circle */}
            <Link
              to=""
              className="group flex h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 items-center justify-center overflow-hidden rounded-full bg-primary/15 ring-2 ring-primary/50 shadow-[0_0_35px_hsl(var(--primary)/0.35)] transition-all duration-300 hover:ring-primary/80 hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={profileImage}
                alt="Abbas Damaniya"
                className="h-full w-full scale-110 translate-y-2 object-cover transition-transform duration-300 group-hover:scale-125"
              />
            </Link>

            {/* ── Popup tooltip ── */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="photo-tooltip"
                  initial={{ opacity: 0, y: 16, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.92 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute -bottom-28 sm:-bottom-32 left-1/2 -translate-x-1/2 w-[260px] sm:w-[300px] pointer-events-none z-20"
                >
                  {/* Arrow */}
                  <div className="flex justify-center mb-1">
                    <div
                      className="w-3 h-3 rotate-45 border-l border-t"
                      style={{
                        background: "hsl(220,20%,8%)",
                        borderColor: "hsl(160,100%,50%/0.35)",
                        boxShadow: "0 0 8px hsl(160,100%,50%/0.3)",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="relative rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-center overflow-hidden"
                    style={{
                      background: "hsl(220,20%,7%/0.85)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid hsl(160,100%,50%/0.3)",
                      boxShadow:
                        "0 0 24px hsl(160,100%,50%/0.18), 0 0 60px hsl(280,100%,65%/0.08), inset 0 0 20px hsl(160,100%,50%/0.04)",
                    }}
                  >
                    {/* Ambient glow strip */}
                    <div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, hsl(160,100%,50%/0.7), hsl(280,100%,65%/0.5), transparent)",
                      }}
                    />

                    {/* Icon row */}
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span
                        className="font-display text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: "hsl(160,100%,60%)" }}
                      >
                        Psst — secret portal
                      </span>
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>

                    {/* Main message */}
                    <p className="font-body text-xs sm:text-sm text-foreground leading-snug">
                      Hey{" "}
                      <span className="text-primary font-semibold">👋</span> — want to
                      know more about{" "}
                      <span
                        className="font-bold"
                        style={{
                          background: "linear-gradient(90deg,hsl(160,100%,55%),hsl(280,100%,65%))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        my personal life?
                      </span>{" "}
                      Just Click the photo!
                    </p>

                    {/* Bottom hint */}
                    <div className="mt-2 flex items-center justify-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-display text-[9px] font-medium uppercase tracking-widest text-muted-foreground">

                      </span>
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    </div>

                    {/* Bottom glow strip */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, hsl(280,100%,65%/0.5), hsl(160,100%,50%/0.7), transparent)",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
