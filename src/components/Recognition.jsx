import { motion } from "framer-motion";



const recognitions = [
  {
    year: "2026",
    title: "HACKOCEAN",
    result: "NATIONAL FRONTEND HACKATHON",
    description:
      "Participated in HackOcean 2026, a national-level frontend hackathon focused on building practical digital experiences.",
    linkedin:
      "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_hackocean2026-hackathon-frontenddevelopment-activity-7489714971438850048-yBZH?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2025",
    title: "GFG × RIT HACKATHON",
    result: "3RD PLACE",
    description:
      "Secured 3rd position in the GFG × RIT hackathon with our team project MediBridge.",
    linkedin:
      "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_gfgxrit-greyhats-medibridge-activity-7399437375128526848-kVXo?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2026",
    title: "INNOVATION & PROBLEM SOLVING",
    result: "TECHNICAL EVENT",
    description:
      "Shared an experience focused on innovation, teamwork, and practical problem solving.",
    linkedin:
      "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_an-impactful-weekend-of-innovation-and-problem-solving-activity-7427388867068022786-k2Vi?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2026",
    title: "GOOGLE SOLUTION CHALLENGE",
    result: "PARTICIPANT",
    description:
      "Participated in Solution Challenge 2026 with a project focused on building technology for real-world impact.",
    linkedin:
      "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_solutionchallenge2026-buildwithai-hack2skill-activity-7485573043352899584-Tjvd?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2026",
    title: "Q-HACKATHON 2026",
    result: "36-HOUR INTER-UNIVERSITY INNOVATION SPRINT",
    description:
      "Participated in Q-HACKATHON 2026, a 36-hour inter-university innovation sprint hosted by Quantum University, Roorkee, on May 8–9, 2026.",
    linkedin: "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_qhackathon-hackathon-quantumuniversity-activity-7465448148556181506-TmF5?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2026",
    title: "AESTER ALPHA AI SUMMIT",
    result: "TOP 30",
    description:
      "Recognized among the top participants/projects in an AI-focused event.",
    linkedin: "#",
  },

  {
    year: "2026",
    title: "IBM Z DATATHON",
    result: "TEAM LEAD",
    description:
      "Led a five-member team while building an AI/ML-based credit card fraud detection solution.",
    linkedin: "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_an-impactful-weekend-of-innovation-and-problem-solving-activity-7427388867068022786-k2Vi?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2026",
    title: "SMART INDIA HACKATHON",
    result: "RANK 1302",
    description:
      "Participated in Smart India Hackathon with a problem-focused technology solution.",
    linkedin: "https://www.linkedin.com/posts/raman-kumar-tiwari-698064370_sidequest-promptwars-hack2skill-activity-7469062953410117633-GuBP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFvYRNQBWeCQoPbpW6fbU0BI7FKw2Iv65mY",
  },

  {
    year: "2026",
    title: "GDG CTF",
    result: "PARTICIPANT",
    description:
      "Participated in a cybersecurity-focused Capture The Flag competition.",
    linkedin: "#",
  },
];

export default function Recognition() {
  return (
    <section className="recognition-section">
      <div className="recognition-header">
        <div className="section-label">
          <span>06</span>
          <h2>Recognition</h2>
        </div>

        <p className="recognition-intro">
          Competitions, technical events, achievements, and milestones
          that have shaped my development journey.
        </p>
      </div>

      <div className="recognition-list">
        {recognitions.map((item, index) => (
          <motion.article
            key={`${item.title}-${index}`}
            className="recognition-row"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: index * 0.06,
            }}
          >
            <span className="recognition-year">
              {item.year}
            </span>

            <div className="recognition-main">
              <h3>{item.title}</h3>

              <p><h4>{item.description}</h4></p>

              {item.linkedin !== "#" && (
                <a
                  href={item.linkedin}
                  className="recognition-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4>
                    LINKEDIN POST ↗
                  </h4>
                </a>
              )}
            </div>

            <span className="recognition-result">
              {item.result}
            </span>

            <span className="recognition-arrow">
              
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}