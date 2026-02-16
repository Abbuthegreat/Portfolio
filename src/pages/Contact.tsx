import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MiniRobot from "../components/MiniRobot";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "your.email@example.com", href: "mailto:your.email@example.com" },
  { icon: Phone, label: "Phone", value: "+1 (234) 567-8900", href: "tel:+12345678900" },
  { icon: MapPin, label: "Location", value: "Your City, Country", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl font-black text-foreground md:text-5xl">
              Get In <span className="text-primary neon-text-strong">Touch</span>
            </h1>
            <p className="mt-4 font-body text-lg text-muted-foreground max-w-md">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat!
            </p>

            <div className="mt-10 space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 glass rounded-xl p-4 transition-all hover:neon-border group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-body text-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl glass transition-all hover:neon-border hover:text-primary text-muted-foreground"
                  >
                    <s.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[400px] lg:h-[500px]"
          >
            <MiniRobot color="hsl(160, 100%, 50%)" scale={1.2} />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
