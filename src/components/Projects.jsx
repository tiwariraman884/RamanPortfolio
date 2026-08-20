import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../data/projects";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);




  return (
    <section
      id="work"
      className="projects-section"
    >
      <div className="projects-header">
        <div className="section-label">
          SELECTED WORK
        </div>

        <p className="projects-intro">
          A selection of projects I've built while exploring AI,
          software development, machine learning, and practical
          technology.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <motion.a
            key={project.slug}
            href={`/projects/${project.slug}`}
            target="project-detail"
            rel="noopener noreferrer"
            className="project-row"
            onMouseEnter={() =>
              setActiveProject(project)
            }
            onMouseLeave={() =>
              setActiveProject(null)
            }
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="project-number">
              {project.id}
            </div>

            <div className="project-main">
              <div className="project-heading">
                <h3>{project.title}</h3>

                <span>
                  {project.category}
                </span>
              </div>

              <p className="project-description">
                {project.shortDescription}
              </p>

              <div className="project-tech">
                {project.technologies.map(
                  (technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  )
                )}
              </div>
            </div>

            <span className="project-link">
              VIEW ↗
            </span>
          </motion.a>
        ))}
      </div>

      <AnimatePresence>
        {activeProject?.image && (
          <motion.div
            className="project-preview"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 12,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
          >
            <div className="preview-image">
              <img
                src={activeProject.image}
                alt={`${activeProject.title} project preview`}
                loading="eager"
              />
            </div>

            <div className="preview-content">
              <span>
                {activeProject.category}
              </span>

              <h4>
                {activeProject.title}
              </h4>

              <a
                href={`/projects/${activeProject.slug}`}
                target="project-detail"
                rel="noopener noreferrer"
              >
                OPEN PROJECT ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}