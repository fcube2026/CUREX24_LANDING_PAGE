import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "/app-preview.png",
  "/doctor.png",
  "/logo.png"
];

const AppPreviewCarousel = () => {

  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  /* Auto Slide */

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) =>
        (prev + 1) % images.length
      );

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
    touchStartX.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "ArrowRight") goNext();
  };

  return (

    <section className="py-24">

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">

        {/* Heading */}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >
          Experience Curex24 in Action
        </motion.h2>

        {/* Phone Frame */}

        <div className="flex justify-center mt-16">

          <div
            className="relative w-[260px] h-[520px] rounded-[40px] border-[10px] border-gray-800 shadow-2xl overflow-hidden bg-black select-none touch-pan-y cursor-grab active:cursor-grabbing"
            role="group"
            aria-label="App preview carousel"
            tabIndex={0}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onKeyDown={onKeyDown}
          >

            <motion.img
              key={index}

              src={images[index]}

              alt="App Preview"

              className="w-full h-full object-cover pointer-events-none"

              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}

              transition={{ duration: 0.5 }}
            />

          </div>

        </div>

        {/* Dot indicators */}

        <div role="tablist" className="flex justify-center gap-2 mt-6" aria-label="Slide indicators">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-emerald-500 w-6"
                  : "bg-emerald-200 w-2.5"
              }`}
            />
          ))}
        </div>

      </div>

    </section>

  );

};

export default AppPreviewCarousel;