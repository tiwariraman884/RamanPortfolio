import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../data/projects";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="work" className="projects-section">
      <div className="projects-header">
        <div className="section-label">
          <span>04</span>
          <h2>Selected Work</h2>
        </div>

        <p className="projects-intro">
          A selection of projects I've built while exploring AI,
          software development, machine learning, and practical
          technology.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <motion.article
            key={project.id}
            className="project-row"
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="project-number">
              {project.id}
            </div>

            <div className="project-main">
              <div className="project-heading">
                <h3>{project.title}</h3>

                <span>{project.subtitle}</span>
              </div>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-tech">
                {project.technologies.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.demo}
              className="project-link"
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                if (project.demo === "#") {
                  event.preventDefault();
                }
              }}
            >
              VIEW ↗
            </a>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="project-preview"
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 10,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="preview-image">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                loading="lazy"
                decoding="async"
            />
            </div>

            <div className="preview-content">
              <span>PROJECT {activeProject.id}</span>

              <h4>{activeProject.title}</h4>

              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  if (activeProject.github === "#") {
                    event.preventDefault();
                  }
                }}
              >
                GITHUB ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}