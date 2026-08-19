import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormStatus(
      "Thanks for reaching out. I'll get back to you soon."
    );
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <div className="section-label">
          <span>10</span>
          <h2>Contact</h2>
        </div>

        <div className="contact-heading">
          <motion.h3
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Let's build something
            <br />
            worth building.
          </motion.h3>

          <p>
            Have an idea, project, collaboration, or just want to
            talk technology? I'd be happy to connect.
          </p>
        </div>
      </div>

      <div className="contact-content">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{ duration: 0.8 }}
        >
          <span className="contact-small-label">
            FIND ME ONLINE
          </span>

          <a
            href="mailto:tiwariraman884@gmail.com"
            className="contact-email"
          >
            RamanTiwari.com
          </a>

          <div className="contact-links">
            <a
              href="https://github.com/tiwariraman884"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>

            <a
              href="https://www.linkedin.com/in/raman-kumar-tiwari-698064370"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
          </div>

          <div className="contact-location">
            <span>BASED IN</span>
            <strong>ROORKEE, INDIA</strong>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
        >
          <div className="form-row">
            <label htmlFor="name">
              NAME *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">
              EMAIL *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="subject">
              SUBJECT
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
            />
          </div>

          <div className="form-row">
            <label htmlFor="message">
              MESSAGE *
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell me about it..."
              required
            />
          </div>

          <button type="submit" className="contact-submit">
            SEND MESSAGE →
          </button>

          {formStatus && (
            <p className="form-status">
              {formStatus}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}