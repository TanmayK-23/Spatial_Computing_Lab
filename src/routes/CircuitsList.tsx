import { Link } from "react-router-dom";
import { circuits } from "../data/circuits";

export default function CircuitsList() {
  return (
    <section className="text-white py-16 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6">
        
      <h1 className="text-3xl font-bold">Spatial Computing Lab Experiments</h1>

        <p className="text-slate-400 mt-2 max-w-3xl">
          Browse through all circuit experiments available in the E-Yantra Lab.
          Scan the QR codes placed near lab setups or explore the experiments
          interactively here.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Each experiment corresponds to a physical setup in the lab. 
        </p>

        <br></br>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {circuits.map((circuit) => (
            <Link
              key={circuit.id}
              to={`/circuit/${circuit.slug}`}
              className="
                bg-slate-800 border border-slate-700 rounded-xl overflow-hidden
                transition-all duration-300
                hover:-translate-y-2
                hover:border-blue-500
                hover:shadow-xl hover:shadow-blue-500/30
                group
              "
            >
              <div className="h-40 bg-slate-700 flex items-center justify-center">
                <img
                  src={circuit.thumbnail}
                  alt={circuit.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{circuit.name}</h2>
                <span className="inline-block mb-3 text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                  {circuit.category}
                </span>
                <p className="text-slate-300 text-sm line-clamp-2">
                  {circuit.description}
                </p>
                <p className="mt-3 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition">
                  View in interactive 3D →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}