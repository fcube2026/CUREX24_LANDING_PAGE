import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from '../../imports/icon-removebg-preview.png';

const REDIRECT_DELAY = 8; // seconds before auto-redirect

interface SuccessProps {
  onBackToHome: () => void;
}

export function Success({ onBackToHome }: SuccessProps) {
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      onBackToHome();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onBackToHome]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl shadow-primary/10 p-12 text-center space-y-10 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <img src={logo} alt="Curex24" className="h-28 w-auto mb-2 drop-shadow-sm" />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-foreground tracking-tight italic">
            FORM SUBMITTED
          </h1>
          <p className="text-muted-foreground font-medium">Thank you for your response!</p>
          <p className="text-xs text-muted-foreground">
            Redirecting in{' '}
            <span className="font-bold text-primary">{countdown}s</span>…
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="group w-full py-5 bg-gradient-to-r from-primary to-accent text-white font-black rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
        >
          Back to Main
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
