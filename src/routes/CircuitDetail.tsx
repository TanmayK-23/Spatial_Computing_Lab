import React from "react";
import { useParams, Link } from "react-router-dom";
import { circuits } from "../data/circuits";
import ModelViewer3D from "../components/ModelViewer3D";

export default function CircuitDetail() {
  const { slug } = useParams<{ slug: string }>();

  const circuit = circuits.find((c) => c.slug === slug);

  if (!circuit) {
    return (
      <section className="text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">Circuit not found</h1>
          <p className="text-slate-300 mb-6">
            The QR code may be incorrect, or this circuit has not been added
            yet.
          </p>
          <Link
            to="/circuits"
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
      <div className="max-w-5xl mx-auto px-6 space-y-10
        bg-slate-900/60 backdrop-blur-lg
        border border-slate-800
        rounded-2xl
        shadow-2xl shadow-black/40
      ">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {circuit.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">
            {circuit.name}
          </h1>
          <p className="text-slate-300 max-w-3xl">
            {circuit.description}
          </p>
        </header>

        {/* 3D Viewer */}
        {circuit.model3D && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Virtual Circuit View</h2>
            <div
              className="relative isolate"
              style={{ perspective: "1200px" }}
            >
              <div className="absolute z-20 -top-3 -left-3 text-xs bg-blue-600 text-white px-2 py-1 rounded shadow">
                Interactive 3D
              </div>
              <div
                className="
                  relative z-10
                  transition-transform duration-300 ease-out
                  hover:scale-[1.02]
                "
              >
                <ModelViewer3D src={circuit.model3D} alt={circuit.name} />
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Tip: Rotate and zoom to inspect the circuit. On supported phones,
              tap the AR button to view it in your environment.
            </p>
          </section>
        )}

        {/* Components Used — Full Width */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Components Used</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {circuit.components.map((comp, idx) => (
              <div
                key={idx}
                className="
                  bg-slate-800/70 border border-slate-700 rounded-xl
                  px-4 py-3
                  transition hover:border-emerald-400 hover:bg-slate-800
                "
              >
                <p className="font-medium">{comp.name}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Type: {comp.type} • Quantity: {comp.quantity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Wiring Steps — Below Components */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Wiring Steps</h2>

          <ol className="list-decimal list-inside space-y-2 text-slate-200 max-w-3xl">
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
          <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{circuit.codeSnippet}</code>
          </pre>
        </section>

        {/* Safety Notes */}
        {circuit.safetyNotes && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Safety Notes</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {circuit.safetyNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </section>
        )}

        {circuit.quiz && circuit.quiz.length > 0 && (
          <QuizSection quiz={circuit.quiz} />
        )}

        {/* Back link */}
        <section>
          <Link
            to="/circuits"
            className="inline-block text-sm text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to all circuits
          </Link>
        </section>
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
          <div
            key={idx}
            className="bg-slate-800/70 border border-slate-700 rounded-xl p-4"
          >
            <p className="font-medium mb-3">
              Q{idx + 1}. {q.question}
            </p>

            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1 mb-3">
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