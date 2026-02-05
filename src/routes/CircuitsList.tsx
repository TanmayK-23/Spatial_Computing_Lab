import { Link } from "react-router-dom";
import { circuits } from "../data/circuits";

export default function CircuitsList() {
  return (
<section className="text-white py-24">      <div className="max-w-5xl mx-auto px-6">
        
        <h1 className="text-3xl font-bold">
          Lab <span className="text-brand-gradient">Experiments</span>
        </h1>



        <br></br>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {circuits.map((circuit, idx) => (
            <Link
            key={circuit.id}
            to={`/circuit/${circuit.slug}`}
            className="
              reveal
              bg-slate-900/60 backdrop-blur-lg
              border border-slate-800/70
              rounded-2xl overflow-hidden
              transition-all duration-300
              hover:-translate-y-2
             hover:border-amber-400/80
              hover:shadow-xl hover:shadow-amber-400/20
              group
            "
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
              <div className="h-40 bg-slate-950/80 flex items-center justify-center">
                <img
                  src={circuit.thumbnail}
                  alt={circuit.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 tracking-tight">{circuit.name}</h2>
                <span
                  className="
                    inline-block mb-3
                    text-xs font-medium
                    px-3 py-1 rounded-full
                    text-white
                    bg-gradient-to-r from-blue-500/60 to-purple-500/60
                    backdrop-blur-sm
                    shadow-sm shadow-blue-500/10
                  "
                >
                  {circuit.category}
                </span>
                <p className="text-slate-400 text-sm line-clamp-2">
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
