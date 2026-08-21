import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const GITHUB_USERNAME = "tiwariraman884";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getMonday(date) {
  const result = new Date(date);
  const day = result.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
}

function buildCalendar(days) {
  if (!days.length) return [];

  const contributionMap = new Map(
    days.map((day) => [day.date, day])
  );

  const firstDate = getMonday(
    new Date(`${days[0].date}T00:00:00`)
  );

  const lastDate = new Date(
    `${days[days.length - 1].date}T00:00:00`
  );

  const lastMonday = getMonday(lastDate);

  const weeks = [];

  for (
    let weekStart = new Date(firstDate);
    weekStart <= lastMonday;
    weekStart.setDate(weekStart.getDate() + 7)
  ) {
    const week = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(weekStart);

      currentDate.setDate(
        currentDate.getDate() + dayIndex
      );

      const dateKey = formatDate(currentDate);

      const contribution = contributionMap.get(dateKey);

      week.push(
        contribution || {
          date: dateKey,
          count: 0,
          level: 0,
        }
      );
    }

    weeks.push(week);
  }

  return weeks;
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = "";

  weeks.forEach((week, weekIndex) => {
    const monday = new Date(
      `${week[0].date}T00:00:00`
    );

    const month = monday.toLocaleString("en-US", {
      month: "short",
    });

    if (month !== lastMonth) {
      labels.push({
        index: weekIndex,
        label: month,
      });

      lastMonth = month;
    }
  });

  return labels;
}

function getCurrentYearTotal(contributions) {
  const currentYear = new Date()
    .getFullYear()
    .toString();

  return contributions
    .filter((day) => day.date.startsWith(currentYear))
    .reduce((total, day) => total + day.count, 0);
}

export default function GithubActivity() {
  const [contributions, setContributions] = useState([]);
  const [repositories, setRepositories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);
  const fetchedRef = useRef(false);

  const loadGithubData = async () => {
    try {
      setError("");

      const [contributionsResponse, userResponse] =
        await Promise.all([
          fetch(CONTRIBUTIONS_API, {
            cache: "no-store",
          }),

          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            {
              cache: "no-store",
            }
          ),
        ]);

      if (!contributionsResponse.ok) {
        throw new Error(
          "Unable to load GitHub contributions."
        );
      }

      if (!userResponse.ok) {
        throw new Error(
          "Unable to load GitHub profile."
        );
      }

      const contributionData =
        await contributionsResponse.json();

      const userData =
        await userResponse.json();

      setContributions(
        contributionData.contributions || []
      );

      setRepositories(userData.public_repos ?? 0);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load GitHub data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    /* Defer fetch until section approaches viewport.
       This removes GitHub API calls from the critical path. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fetchedRef.current) {
          fetchedRef.current = true;
          observer.disconnect();
          loadGithubData();

          /* Refresh approximately once per hour */
          const refreshInterval = setInterval(loadGithubData, 60 * 60 * 1000);
          el._ghRefreshInterval = refreshInterval;
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (el._ghRefreshInterval) {
        clearInterval(el._ghRefreshInterval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const weeks = useMemo(
    () => buildCalendar(contributions),
    [contributions]
  );

  const monthLabels = useMemo(
    () => getMonthLabels(weeks),
    [weeks]
  );

  const currentYearContributions = useMemo(
    () => getCurrentYearTotal(contributions),
    [contributions]
  );

  const lastYearContributions = useMemo(() => {
    return contributions.reduce(
      (total, day) => total + day.count,
      0
    );
  }, [contributions]);

  return (
    <section className="github-section" ref={sectionRef}>
      <div className="github-header">
        <div className="section-label">
          <span>09</span>
          <h2>GitHub Activity</h2>
        </div>

        <p className="github-intro">
          Real contribution activity from my GitHub profile,
          updated automatically.
        </p>
      </div>

      <motion.div
        className="github-panel"
        initial={{
          opacity: 0,
          y: 30,
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
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="github-panel-top">
          <div>
            <span className="github-label">
              GITHUB / {GITHUB_USERNAME.toUpperCase()}
            </span>

            <h3>Building in public.</h3>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
          >
            VIEW GITHUB ↗
          </a>
        </div>

        <div className="github-stats">
          <div className="github-stat">
            <strong>
              {loading ? "—" : lastYearContributions}
            </strong>

            <span>
              CONTRIBUTIONS — LAST YEAR
            </span>
          </div>

          <div className="github-stat">
            <strong>
              {loading ? "—" : repositories}
            </strong>

            <span>
              PUBLIC REPOSITORIES
            </span>
          </div>

          <div className="github-stat">
            <strong>
              {loading ? "—" : currentYearContributions}
            </strong>

            <span>
              CONTRIBUTIONS — {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="github-loading">
            Loading contribution activity...
          </div>
        ) : error ? (
          <div className="github-error">
            {error}
          </div>
        ) : (
          <div className="github-calendar">
            <div className="github-months">
              {monthLabels.map((month) => (
                <span
                  key={`${month.label}-${month.index}`}
                  style={{
                    gridColumn:
                      month.index + 1,
                  }}
                >
                  {month.label}
                </span>
              ))}
            </div>

            <div className="github-calendar-body">
              <div className="github-weekdays">
                <span></span>
                <span>Mon</span>
                <span></span>
                <span>Wed</span>
                <span></span>
                <span>Fri</span>
                <span></span>
              </div>

              <div className="github-weeks">
                {weeks.map((week, weekIndex) => (
                  <div
                    className="github-week"
                    key={`week-${weekIndex}`}
                  >
                    {week.map((day) => (
                      <span
                        key={day.date}
                        className={`github-cell level-${day.level}`}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="github-panel-bottom">
            <span>Learn how we count contributions</span>

            <div className="github-legend">
              <span>Less</span>

              <span className="github-cell level-0" />
              <span className="github-cell level-1" />
              <span className="github-cell level-2" />
              <span className="github-cell level-3" />
              <span className="github-cell level-4" />

              <span>More</span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}