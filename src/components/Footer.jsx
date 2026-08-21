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
             <h2>
            SEND MESSAGE →
            </h2>
          </a>

          <a
            href="https://www.linkedin.com/in/raman-kumar-tiwari-698064370"
            target="_blank"
            rel="noopener noreferrer"
          > <h2>
            LINKEDIN →
            </h2>
          </a>

          <a
            href="https://github.com/tiwariraman884"
            target="_blank"
            rel="noopener noreferrer"
          > <h2>
            GITHUB →
            </h2>
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          > <h2>
            DOWNLOAD RÉSUMÉ →
            </h2>
          </a>
        </div>

        <div className="footer-response"> <h2>
          RESPONSE WITHIN 24 H · IST
          </h2>
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
          <h6>
          “Build with purpose. Create something that matters.”
          </h6>
        </blockquote>

        <span>
          <h2>
          — RAMAN KUMAR TIWARI
          </h2>
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
          > <h2>
            GITHUB
            </h2>
          </a>

          <a
            href="https://www.linkedin.com/in/raman-kumar-tiwari-698064370"
            target="_blank"
            rel="noopener noreferrer"
          > <h2>
            LINKEDIN
            </h2>
          </a>

          <a
            href={`mailto:${EMAIL}`}
          ><h2>
            EMAIL
            </h2>
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          ><h2>
            RESUME
            </h2>
          </a>

          <a
            href="#top"
            onClick={handleBackToTop}
          ><h2>
            TOP ↑
            </h2>
          </a>
        </div>
      </div>
    </footer>
  );
}