export default function About() {
  return (
    <section className="text-white py-24 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Page Header */}
        <header className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            About the <span className="text-brand-gradient">Developers</span>
          </h1>
          <p className="text-slate-400 max-w-3xl">
            This project is developed as part of the Spatial Computing Lab to
            provide an interactive and immersive way to explore electronics
            experiments using 3D and AR technologies.
          </p>
        </header>

        {/* Developers */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Developer Card */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Tanmay Kumar</h2>
            <p className="text-sm text-blue-400 mt-1">3D & AR Integration</p>
            <p className="text-slate-400 text-sm mt-4">
            Responsible for 3D model integration, AR visualization, and
            interactive component hotspots with UI/UX design.
            </p>
          </div>

          {/* Developer Card */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Anshul Pagar</h2>
            <p className="text-sm text-blue-400 mt-1">ArUco Visualisation</p>
            <p className="text-slate-400 text-sm mt-4">
            Implemented ArUco marker detection to track physical markers and accurately place virtual objects in the real world, enabling reliable marker-based AR interactions in the lab.
            </p>
          </div>

          {/* Developer Card */}
          <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <h2 className="text-xl font-semibold">Kushagra Srivatsava</h2>
            <p className="text-sm text-blue-400 mt-1">Backend / Content</p>
            <p className="text-slate-400 text-sm mt-4">
              Managed circuit data, quiz content, and experiment structure
              to ensure accurate learning outcomes.
            </p>
          </div>

        </section>

      </div>
    </section>
  );
}