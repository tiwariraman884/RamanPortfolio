import { motion } from "framer-motion";

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-content">
        <motion.p
          className="eyebrow"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          COMPUTER SCIENCE — ROORKEE INSTITUTE OF TECHNOLOGY
        </motion.p>

        <motion.h1
          className="hero-title"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Raman
          <br />
          Kumar
          <br />
          Tiwari
        </motion.h1>

        <motion.p
          className="hero-quote"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          "Build with curiosity.
          <br />
          Solve with purpose."
        </motion.p>

        <motion.p
          className="hero-description"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Computer Science student, developer, hackathon builder,
          and AI enthusiast creating practical technology for
          real-world problems.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="#work" className="hero-button">
            VIEW WORK ↗
          </a>

          <a href="#contact" className="hero-button secondary">
            CONTACT
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-image-wrapper"
        initial={{
          opacity: 0,
          x: 50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1.1,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="image-glow" />

        <img
          src="/profile.png"
          alt="Raman Kumar Tiwari"
          className="hero-image"
        />
      </motion.div>
    </section>
  );
}