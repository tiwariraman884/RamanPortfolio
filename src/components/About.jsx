import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="editorial-section about-section">
      <div className="section-label">
        <span>01</span>
        <h2>About</h2>
      </div>

      <motion.div
        className="section-content about-content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p>
          Hey! I'm a 2nd Year B.Tech Computer Science student at Roorkee Institute of
          Technology, focused on software development, artificial intelligence,
          and building technology that solves practical problems.
        </p>

        <p>
          I enjoy taking ideas from a rough concept to a working product —
          whether that's an AI-powered application, a machine learning system,
          a developer tool, or a hackathon prototype.
        </p>

        <p>
          My current focus is strengthening my foundations in JavaScript,
          React, backend development, machine learning, and DSA through
          hands-on projects and continuous practice.
        </p>

        <div className="about-highlight">
          <p>
            I don't want to build software just to say it exists.
          </p>

          <p>
            I want to understand the problem first, build around real
            constraints, and keep improving until the solution becomes
            genuinely useful.
          </p>
        </div>
      </motion.div>
    </section>
  );
}