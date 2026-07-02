import { useEffect } from "react";
import { observeReveal } from "../main";
import CircuitsList from "./CircuitsList";
import { useLocation } from "react-router-dom";
import Threads from "../components/Threads";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    observeReveal();
  }, []);

  useEffect(() => {
    if ((location.state as { scrollToCircuits?: boolean })?.scrollToCircuits) {
      setTimeout(() => {
        document
          .getElementById("circuits")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    if ((location.state as { scrollToAbout?: boolean })?.scrollToAbout) {
      setTimeout(() => {
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center py-20 animate-fadeIn overflow-hidden">

        {/* Interactive Threads Background */}
        <div className="absolute inset-0 z-[-2] opacity-70">
          <Threads
            color={[0, 0, 0]}
            amplitude={1.2}
            distance={0.1}
            enableMouseInteraction={true}
          />
        </div>



        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 mb-24">
          <h1 className="text-6xl md:text-[112px] font-light leading-[1.05] tracking-tight-display text-ink mb-20 display-font max-w-4xl mx-auto">
            Circuit Verse
          </h1>

          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => document.getElementById("circuits")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-ink text-canvas text-[15px] font-semibold px-8 h-[48px] rounded-full hover:bg-black transition-all flex items-center justify-center shadow-lg shadow-ink/10 ring-1 ring-ink"
            >
              Explore Lab
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-transparent text-ink text-[15px] font-semibold px-8 h-[48px] rounded-full border-[1.5px] border-ink hover:bg-ink hover:text-canvas transition-all flex items-center justify-center shadow-sm"
            >
              About
            </button>
          </div>

          <p className="text-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Master electronics with our interactive 3D models and Augmented Reality tools. Learn, visualize, and build hardware directly in your browser—no physical components required.
          </p>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 inset-x-0 w-full flex flex-col items-center justify-center text-center gap-3 opacity-40 animate-bounce">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink">Scroll to explore</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>



      {/* Circuits reveal section */}
      <section id="circuits" className="relative scroll-mt-24">
        <CircuitsList />
      </section>

      {/* About Section */}
      <section id="about" className="pt-24 pb-32 border-t border-hairline scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6 space-y-16 w-full reveal text-center">
          <header className="space-y-6">
            <h1 className="text-5xl md:text-[48px] font-light tracking-tight-display display-font text-ink">
              About the Project
            </h1>
            <p className="text-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              This project is developed as part of the Spatial Computing Lab to
              provide an interactive and immersive way to explore electronics
              experiments using 3D and AR technologies.
            </p>

            <div className="max-w-3xl mt-16 pt-16 border-t border-hairline mx-auto w-full">
              <h2 className="font-light display-font text-ink mb-12 text-3xl text-center">Project Credits</h2>

              <div className="space-y-12 text-left">

                {/* Guidance */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                  <div className="md:w-1/3 pt-1">
                    <strong className="text-ink font-medium tracking-widest uppercase text-xs">Guidance</strong>
                  </div>
                  <div className="md:w-2/3 flex flex-col gap-6 text-body">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                      <span className="text-muted text-xs uppercase tracking-wider w-36 shrink-0">Lab Coordinator</span>
                      <span className="text-lg">Dr. R. I. Minu</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                      <span className="text-muted text-xs uppercase tracking-wider w-36 shrink-0">Faculty Mentor</span>
                      <span className="text-lg">Dr. Angayarkanni V</span>
                    </div>
                  </div>
                </div>

                {/* Development */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start border-t border-hairline pt-12">
                  <div className="md:w-1/3 pt-1">
                    <strong className="text-ink font-medium tracking-widest uppercase text-xs">Development</strong>
                  </div>
                  <div className="md:w-2/3 flex flex-col gap-4 text-body text-lg">
                    <div>Tanmay Kumar</div>
                    <div>Anshul Pagar</div>
                    <div>Kushagra Srivastava</div>
                  </div>
                </div>

              </div>
            </div>
          </header>
        </div>
      </section>
    </>
  );
}