import { useEffect } from "react";
import Lenis from "lenis";
import NetworkBackground from "./three/NetworkBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Philosophy from "./components/Philosophy";
import Status from "./components/Status";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Recognition from "./components/Recognition";
import Certifications from "./components/Certifications";
import Capabilities from "./components/Capabilities";
import GithubActivity from "./components/GithubActivity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ProjectDetails from "./pages/ProjectDetails";

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
          <ProjectDetails />
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

        <Hero />

        <About />
        <Philosophy />
        <Status />
        <Projects />
        <Experience />
        <Recognition />
        <Certifications />
        <Capabilities />
        <GithubActivity />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
export default App;