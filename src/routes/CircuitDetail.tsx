import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { circuits } from "../data/circuits";
import ModelViewer3D from "../components/ModelViewer3D";
import CircuitBento from "../components/CircuitBento";

const HOTSPOTS_MAP: Record<string, { id: string; position: string; label: string; normal?: string }[]> = {
  "voltage-divider": [
    { id: "r1", position: "-0.086197 m 0.005886 m 0.060606 m", label: "Resistor R1: drops a portion of the input voltage" },
    { id: "r2", position: "-0.024149 m 0.004683 m 0.065716 m", label: "Resistor R2: works with R1 to divide voltage" },
    { id: "breadboard", position: "-0.4 m 0 m 0 m", label: "Breadboard: Used to mount and interconnect components without soldering" },
    { id: "battery", position: "-0.00743 m 0.474856 m 0.006252 m", label: "Power Source: Provides the input voltage for the circuit" },
    { id: "voltmeter", position: "0.642552 m -0.010025 m 0.058602 m", label: "Voltmeter: Measures voltage across the resistor" },
  ],
  "ohms-law": [
    { id: "resistor", position: "-0.024149 m 0.004683 m 0.065716 m", label: "Resistor: Opposes current flow and follows Ohm’s Law (V = IR)" },
    { id: "battery", position: "0.028191 m 0.741747 m -0.004996 m", label: "Power Source: Supplies voltage to the circuit" },
    { id: "ammeter", position: "-0.08999 m 0.332197 m 0.053165 m", label: "Ammeter: Measures the current flowing through the circuit" },
    { id: "voltmeter", position: "0.654095 m -0.009545 m 0.014828 m", label: "Voltmeter: Measures the voltage across the resistor" },
    { id: "breadboard", position: "-0.4 m 0.0 m 0.0 m", label: "Breadboard: Platform used to assemble the circuit without soldering" },
  ],
  "led-current-limiting": [
    { id: "led", position: "-0.091765 m -0.021906 m 0.118719 m", label: "LED: Emits light when forward biased; polarity must be correct" },
    { id: "resistor", position: "-0.024834 m 0.006402 m 0.056125 m", label: "Resistor: Limits current to protect the LED from damage" },
    { id: "battery", position: "0.007182 m 0.474856 m -0.006535 m", label: "Power Source: Supplies voltage to drive the LED circuit" },
    { id: "breadboard", position: "-0.4 m 0 m 0 m", label: "Breadboard: Used to mount and connect components without soldering" },
  ],
  "transistor-switching": [
    { id: "transistor", position: "-0.155982 m 0.001841 m 0.125161 m", label: "Transistor (BJT): Acts as an electronic switch controlled by base current" },
    { id: "base-resistor", position: "-0.198496 m 0.018957 m 0.056988 m", label: "Base Resistor: Limits base current to protect the transistor" },
    { id: "load", position: "-0.09258 m -0.001906 m 0.056316 m", label: "Load: Turns ON or OFF depending on the transistor state" },
    { id: "battery", position: "0.007182 m 0.474856 m -0.006535 m", label: "Power Source: Supplies voltage to drive the circuit" },
    { id: "breadboard", position: "-0.4 m 0 m 0 m", label: "Breadboard: Platform used to assemble the circuit without soldering" },
  ],
  "series-resistors": [
    { id: "r1", position: "-0.024834 m 0.006402 m 0.056125 m", label: "Resistor R1: First resistor connected in series" },
    { id: "r2", position: "-0.087991 m 0.006622 m 0.05519 m", label: "Resistor R2: Second resistor connected in series" },
    { id: "battery", position: "0.007182 m 0.474856 m -0.006535 m", label: "Power Source: Supplies voltage to the series circuit" },
    { id: "breadboard", position: "-0.4 m 0 m 0 m", label: "Breadboard: Used to mount and interconnect components" },
  ],
  "parallel-resistors": [
    { id: "r1", position: "-0.024834 m 0.006402 m 0.056125 m", label: "Resistor R1: One branch of the parallel network" },
    { id: "r2", position: "-0.087991 m 0.006622 m 0.05519 m", label: "Resistor R2: Second branch of the parallel network" },
    { id: "battery", position: "0.007182 m 0.474856 m -0.006535 m", label: "Power Source: Supplies voltage across parallel branches" },
    { id: "breadboard", position: "-0.4 m 0 m 0 m", label: "Breadboard: Used to assemble the parallel circuit" },
  ],
  "rc-circuit": [
    { id: "resistor", position: "-0.024834 m 0.006402 m 0.056125 m", label: "Resistor: Controls the rate of charging and discharging" },
    { id: "capacitor", position: "-0.092411 m -0.020127 m 0.061048 m", label: "Capacitor: Stores and releases electrical energy" },
    { id: "battery", position: "0.007182 m 0.474856 m -0.006535 m", label: "Power Source: Provides voltage for charging the capacitor" },
    { id: "breadboard", position: "-0.4 m 0 m 0 m", label: "Breadboard: Platform used to assemble the RC circuit" },
  ],
  "traffic-light-esp8266": [
    { id: "esp8266", position: "-0.496075 m -0.04519 m 0.379513 m", label: "ESP8266: Microcontroller that controls the traffic light sequence" },
    { id: "traffic_module", position: "0.290807 m 5.45795 m 0.957263 m", label: "Traffic Light Module: LED-based traffic signal unit that displays red, yellow, and green states controlled by the ESP8266." },
  ]
};

export default function CircuitDetail() {
  const { slug } = useParams<{ slug: string }>();

  const circuit = circuits.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!circuit) {
    return (
      <section className="pt-16 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-light mb-6 display-font text-ink">Circuit not found</h1>
          <p className="text-body text-lg mb-8">
            The QR code may be incorrect, or this circuit has not been added
            yet.
          </p>
          <Link
            to="/"
            className="text-ink hover:opacity-70 underline underline-offset-4"
          >
            Go back to all circuits
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="pt-8 pb-24 animate-fadeIn">
      {/* --- Top Constrained Section --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <header className="space-y-6 pb-8 flex flex-col items-center text-center mx-auto max-w-4xl">
          <p className="text-[12px] uppercase tracking-[0.96px] font-semibold text-ink">
            {circuit.category}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-light leading-[1.05] tracking-tight-display display-font text-ink">
            {circuit.name}
          </h1>

          <p className="text-body text-lg max-w-3xl leading-relaxed">
            {circuit.description}
          </p>
        </header>

        {/* 3D Viewer */}
        {circuit.model3D && (
          <section className="relative space-y-6">
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light display-font text-ink">
              Virtual Circuit View
            </h2>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                Interactive 3D
              </span>
            </div>

            <div
              className="relative isolate rounded-xl overflow-hidden
                         bg-surface-card border border-hairline
                         shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              style={{ perspective: "1200px" }}
            >
              <div
                className="
                  relative z-10 bg-transparent
                  transition-transform duration-300 ease-out
                "
              >
                <ModelViewer3D
                  src={circuit.model3D}
                  alt={circuit.name}
                  hotspots={HOTSPOTS_MAP[circuit.slug]}
                />
              </div>
            </div>

            <p className="text-sm text-muted">
              Tip: Rotate and zoom to inspect the circuit. On supported phones,
              tap the AR button to view it in your environment.
            </p>
          </section>
        )}
      </div>

      {/* --- Bento Grid Section --- */}
      <CircuitBento circuit={circuit} />

      {/* --- Bottom Constrained Section (Safety) --- */}
      {circuit.safetyNotes && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <section
            className="
              space-y-6
              bg-surface-card
              border border-semantic-error/20
              rounded-xl
              p-8
            "
          >
            <h2 className="text-2xl font-light display-font text-ink">Safety Notes</h2>
            <ul className="list-disc list-inside text-body space-y-2">
              {circuit.safetyNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}