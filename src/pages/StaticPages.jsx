export function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center min-h-[70vh] flex flex-col justify-center">
      <h1 className="text-4xl font-black mb-6 uppercase tracking-tighter">
        Our Acoustic Manifesto
      </h1>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
        VOLT designs high-performance audio systems and wearable tech for
        everyday use. We combine deep acoustics engineering with long-lasting
        battery technology to provide clear sound and high durability at a smart
        price point.
      </p>
    </div>
  );
}

export function Contact() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 min-h-[70vh] flex flex-col justify-center">
      <h1 className="text-3xl font-black text-center mb-6 uppercase tracking-tight">
        Signal Intercept
      </h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 font-bold text-sm text-center">
        <p className="text-slate-500">
          📡 Headquarters:{" "}
          <span className="text-slate-800 dark:text-white">
            Salem, Tamil Nadu, India
          </span>
        </p>
        <p className="text-slate-500">
          📧 Operations Relay:{" "}
          <span className="text-slate-800 dark:text-white">
            operations@voltgear.in
          </span>
        </p>
      </div>
    </div>
  );
}
