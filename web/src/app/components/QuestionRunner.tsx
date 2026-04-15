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
      <div className={`grid gap-2 ${question.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((opt, idx) => {
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          const optValue = typeof opt === 'string' ? opt : opt.value;
          const optIcon = typeof opt === 'object' ? opt.icon : null;
          const optDesc = typeof opt === 'object' ? opt.desc : null;
          const isSelected = isMulti ? (value || []).includes(optValue) : value === optValue;

          return (
            <motion.button
              key={optValue}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(optValue)}
              className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${isSelected
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                  : 'border-secondary/20 bg-white hover:border-primary/40 text-foreground'
                }`}
            >
              <div className="flex items-center gap-3">
                {optIcon && <span className="text-lg">{optIcon}</span>}
                <div>
                  <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-foreground'}`}>{optLabel}</p>
                  {optDesc && <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>{optDesc}</p>}
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-white flex-shrink-0" />}
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3 py-1">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="p-1.5 -ml-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-full tracking-wider uppercase">
            {question.category}
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
          {question.label}
        </h2>
      </div>

      <div>
        {question.type === 'select' || question.type === 'binary' || question.type === 'multi-select' ? (
          renderOptions()
        ) : question.type === 'textarea' ? (
          <textarea
            autoFocus
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 rounded-2xl bg-secondary/10 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:outline-none text-base min-h-[100px] transition-all resize-none"
            placeholder={question.placeholder}
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 rounded-2xl bg-secondary/10 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:outline-none text-base transition-all"
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
          className="group flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full justify-center"
        >
          Continue
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </div>
  );
}
