import { motion } from 'motion/react';
import { Check, ArrowRight, ChevronRight, Home, Stethoscope, Users, Briefcase, ChevronLeft } from 'lucide-react';
import { Question } from '../data/questions';

interface QuestionRunnerProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export function QuestionRunner({ question, value, onChange, onNext, onBack, showBack }: QuestionRunnerProps) {
  const isMulti = question.type === 'multi-select';

  const handleOptionClick = (optionValue: any) => {
    if (isMulti) {
      const current = Array.isArray(value) ? value : [];
      const newValue = current.includes(optionValue)
        ? current.filter((v: any) => v !== optionValue)
        : [...current, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      // Auto-advance for single-choice/binary if not empty
      if (question.type === 'select' || question.type === 'binary') {
        setTimeout(onNext, 400);
      }
    }
  };

  const renderOptions = () => {
    if (!question.options) return null;

    return (
      <div className={`grid gap-4 ${question.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((opt, idx) => {
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          const optValue = typeof opt === 'string' ? opt : opt.value;
          const optIcon = typeof opt === 'object' ? opt.icon : null;
          const optDesc = typeof opt === 'object' ? opt.desc : null;
          const isSelected = isMulti ? (value || []).includes(optValue) : value === optValue;

          return (
            <motion.button
              key={optValue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(optValue)}
              className={`p-6 rounded-3xl border-2 text-left transition-all flex items-center justify-between group ${isSelected
                  ? 'border-primary bg-primary text-white shadow-xl shadow-primary/20'
                  : 'border-secondary/20 bg-white hover:border-primary/40 text-foreground'
                }`}
            >
              <div className="flex items-center gap-4">
                {optIcon && <span className="text-2xl">{optIcon}</span>}
                <div>
                  <p className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-foreground'}`}>{optLabel}</p>
                  {optDesc && <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>{optDesc}</p>}
                </div>
              </div>
              {isSelected && <Check className="w-6 h-6 text-white" />}
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-10 py-4">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full tracking-wider uppercase">
            {question.category}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          {question.label}
        </h2>
      </div>

      <div className="min-h-[300px]">
        {question.type === 'select' || question.type === 'binary' || question.type === 'multi-select' ? (
          renderOptions()
        ) : question.type === 'textarea' ? (
          <textarea
            autoFocus
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-8 rounded-[2rem] bg-secondary/10 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:outline-none text-xl min-h-[200px] transition-all"
            placeholder={question.placeholder}
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-8 rounded-[2rem] bg-secondary/10 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:outline-none text-2xl transition-all"
            placeholder={question.placeholder}
          />
        )}
      </div>

      {(isMulti || question.type === 'text' || question.type === 'textarea') && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          disabled={!question.optional && (isMulti ? !value || value.length === 0 : !value || value.trim() === '')}
          onClick={onNext}
          className="group flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continue
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </div>
  );
}
