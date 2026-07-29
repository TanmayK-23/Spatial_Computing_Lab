import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { circuits } from "../data/circuits";
import CardSwap, { Card } from "../components/CardSwap";
import LineSidebar from "../components/LineSidebar";

export default function CircuitsList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="pt-8">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <h1 className="text-4xl md:text-[56px] font-light tracking-tight-display display-font text-ink mb-16 text-center relative z-30">
          Lab Experiments
        </h1>

        {/* Mobile View: Standard Stacked Cards */}
        <div className="md:hidden flex flex-col gap-6 pb-20">
          {circuits.map((circuit) => (
            <Link 
              key={circuit.slug} 
              to={`/circuit/${circuit.slug}`}
              className="flex flex-col bg-surface-card rounded-[2rem] border border-hairline shadow-sm overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className="h-56 bg-surface-strong flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={circuit.thumbnail}
                  alt={circuit.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div>
                  <h2 className="text-2xl font-medium text-ink tracking-tight">{circuit.name}</h2>
                  <span className="inline-block mt-2 text-[10px] font-semibold tracking-[0.96px] uppercase px-3 py-1.5 rounded-full text-ink bg-surface-strong">
                    {circuit.category}
                  </span>
                </div>
                <p className="text-body text-sm line-clamp-3">
                  {circuit.description}
                </p>
                <div className="mt-2 text-sm font-semibold text-ink inline-flex items-center gap-1">
                  View interactive 3D <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop View: Interactive Split */}
        <div className="hidden md:flex flex-row w-full relative">
          
          {/* Left Side: LineSidebar */}
          <div className="w-1/2 relative z-20">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center pl-12 pb-48">
              <LineSidebar 
                className="w-full"
                items={circuits.map(c => c.name)}
                defaultActive={activeIndex}
                onItemClick={(index: number) => setActiveIndex(index)}
                accentColor="#000000"
                textColor="#a3a3a3"
                markerColor="#e5e5e5"
                showIndex={true}
                showMarker={true}
                proximityRadius={200}
                maxShift={30}
                itemGap={20}
                fontSize={1.25}
              />
            </div>
          </div>

          {/* Right Side: CardSwap */}
          <div className="w-full md:w-1/2 relative z-10 flex items-center justify-center min-h-[600px]">
            <div className="relative w-full max-w-lg h-[500px]">
              <CardSwap 
                controlledIndex={activeIndex}
                cardDistance={50}
                verticalDistance={60}
                width="100%"
                height="100%"
              >
                {circuits.map((circuit, idx) => (
                  <Card key={circuit.slug} className="group cursor-pointer">
                    <div 
                      onClick={() => {
                        if (activeIndex === idx) {
                          navigate(`/circuit/${circuit.slug}`);
                        } else {
                          setActiveIndex(idx);
                        }
                      }} 
                      className="h-full w-full flex flex-col relative overflow-hidden bg-surface-card hover:border-hairline-strong transition-colors duration-300"
                    >
                      <div className="h-48 bg-surface-strong flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={circuit.thumbnail}
                          alt={circuit.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-xl font-medium mb-3 text-ink tracking-tight">{circuit.name}</h2>
                          <span
                            className="
                              inline-block mb-3
                              text-[10px] font-semibold tracking-[0.96px] uppercase
                              px-2 py-1 rounded-full
                              text-ink bg-surface-strong
                            "
                          >
                            {circuit.category}
                          </span>
                          <p className="text-body text-sm line-clamp-3">
                            {circuit.description}
                          </p>
                        </div>
                        
                        <Link 
                          to={`/circuit/${circuit.slug}`} 
                          className="mt-4 text-sm font-semibold text-ink opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 hover:gap-2 duration-300"
                        >
                          View in interactive 3D <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
