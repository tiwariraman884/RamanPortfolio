import { motion } from "framer-motion";
import certifications from "../data/certifications";

export default function Certifications() {
  return (
    <section className="certifications-section">
      <div className="certifications-header">
        <div className="section-label">
          <span>07</span>
          <h2>Certifications</h2>
        </div>

        <p className="certifications-intro">
          Selected certifications and credentials from my
          technical learning journey.
        </p>
      </div>

      <div className="certifications-grid">
        {certifications.map((certificate, index) => (
          <motion.article
            key={certificate.id}
            className="certificate-card"
            initial={{ opacity: 0, y: 35 }}
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
            <div className="certificate-image-wrapper">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="certificate-image"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="certificate-info">
              <div>
                <h3>{certificate.title}</h3>

                <p>
                  {certificate.issuer} · {certificate.year}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}