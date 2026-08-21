import { motion } from "framer-motion";

const experiences = [
  {
    period: "2026 — PRESENT",
    role: "PROJECT-BASED WEB DEVELOPMENT",
    organization: "AI · WEB DEVELOPMENT · MACHINE LEARNING",
    description:
      "Building practical web projects across artificial intelligence, machine learning, frontend development, backend APIs, and full-stack workflows.",
  },
  {
    period: "2026",
    role: "TEAM LEAD — IBM Z DATATHON",
    organization: "SIX-MEMBER TECHNICAL TEAM",
    description:
      "Led a six-member team while developing an AI/ML-based credit card fraud detection system with a Random Forest model and FastAPI prediction backend.",
  },
  {
    period: "2025 — PRESENT",
    role: "TECHNICAL LEARNING & DEVELOPMENT",
    organization: "JAVASCRIPT · REACT · BACKEND · DSA",
    description:
      "Continuously strengthening programming fundamentals and modern development skills through structured learning, coding practice, and hands-on projects.",
  },
];

export default function Experience() {
  return (
    <section className="experience-section">
      <div className="experience-header">
        <div className="section-label">
          <span>05</span>
          <h2>Experience</h2>
        </div>

        <p className="experience-intro">
          My experience so far has been shaped by building projects,
          leading technical teams, participating in competitions, and
          learning by solving real engineering problems.
        </p>
      </div>

      <div className="experience-list">
        {experiences.map((item, index) => (
          <motion.article
            key={`${item.role}-${index}`}
            className="experience-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="experience-period">
              {item.period}
            </div>

            <div className="experience-main">
              <h3>{item.role}</h3>

              <p className="experience-org">
                {item.organization}
              </p>

              <p className="experience-description">
                {item.description}
              </p>
            </div>

            <div className="experience-index">
              0{index + 1}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}