import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CrazyRobot from "../components/CrazyRobot";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "abbasdamaniya890@gmail.com", href: "mailto:abbasdamaniya890@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9324751817", href: "tel:+919324751817" },
  { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra, India", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Abbuthegreat" },
  { icon: Linkedin, label: "LinkedIn", href: "www.linkedin.com/in/abbas-damaniya-97924a242" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-foreground">
              Get In <span className="text-primary neon-text-strong">Touch</span>
            </h1>
            <p className="mt-3 sm:mt-4 font-body text-base sm:text-lg text-muted-foreground max-w-md">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat!
            </p>

            {/* Contact cards */}
            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 glass rounded-xl p-3 sm:p-4 transition-all hover:neon-border group"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-body text-sm sm:text-base text-foreground truncate">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-8 sm:mt-10">
              <h3 className="font-display text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
                Social Media Handle
              </h3>
              <div className="flex gap-3 sm:gap-4">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl glass transition-all hover:neon-border hover:text-primary text-muted-foreground"
                  >
                    <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — robot (hidden on mobile to save space) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex h-[400px] xl:h-[500px] items-center justify-center"
          >
            <CrazyRobot color="hsl(160, 100%, 50%)" accentColor="hsl(280, 100%, 65%)" scale={1.0} />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
