import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CircuitsList from "./routes/CircuitsList";
import CircuitDetail from "./routes/CircuitDetail";
import About from "./routes/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
    </div>
      <Navbar />
      <main className="relative z-10">
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