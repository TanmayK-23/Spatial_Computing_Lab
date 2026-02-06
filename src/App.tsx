import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CircuitDetail from "./routes/CircuitDetail";
import About from "./routes/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* Upper canvas glow (prevents dead top area) */}
      <div className="absolute inset-x-0 top-0 h-[45vh] -z-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.22),transparent_70%)]
          "
        />
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18),transparent_75%)]
          "
        />
      </div>
      {/* Bottom canvas glow (mirrors top glow) */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] -z-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.22),transparent_70%)]
          "
        />
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.18),transparent_75%)]
          "
        />
      </div>
      <Navbar />
      <main className="relative z-10 pt-14">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/circuit/:slug" element={<CircuitDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;