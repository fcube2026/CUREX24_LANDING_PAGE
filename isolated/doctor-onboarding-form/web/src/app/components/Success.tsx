import { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from '../../imports/icon-removebg-preview.png';

interface SuccessProps {
  onBackToHome: () => void;
}

export function Success({ onBackToHome }: SuccessProps) {
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl shadow-primary/10 p-8 sm:p-12 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

        <div className="relative z-10 text-center space-y-8">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Curex24 Logo"
              className="h-24 w-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ShieldCheck className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Application Submitted!</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Welcome to the Curex24 family. Our verification team is now reviewing your professional credentials.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
          >
            <div className="bg-secondary/20 rounded-2xl p-6 text-left border border-transparent hover:border-primary/10 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Review Phase</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">This usually takes 24-48 hours depending on volume.</p>
            </div>

            <div className="bg-secondary/20 rounded-2xl p-6 text-left border border-transparent hover:border-primary/10 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Stay Updated</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">Check your inbox for a confirmation email and next steps.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-6"
          >
            <button
              onClick={onBackToHome}
              className="group w-full max-w-sm py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              Back to Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-6 text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> Secure Verification Powered by Curex24
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
