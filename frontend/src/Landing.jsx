// Landing.jsx
import { motion } from "framer-motion";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="landing-title"
      >
        Welcome to Verify AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="landing-subtitle"
      >
        AI-Powered Tool to Verify News Headlines Instantly
      </motion.p>

      <motion.div
        className="loading-bar"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5 }}
      />
    </div>
  );
}

export default Landing;
