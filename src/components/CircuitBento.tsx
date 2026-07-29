import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Code, ListChecks, Component, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";
import FlowingMenu from "./FlowingMenu";
import Stepper, { Step } from "./Stepper";
import type { QuizQuestion } from "../data/circuits";

// Generic Bento Wrapper based on Kokonut UI
const BentoCardWrapper = ({
  children,
  className,
  title,
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  icon?: React.ElementType;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={cn("h-full", className)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -5 }}
    >
      <div
        className={cn(
          "group relative flex h-full flex-col gap-4 rounded-[2rem] border border-black bg-[#F9F9FB] p-8 shadow-sm transition-all duration-300 ease-out hover:shadow-md",
          className
        )}
      >
        <div
          className="relative z-10 flex h-full flex-col gap-3"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Icon && <Icon className="h-6 w-6 text-neutral-500" />}
              <h3 className="font-semibold text-neutral-900 text-2xl tracking-tight">
                {title}
              </h3>
            </div>
            <div className="text-neutral-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
          <div className="flex-1 relative flex flex-col min-h-0 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Specific Cards
const ComponentsCard = ({ components, slug }: { components: any[]; slug: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white shadow-sm">
      <FlowingMenu
        items={components.map((comp, idx) => ({
          text: `${comp.quantity}x ${comp.name}`,
          image: comp.image || `https://picsum.photos/600/400?random=${idx + slug.length}`,
        }))}
        bgColor="#ffffff"
        textColor="#000000"
        marqueeBgColor="#000000"
        marqueeTextColor="#ffffff"
        borderColor="rgba(0,0,0,0.05)"
      />
    </div>
  );
};

const WiringCard = ({ steps }: { steps: string[] }) => {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <Stepper
        initialStep={1}
        backButtonText="Previous"
        nextButtonText="Next"
        stepCircleContainerClassName="shadow-none border-0"
      >
        {steps.map((step, idx) => (
          <Step key={idx}>
            <div className="text-left w-full h-full py-2">
              <h4 className="text-lg font-semibold mb-2 text-neutral-900">Step {idx + 1}</h4>
              <p className="text-base leading-relaxed text-neutral-600">{step}</p>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

const CodeCard = ({ code }: { code: string }) => {
  return (
    <div className="h-full overflow-y-auto rounded-2xl p-6 font-mono text-sm bg-white text-neutral-800 shadow-sm custom-scrollbar">
      <pre className="whitespace-pre-wrap">{code}</pre>
    </div>
  );
};

const QuizCard = ({ quiz }: { quiz: QuizQuestion[] }) => {
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!quiz || quiz.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400 text-sm italic">
        No quiz available for this circuit.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-8 pb-4">
      {quiz.map((q, idx) => (
        <div key={idx} className="space-y-3">
          <p className="font-semibold text-base text-neutral-900">
            Q{idx + 1}. {q.question}
          </p>
          <ul className="list-disc list-outside ml-5 text-sm space-y-2 mb-4 text-neutral-600">
            {q.options.map((opt, i) => (
              <li key={i} className="pl-1">
                {opt}
              </li>
            ))}
          </ul>
          {!visibleAnswers[idx] ? (
            <button
              onClick={() => toggleAnswer(idx)}
              className="text-sm font-medium hover:text-neutral-900 text-neutral-500 underline underline-offset-4 transition-colors"
            >
              Show Answer
            </button>
          ) : (
            <p className="text-sm font-medium inline-block px-4 py-2 rounded-xl text-neutral-900 bg-neutral-100">
              Answer: {q.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Grid Layout
export default function CircuitBento({ circuit }: { circuit: any }) {
  return (
    <section className="relative overflow-hidden w-full py-16 sm:py-24 animate-fadeIn">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-12 auto-rows-[20px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {/* Card 1: Components (Wide) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-8 row-span-8"
            title="Components Used"
            icon={Component}
          >
            <ComponentsCard components={circuit.components} slug={circuit.slug} />
          </BentoCardWrapper>

          {/* Card 2: Code Snippet (Tall) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-4 row-span-10"
            title={circuit.category === "Embedded Systems" ? "Microcontroller Code" : "Code Snippet"}
            icon={Code}
          >
            <CodeCard code={circuit.codeSnippet} />
          </BentoCardWrapper>

          {/* Card 3: Wiring Steps (Wide & Tall) */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-8 row-span-10"
            title="Wiring Steps"
            icon={ListChecks}
          >
            <WiringCard steps={circuit.wiringSteps} />
          </BentoCardWrapper>

          {/* Card 4: Quick Check */}
          <BentoCardWrapper
            className="col-span-1 md:col-span-4 row-span-8"
            title="Quick Check"
            icon={HelpCircle}
          >
            <QuizCard quiz={circuit.quiz} />
          </BentoCardWrapper>
        </motion.div>
      </div>
    </section>
  );
}
