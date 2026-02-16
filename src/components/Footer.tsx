import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary">Your Name</span>. Built with ❤️ and robots.
        </p>
      </div>
    </footer>
  );
}
