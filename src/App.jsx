import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import NetworkBackground from "./three/NetworkBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";

/* ─── Eagerly loaded (above the fold / critical path) ───────────────────────
   Navbar, Hero, CustomCursor, NetworkBackground stay synchronous.
   Everything else is code-split so it's not in the initial JS bundle.
─────────────────────────────────────────────────────────────────────────── */

/* ─── Below-the-fold: lazy-loaded chunks ────────────────────────────────── */
const About          = lazy(() => import("./components/About"));
const Philosophy     = lazy(() => import("./components/Philosophy"));
const Status         = lazy(() => import("./components/Status"));
const Projects       = lazy(() => import("./components/Projects"));
const Experience     = lazy(() => import("./components/Experience"));
const Recognition    = lazy(() => import("./components/Recognition"));
const Certifications = lazy(() => import("./components/Certifications"));
const Capabilities   = lazy(() => import("./components/Capabilities"));
const GithubActivity = lazy(() => import("./components/GithubActivity"));
const Contact        = lazy(() => import("./components/Contact"));
const Footer         = lazy(() => import("./components/Footer"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

/* Minimal no-flash fallback — just invisible space, no spinner in DOM */
function SectionFallback() {
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const isProjectPage =
    window.location.pathname.startsWith("/projects/");

  if (isProjectPage) {
    return (
      <div className="app">
        <div className="network-background">
          <CustomCursor />
          <NetworkBackground />
        </div>

        <div className="page-content">
          <Suspense fallback={<SectionFallback />}>
            <ProjectDetails />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <main className="app">
      <CustomCursor />
      <NetworkBackground />

      <div className="page-content">
        <Navbar />

        {/* ── Above the fold: synchronous ── */}
        <Hero />

        {/* ── Below the fold: each section is a separate chunk ── */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Philosophy />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Status />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Recognition />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Capabilities />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GithubActivity />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </main>
  );
}
export default App;