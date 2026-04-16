import { motion } from 'motion/react';
import { ArrowRight, Stethoscope, Clock, ShieldCheck, BookOpen } from 'lucide-react';
import logo from '../../imports/icon-removebg-preview.png';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-8">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <motion.div
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl shadow-primary/5 p-8 sm:p-12 text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <img src={logo} alt="Curex24" className="h-20 w-auto drop-shadow-sm" />
        </motion.div>

        {/* Title block */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full">
            <Stethoscope className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
              Doctor Onboarding
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
            Doctor Onboarding Form
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Help us understand your professional background and preferences so
            we can match you with the right patients and opportunities on{' '}
            <span className="text-primary font-semibold">Curex24</span>.
          </p>
        </motion.div>

        {/* What to expect */}
        <motion.div
          className="text-left bg-secondary/40 rounded-2xl p-5 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
            What to expect
          </p>
          <ul className="space-y-2.5">
            {[
              { icon: Clock, text: '15 quick questions · ~3 minutes' },
              { icon: BookOpen, text: 'Professional background & availability' },
              { icon: ShieldCheck, text: 'Your answers are saved as you go' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-foreground">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="group w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-black rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
        >
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
