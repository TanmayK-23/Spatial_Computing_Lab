import { Link } from "react-router-dom";
import { circuits } from "../data/circuits";

export default function CircuitsList() {
  return (
    <section className="pt-8 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        <h1 className="text-4xl font-light mb-12 display-font text-ink text-center">
          Lab Experiments
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {circuits.map((circuit, idx) => (
            <Link
            key={circuit.slug}
            to={`/circuit/${circuit.slug}`}
              className="
              reveal
              bg-surface-card
              border border-hairline
              rounded-xl overflow-hidden
              transition-all duration-300
              hover:-translate-y-2
              hover:border-hairline-strong
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]
              group
            "
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
              <div className="h-40 bg-surface-strong flex items-center justify-center overflow-hidden">
                <img
                  src={circuit.thumbnail}
                  alt={circuit.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-medium mb-3 text-ink tracking-tight">{circuit.name}</h2>
                <span
                  className="
                    inline-block mb-4
                    text-[12px] font-semibold tracking-[0.96px] uppercase
                    px-3 py-1 rounded-full
                    text-ink bg-surface-strong
                  "
                >
                  {circuit.category}
                </span>
                <p className="text-body text-sm line-clamp-2">
                  {circuit.description}
                </p>
                <p className="mt-4 text-sm font-medium text-ink opacity-0 group-hover:opacity-100 transition-opacity">
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
