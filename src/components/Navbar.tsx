import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-bold text-primary neon-text">
          &lt;ROBO/&gt;
        </Link>
        <div className="flex items-center gap-8 font-body text-lg font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary neon-text" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={`transition-colors hover:text-primary ${
              location.pathname === "/contact" ? "text-primary neon-text" : "text-muted-foreground"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
