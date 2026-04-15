interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center px-0.5">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Step {currentStep} of {totalSteps}</p>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          {Math.round(progress)}% Done
        </div>
      </div>

      <div className="h-1.5 w-full bg-secondary/40 rounded-full overflow-hidden border border-primary/5">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-sm transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between px-0.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i + 1 <= currentStep
                ? 'bg-primary shadow-sm shadow-primary/20'
                : 'bg-secondary border border-primary/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
