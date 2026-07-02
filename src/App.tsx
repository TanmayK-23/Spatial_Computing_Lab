import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CircuitDetail from "./routes/CircuitDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden text-ink">
      
      <Navbar />
      <main className="relative z-10 pt-[64px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/circuit/:slug" element={<CircuitDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;