import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-80 sm:h-96 bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-95"
        />
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md text-slate-800 dark:text-white cursor-pointer"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md text-slate-800 dark:text-white cursor-pointer"
      >
        <FiChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-red-500" : "w-2 bg-slate-300 dark:bg-slate-700"}`}
          />
        ))}
      </div>
    </div>
  );
}
