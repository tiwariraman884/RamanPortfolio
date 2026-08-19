import { motion } from "framer-motion";

const RESUME_URL =
  "https://drive.google.com/file/d/1Jc1ZbQGYGFF40yneorPwTcV0qpUrqbw0/view?usp=sharing";

const EMAIL = "tiwariraman884@gmail.com";

function handleBackToTop(event) {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export default function Footer() {
  return (
    <footer className="footer-section">
      <motion.div
        className="footer-upper"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="footer-utility-links">
          <a href="#contact">
            SEND MESSAGE →
          </a>

          <a
            href="https://www.linkedin.com/in/raman-kumar-tiwari-698064370"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN →
          </a>

          <a
            href="https://github.com/tiwariraman884"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB →
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD RÉSUMÉ →
          </a>
        </div>

        <div className="footer-response">
          RESPONSE WITHIN 24 H · IST
        </div>
      </motion.div>

      <motion.div
        className="footer-quote"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.9,
          delay: 0.1,
        }}
      >
        <blockquote>
          “Build with purpose. Create something that matters.”
        </blockquote>

        <span>
          — RAMAN KUMAR TIWARI
        </span>
      </motion.div>

      <div className="footer-bottom">
        <div className="footer-location">
          RAMAN KUMAR TIWARI — ROORKEE, INDIA · 2026
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/tiwariraman884"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/raman-kumar-tiwari-698064370"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>

          <a
            href={`mailto:${EMAIL}`}
          >
            EMAIL
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            RÉSUMÉ
          </a>

          <a
            href="#top"
            onClick={handleBackToTop}
          >
            TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}