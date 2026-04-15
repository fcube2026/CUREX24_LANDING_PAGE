import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuestionRunner } from './components/QuestionRunner';
import { Success } from './components/Success';
import { ProgressBar } from './components/ProgressBar';
import { questions } from './data/questions';

const STORAGE_KEY = 'curex_onboarding_data_v2';
import logo from '../imports/icon-removebg-preview.png';
import { supabase } from '../lib/supabase';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {};
  });

  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Vite env vars (must start with VITE_)
  const url = import.meta.env.VITE_FUNCTION_URL as string;
  const secret = import.meta.env.VITE_FORM_SHARED_SECRET as string;

  const handleNext = async () => {
    // normal next
    if (currentIndex !== totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    // last question => submit
    setIsSubmitting(true);

    try {
      // Helper: ensure multi-select values are stored as Postgres TEXT[]
      const toArray = (val: unknown): string[] | null => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') return [val];
        return null;
      };

      // ✅ snake_case columns matching doctor_onboarding_questionnaire table
      const dbRow = {
        // Professional
        specialization: formData.specialization ?? null,
        qualification: formData.qualification ?? null,
        experience: formData.experience ?? null,
        hospital: formData.hospital ?? null,
        bio: formData.bio ?? null,
        // Services
        home_visits: formData.homeVisits ?? null,
        services: toArray(formData.services),
        patient_groups: toArray(formData.patientGroups),
        medical_equipment: toArray(formData.medicalEquipment),
        emergency_cases: formData.emergencyCases ?? null,
        // Availability
        working_schedule: formData.workingSchedule ?? null,
        time_slots: toArray(formData.timeSlots),
        travel_distance: formData.travelDistance ?? null,
        payment_preference: formData.paymentPreference ?? null,
        // Platform
        app_comfort: formData.appComfort ?? null,
        online_consultations: formData.onlineConsultations ?? null,
        platform_expectations: toArray(formData.platformExpectations),
        guidelines_agreement: formData.guidelinesAgreement ?? null,
      };

      // 🚀 Submitting directly to Supabase table
      const { error } = await supabase
        .from('doctor_onboarding_questionnaire')
        .insert([dbRow]);

      if (error) throw error;

      /* 
      // Legacy Edge Function submission logic
      if (!url) throw new Error('Missing VITE_FUNCTION_URL');
      if (!secret) throw new Error('Missing VITE_FORM_SHARED_SECRET');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-form-secret': secret,
        },
        body: JSON.stringify(dbRow),
      });

      const text = await response.text();
      if (!response.ok) throw new Error(text || 'Submission failed');
      */
    } catch (error: any) {
      console.error('Error submitting form:', error);
      // Helpful debugging: show specific Supabase error details if available
      alert(`Submission error: ${error.message || 'Unknown error'}`);
    } finally {
      setIsComplete(true);
      setIsSubmitting(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleBackToHome = () => {
    setCurrentIndex(0);
    setFormData({});
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateAnswer = (value: any) => {
    setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  if (isComplete) {
    return <Success onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <div className="mb-10 px-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-primary/60">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-bold text-muted-foreground mr-1">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>

          <ProgressBar currentStep={currentIndex + 1} totalSteps={totalQuestions} />
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl shadow-primary/5 p-8 sm:p-12 relative overflow-hidden"
          layout
        >
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Curex24" className="h-28 w-auto drop-shadow-sm" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <QuestionRunner
                question={currentQuestion}
                value={formData[currentQuestion.id]}
                onChange={updateAnswer}
                onNext={handleNext}
                onBack={handleBack}
                showBack={currentIndex > 0}
              />
            </motion.div>
          </AnimatePresence>

          {isSubmitting && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-bold text-primary animate-pulse">
                  Syncing with Supabase...
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}