import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { circuits } from "../data/circuits";
import ModelViewer3D from "../components/ModelViewer3D";

export default function CircuitDetail() {
  const { slug } = useParams<{ slug: string }>();

  const circuit = circuits.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!circuit) {
    return (
      <section className="text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">Circuit not found</h1>
          <p className="text-slate-400 mb-6">
            The QR code may be incorrect, or this circuit has not been added
            yet.
          </p>
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Go back to all circuits
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="text-white py-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Header */}
        <header className="space-y-4 pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
            {circuit.category}
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {circuit.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-brand-gradient">
              {circuit.name.split(" ").slice(-1)}
            </span>
          </h1>

          <p className="text-slate-400 max-w-3xl leading-relaxed">
            {circuit.description}
          </p>
        </header>

        {/* 3D Viewer */}
        {circuit.model3D && (
          <section className="relative space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Virtual <span className="text-brand-gradient">Circuit</span> View
            </h2>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                Interactive 3D
              </span>
            </div>

            <div
              className="relative isolate rounded-xl overflow-hidden
                         border border-slate-700/60
                         shadow-lg shadow-black/40"
              style={{ perspective: "1200px" }}
            >
              <div
                className="
                  relative z-10
                  transition-transform duration-300 ease-out
                  hover:scale-[1.02]
                "
              >
                <ModelViewer3D
                  src={circuit.model3D}
                  alt={circuit.name}
                  hotspots={
                    circuit.slug === "voltage-divider"
                      ? [
                          {
                            id: "r1",
                            position: "-0.086197 m 0.005886 m 0.060606 m",
                            label: "Resistor R1: drops a portion of the input voltage",
                          },
                          {
                            id: "r2",
                            position: "-0.024149 m 0.004683 m 0.065716 m",
                            label: "Resistor R2: works with R1 to divide voltage",
                          },
                          {
                            id: "breadboard",
                            position: "-0.4 m 0 m 0 m",
                            label: "Breadboard: Used to mount and interconnect components without soldering",
                          },
                          {
                            id: "battery",
                            position: "-0.00743 m 0.474856 m 0.006252 m",
                            label: "Power Source: Provides the input voltage for the circuit",
                          },
                          {
                            id: "voltmeter",
                            position: "0.642552 m -0.010025 m 0.058602 m",
                            label: "Voltmeter: Measures voltage across the resistor",
                          },
                        ]
                      : circuit.slug === "ohms-law"
                      ? [
                          {
                            id: "resistor",
                            position: "-0.024149 m 0.004683 m 0.065716 m",
                            label: "Resistor: Opposes current flow and follows Ohm’s Law (V = IR)",
                          },
                          {
                            id: "battery",
                            position: "0.028191 m 0.741747 m -0.004996 m",
                            label: "Power Source: Supplies voltage to the circuit",
                          },
                          {
                            id: "ammeter",
                            position: "-0.08999 m 0.332197 m 0.053165 m",
                            label: "Ammeter: Measures the current flowing through the circuit",
                          },
                          {
                            id: "voltmeter",
                            position: "0.654095 m -0.009545 m 0.014828 m",
                            label: "Voltmeter: Measures the voltage across the resistor",
                          },
                          {
                            id: "breadboard",
                            position: "-0.4 m 0.0 m 0.0 m",
                            label: "Breadboard: Platform used to assemble the circuit without soldering",
                          },
                        ]
                      : circuit.slug === "led-current-limiting"
                      ? [
                          {
                            id: "led",
                            position: "-0.091765 m -0.021906 m 0.118719 m",
                            label: "LED: Emits light when forward biased; polarity must be correct",
                          },
                          {
                            id: "resistor",
                            position: "-0.024834 m 0.006402 m 0.056125 m",
                            label: "Resistor: Limits current to protect the LED from damage",
                          },
                          {
                            id: "battery",
                            position: "0.007182 m 0.474856 m -0.006535 m",
                            label: "Power Source: Supplies voltage to drive the LED circuit",
                          },
                          {
                            id: "breadboard",
                            position: "-0.4 m 0 m 0 m",
                            label: "Breadboard: Used to mount and connect components without soldering",
                          },
                        ]
                        : circuit.slug === "transistor-switching"
                        ? [
                            {
                              id: "transistor",
                              position: "-0.155982 m 0.001841 m 0.125161 m",
                              label: "Transistor (BJT): Acts as an electronic switch controlled by base current",
                            },
                            {
                              id: "base-resistor",
                              position: "-0.198496 m 0.018957 m 0.056988 m",
                              label: "Base Resistor: Limits base current to protect the transistor",
                            },
                            {
                              id: "load",
                              position: "-0.09258 m -0.001906 m 0.056316 m",
                              label: "Load: Turns ON or OFF depending on the transistor state",
                            },
                            {
                              id: "battery",
                              position: "0.007182 m 0.474856 m -0.006535 m",
                              label: "Power Source: Supplies voltage to drive the circuit",
                            },
                            {
                              id: "breadboard",
                              position: "-0.4 m 0 m 0 m",
                              label: "Breadboard: Platform used to assemble the circuit without soldering",
                            },
                          ]
                          : circuit.slug === "series-resistors"
                          ? [
                              {
                                id: "r1",
                                position: "-0.024834 m 0.006402 m 0.056125 m",
                                label: "Resistor R1: First resistor connected in series",
                              },
                              {
                                id: "r2",
                                position: "-0.087991 m 0.006622 m 0.05519 m",
                                label: "Resistor R2: Second resistor connected in series",
                              },
                              {
                                id: "battery",
                                position: "0.007182 m 0.474856 m -0.006535 m",
                                label: "Power Source: Supplies voltage to the series circuit",
                              },
                              {
                                id: "breadboard",
                                position: "-0.4 m 0 m 0 m",
                                label: "Breadboard: Used to mount and interconnect components",
                              },
                            ]
                            : circuit.slug === "parallel-resistors"
                            ? [
                                {
                                  id: "r1",
                                  position: "-0.024834 m 0.006402 m 0.056125 m",
                                  label: "Resistor R1: One branch of the parallel network",
                                },
                                {
                                  id: "r2",
                                  position: "-0.087991 m 0.006622 m 0.05519 m",
                                  label: "Resistor R2: Second branch of the parallel network",
                                },
                                {
                                  id: "battery",
                                  position: "0.007182 m 0.474856 m -0.006535 m",
                                  label: "Power Source: Supplies voltage across parallel branches",
                                },
                                {
                                  id: "breadboard",
                                  position: "-0.4 m 0 m 0 m",
                                  label: "Breadboard: Used to assemble the parallel circuit",
                                },
                              ]
                              : circuit.slug === "rc-circuit"
                              ? [
                                  {
                                    id: "resistor",
                                    position: "-0.024834 m 0.006402 m 0.056125 m",
                                    label: "Resistor: Controls the rate of charging and discharging",
                                  },
                                  {
                                    id: "capacitor",
                                    position: "-0.092411 m -0.020127 m 0.061048 m",
                                    label: "Capacitor: Stores and releases electrical energy",
                                  },
                                  {
                                    id: "battery",
                                    position: "0.007182 m 0.474856 m -0.006535 m",
                                    label: "Power Source: Provides voltage for charging the capacitor",
                                  },
                                  {
                                    id: "breadboard",
                                    position: "-0.4 m 0 m 0 m",
                                    label: "Breadboard: Platform used to assemble the RC circuit",
                                  },
                                ]
                                : circuit.slug === "traffic-light-esp8266"
                                ? [
                                    {
                                      id: "esp8266",
                                      position: "-0.496075 m -0.04519 m 0.379513 m",
                                      label: "ESP8266: Microcontroller that controls the traffic light sequence",
                                    },
                                    {
                                      id: "traffic_module",
                                      position: "0.290807 m 5.45795 m 0.957263 m",
                                      label: "Traffic Light Module: LED-based traffic signal unit that displays red, yellow, and green states controlled by the ESP8266.",
                                    },
                                  ]
                      : undefined
                  }
                />
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Tip: Rotate and zoom to inspect the circuit. On supported phones,
              tap the AR button to view it in your environment.
            </p>
          </section>
        )}

        {/* Components Used — Full Width */}
        <section
          className="
            space-y-4
           bg-slate-950/40
            border border-slate-800/40
            rounded-xl
            p-6
          "
        >
          <h2 className="text-xl font-semibold">Components Used</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {circuit.components.map((comp, idx) => (
              <div
                key={idx}
                className="
                  relative overflow-hidden
                  rounded-xl
                  px-4 py-3
                  border border-slate-700/60
                  bg-gradient-to-br from-blue-500/10 via-slate-800/60 to-purple-500/10
                  backdrop-blur-md
                  transition-all duration-300
                  hover:border-blue-400/70
                  hover:shadow-lg hover:shadow-blue-500/10
                  hover:-translate-y-[2px]
                "
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/5 to-purple-400/5 opacity-0 hover:opacity-100 transition" />
                <p className="font-medium relative z-10">{comp.name}</p>
                <p className="text-xs text-slate-400 mt-1 relative z-10">
                  Type: {comp.type} • Quantity: {comp.quantity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Wiring Steps — Below Components */}
        <section
          className="
            space-y-3
           bg-slate-950/40
            border border-slate-800/40
            rounded-xl
            p-6
          "
        >
          <h2 className="text-lg font-semibold tracking-tight text-slate-100">Wiring Steps</h2>

          <ol className="list-decimal list-inside space-y-2 text-slate-300 max-w-3xl">
            {circuit.wiringSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          <p className="text-xs text-slate-400 mt-3">
            This virtual representation mirrors the physical breadboard layout used in the lab.
          </p>
        </section>

        {/* Code Snippet */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Raspberry Pi Code</h2>
          <pre className="bg-slate-900/60 border border-slate-700/60 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{circuit.codeSnippet}</code>
          </pre>
        </section>

        {/* Safety Notes */}
        {circuit.safetyNotes && (
          <section
            className="
              space-y-3
             bg-slate-950/40
              border border-slate-800/40
              rounded-xl
              p-6
            "
          >
            <h2 className="text-xl font-semibold">Safety Notes</h2>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              {circuit.safetyNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {circuit.quiz && circuit.quiz.length > 0 && (
          <QuizSection quiz={circuit.quiz} />
        )}

      </div>
    </section>
  );
}

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

function QuizSection({ quiz }: { quiz: QuizQuestion[] }) {
  const [visibleAnswers, setVisibleAnswers] = React.useState<Record<number, boolean>>({});

  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Quick Check</h2>

      <div className="space-y-4">
        {quiz.map((q, idx) => (
          <div key={idx} className="space-y-2">
            <p className="font-medium mb-3">
              Q{idx + 1}. {q.question}
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 mb-3">
              {q.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>

            {!visibleAnswers[idx] ? (
              <button
                onClick={() => toggleAnswer(idx)}
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Show Answer
              </button>
            ) : (
              <p className="text-sm text-emerald-400">
                Answer: {q.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}