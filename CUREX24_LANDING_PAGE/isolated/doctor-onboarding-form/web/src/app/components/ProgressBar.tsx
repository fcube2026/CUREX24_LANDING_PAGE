interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-end px-1">
        <div className="space-y-1">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Step {currentStep} of {totalSteps}</p>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">
            {currentStep === 1 && "Professional Profile"}
            {currentStep === 2 && "Services & Expertise"}
            {currentStep === 3 && "Working Availability"}
            {currentStep === 4 && "Verification"}
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          {Math.round(progress)}% Complete
        </div>
      </div>
      
      <div className="h-3 w-full bg-secondary/40 rounded-full overflow-hidden border border-primary/5 p-0.5">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-sm transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between px-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              i + 1 <= currentStep 
                ? 'bg-primary scale-110 shadow-sm shadow-primary/20' 
                : 'bg-secondary border border-primary/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
