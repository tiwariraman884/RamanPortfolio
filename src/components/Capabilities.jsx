import { motion } from "framer-motion";
import skills from "../data/skills";

export default function Capabilities() {
  return (
    <section className="capabilities-section">
      <div className="capabilities-header">
        <div className="section-label">
          <span>08</span>
          <h2>Capabilities</h2>
        </div>

        <p className="capabilities-intro">
          A growing technical toolkit shaped by projects,
          experimentation, and continuous learning.
        </p>
      </div>

      <div className="capabilities-list">
        {skills.map((skill, index) => (
          <motion.article
            key={skill.id}
            className="capability-row"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: index * 0.06,
            }}
          >
            <span className="capability-number">
              {skill.id}
            </span>

            <h3>{skill.category}</h3>

            <div className="capability-items">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}