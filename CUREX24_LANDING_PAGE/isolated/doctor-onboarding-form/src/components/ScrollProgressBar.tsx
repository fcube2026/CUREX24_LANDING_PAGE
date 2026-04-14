import { motion, useScroll } from "framer-motion";

const ScrollProgressBar = () => {

  const { scrollYProgress } = useScroll();

  return (

    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-green-400 origin-left"

      style={{
        scaleX: scrollYProgress
      }}
    />

  );

};

export default ScrollProgressBar;