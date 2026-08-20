import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import certifications from "../data/certifications";

export default function Certifications() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fullImageLoaded, setFullImageLoaded] = useState(false);

  const openModal = useCallback((index) => {
    setFullImageLoaded(false);
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback((e) => {
    if (e) e.stopPropagation();
    setFullImageLoaded(false);
    setSelectedIndex((prev) => (prev === null ? null : (prev === 0 ? certifications.length - 1 : prev - 1)));
  }, []);

  const showNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setFullImageLoaded(false);
    setSelectedIndex((prev) => (prev === null ? null : (prev === certifications.length - 1 ? 0 : prev + 1)));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrevious();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, closeModal, showPrevious, showNext]);

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
            onClick={() => openModal(index)}
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
            style={{ cursor: "pointer" }}
          >
            <div className="certificate-image-wrapper">
              <img
                src={certificate.thumbnail}
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
              {/* Optional credential link logic to stop propagation */}
              {certificate.url && (
                <a 
                  href={certificate.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="certificate-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  VIEW CREDENTIAL ↗
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="certificate-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <button
              className="certificate-modal-close"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              aria-label="Close modal"
            >
              × CLOSE
            </button>

            <motion.div
              className="certificate-modal-content"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {!fullImageLoaded && (
                <div className="certificate-modal-loading">
                  <div className="certificate-modal-spinner" />
                </div>
              )}
              <img
                src={certifications[selectedIndex].full}
                alt={certifications[selectedIndex].title}
                className="certificate-modal-image"
                style={{ opacity: fullImageLoaded ? 1 : 0 }}
                onLoad={() => setFullImageLoaded(true)}
              />
              <div className="certificate-modal-caption">
                <h4>{certifications[selectedIndex].title}</h4>
                <p>{certifications[selectedIndex].issuer}</p>
              </div>

              <div className="certificate-modal-nav">
                <button
                  className="certificate-nav-btn"
                  onClick={showPrevious}
                  aria-label="Previous certificate"
                >
                  ← PREVIOUS
                </button>
                <button
                  className="certificate-nav-btn"
                  onClick={showNext}
                  aria-label="Next certificate"
                >
                  NEXT →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}