import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfessionalDetails } from './components/ProfessionalDetails';
import { ServicesCapabilities } from './components/ServicesCapabilities';
import { Availability } from './components/Availability';
import { PlatformVerification } from './components/PlatformVerification';
import { Success } from './components/Success';
import { ProgressBar } from './components/ProgressBar';
import { ChevronLeft } from 'lucide-react';

const STORAGE_KEY = 'curex_onboarding_data';
const STEP_KEY = 'curex_onboarding_step';

export default function App() {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem(STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {};
  });
  
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(STEP_KEY, currentStep.toString());
  }, [currentStep]);

  const handleNext = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep === totalSteps) {
      setIsComplete(true);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToHome = () => {
    setCurrentStep(1);
    setFormData({});
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  };

  if (isComplete) {
    return <Success onBackToHome={handleBackToHome} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProfessionalDetails onNext={handleNext} data={formData} />;
      case 2:
        return <ServicesCapabilities onNext={handleNext} data={formData} />;
      case 3:
        return <Availability onNext={handleNext} data={formData} />;
      case 4:
        return <PlatformVerification onNext={handleNext} data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-12">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <motion.div
          className="bg-white rounded-[2rem] shadow-xl shadow-primary/5 p-6 sm:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/2 rounded-full -ml-16 -mb-16 blur-3xl" />

          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="absolute top-8 left-6 sm:left-10 text-muted-foreground hover:text-primary hover:bg-primary/5 p-2 rounded-full transition-all"
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}