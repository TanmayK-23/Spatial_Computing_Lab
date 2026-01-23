export default function Home() {
  return (
    <section className="text-white py-20 animate-fadeIn">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Explore Raspberry Pi Circuits in Interactive 3D
        </h1>

        <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
          Scan the QR codes placed around the lab to view each circuit in a
          virtual environment. Rotate, zoom, and explore every component
          in stunning detail.
        </p>

        <div className="flex justify-center">
          <a
            href="/circuits"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          >
            Browse All Circuits
          </a>
        </div>
      </div>
    </section>
  );
}