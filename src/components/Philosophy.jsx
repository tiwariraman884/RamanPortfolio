import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="editorial-section philosophy-section">
      <div className="section-label">
        <span>02</span>
        <h2>Philosophy</h2>
      </div>

      <motion.div
        className="section-content philosophy-content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="philosophy-line">
          I don't start with a programming language.
        </p>

        <p className="philosophy-line">
          I start with a problem.
        </p>

        <p>
          Then I ask what the simplest useful solution could look like,
          what constraints matter, and what I need to learn to build it well.
        </p>

        <div className="philosophy-quote">
          <span>"Build. Break. Learn. Rebuild."</span>
        </div>

        <p>
          Every project is an opportunity to understand something better —
          about technology, about people, and about how ideas become systems
          that actually work.
        </p>
      </motion.div>
    </section>
  );
}