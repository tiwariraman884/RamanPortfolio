import { motion } from "framer-motion";


export default function Status() {
  return (
    <section className="editorial-section status-section">
      <div className="section-label">
        <span>03</span>
        <h2>Status</h2>
      </div>

      <motion.div
        className="section-content status-content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="status-indicator">
          <span className="status-dot" />
          <span>CURRENTLY BUILDING</span>
        </div>

        <h3>
          Learning, building, experimenting.
        </h3>

        <p>
          Currently improving my portfolio and development workflow while
          building projects across AI, web development, and machine learning.
        </p>

        <p>
          I'm also strengthening JavaScript, React, backend development, and
          DSA through consistent hands-on practice.
        </p>

        <div className="status-meta">
          <span>OPEN TO</span>
          <strong>
            <h4>
            HACKATHONS · COLLABORATION · INTERESTING PRODUCTS
            </h4>
          </strong>
        </div>
      </motion.div>
    </section>
  );
}