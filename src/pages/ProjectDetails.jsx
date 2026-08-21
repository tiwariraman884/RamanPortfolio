import { motion } from "framer-motion";
import projects from "../data/projects";
import Footer from "../components/Footer";

function getCurrentProject() {
  const slug = window.location.pathname
    .split("/")
    .filter(Boolean)
    .pop();

  return projects.find(
    (project) => project.slug === slug
  );
}

function getNextProject(currentProject) {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentProject.slug
  );

  if (currentIndex === -1) {
    return projects[0];
  }

  return projects[
    (currentIndex + 1) % projects.length
  ];
}

export default function ProjectDetails() {
  const project = getCurrentProject();

  if (!project) {
    return (
      <main className="project-detail-page">
        <nav className="project-detail-nav">
          <a
            href="/"
            className="project-detail-brand"
          >
            RAMAN KUMAR TIWARI
          </a>

          <a
            href="/#work"
            className="project-detail-back"
          >
            ← BACK TO WORK
          </a>
        </nav>

        <section className="project-detail-not-found">
          <span>404</span>

          <h1>Project not found.</h1>

          <a href="/#work">
            RETURN TO SELECTED WORK ↗
          </a>
        </section>

        <Footer />
      </main>
    );
  }

  const nextProject = getNextProject(project);

  return (
    <main className="project-detail-page">

      {/* ==================================================
          PROJECT DETAIL NAVBAR
      ================================================== */}

      <nav className="project-detail-nav">
        <a
          href="/"
          className="project-detail-brand"
        >
          RAMAN KUMAR TIWARI
        </a>

        <a
          href="/#work"
          className="project-detail-back"
        >
          ← BACK TO WORK
        </a>
      </nav>


      {/* ==================================================
          HERO
      ================================================== */}

      <section className="project-detail-hero">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="project-detail-number">
            {project.id}
          </div>

          <p className="project-detail-category">
            {project.category}
          </p>

          <h1>{project.title}</h1>

          <p className="project-detail-lead">
            {project.shortDescription}
          </p>
        </motion.div>
      </section>


      {/* ==================================================
          PROJECT SCREENSHOT
      ================================================== */}

      <section className="project-detail-image-section">
        <motion.div
          className="project-detail-image-wrapper"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="project-detail-image"
          />
        </motion.div>
      </section>


      {/* ==================================================
          OVERVIEW
      ================================================== */}

      <section className="project-detail-section">
        <div className="project-detail-label">
          01 / OVERVIEW
        </div>

        <div className="project-detail-content">
          <h2>About the project</h2>

          <p>{project.overview}</p>
        </div>
      </section>


      {/* ==================================================
          PROBLEM
      ================================================== */}

      <section className="project-detail-section">
        <div className="project-detail-label">
          02 / THE PROBLEM
        </div>

        <div className="project-detail-content">
          <h2>Why it was built</h2>

          <p>{project.problem}</p>
        </div>
      </section>


      {/* ==================================================
          SOLUTION
      ================================================== */}

      <section className="project-detail-section">
        <div className="project-detail-label">
          03 / SOLUTION
        </div>

        <div className="project-detail-content">
          <h2>How it works</h2>

          <p>{project.solution}</p>
        </div>
      </section>


      {/* ==================================================
          FEATURES
      ================================================== */}

      <section className="project-detail-section">
        <div className="project-detail-label">
          04 / FEATURES
        </div>

        <div className="project-detail-content">
          <h2>Key capabilities</h2>

          <div className="project-detail-list">
            {project.features.map(
              (feature, index) => (
                <div
                  key={feature}
                  className="project-detail-list-item"
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{feature}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================
          TECHNOLOGY
      ================================================== */}

      <section className="project-detail-section">
        <div className="project-detail-label">
          05 / TECHNOLOGY
        </div>

        <div className="project-detail-content">
          <h2>Technology stack</h2>

          <div className="project-detail-tech">
            {project.technologies.map(
              (technology) => (
                <span key={technology}>
                  {technology}
                </span>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================
          ARCHITECTURE
      ================================================== */}

      <section className="project-detail-section">
        <div className="project-detail-label">
          06 / ARCHITECTURE
        </div>

        <div className="project-detail-content">
          <h2>System flow</h2>

          <div className="project-detail-architecture">
            {project.architecture.map(
              (item, index) => (
                <div
                  key={item}
                  className="architecture-item"
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{item}</strong>

                  {index !==
                    project.architecture.length - 1 && (
                    <b><strong>↓</strong></b>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================
          GITHUB CTA
      ================================================== */}

      <section className="project-detail-cta">
        <p>WANT TO EXPLORE THE CODE?</p>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        ><h6>
          VIEW ON GITHUB ↗
          </h6>
        </a>
      </section>


      {/* ==================================================
          NEXT PROJECT
      ================================================== */}

      <section className="next-project-section">
        <div className="next-project-label">
          NEXT PROJECT
        </div>

        <a
          href={`/projects/${nextProject.slug}`}
          target="project-detail"
          rel="noopener noreferrer"
          className="next-project-link"
        >
          <div className="next-project-meta">
            <span>{nextProject.id}</span>

            <span>
              {nextProject.category}
            </span>
          </div>

          <div className="next-project-title-row">
            <h2>{nextProject.title}</h2>

            <span className="next-project-arrow">
              →
            </span>
          </div>

          <p>
            {nextProject.shortDescription}
          </p>
        </a>
      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </main>
  );
}