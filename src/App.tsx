import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CircuitsList from "./routes/CircuitsList";
import CircuitDetail from "./routes/CircuitDetail";
import About from "./routes/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
    </div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/circuits" element={<CircuitsList />} />
          <Route path="/circuit/:slug" element={<CircuitDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;