import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <p className="font-display text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary">Abbas Damaniya</span>. Built with code and robots.
        </p>
      </div>
    </footer>
  );
}
