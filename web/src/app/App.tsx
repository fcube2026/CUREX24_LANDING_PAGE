import { useState, useEffect, useRef } from 'react';
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

  // Use refs to avoid stale closures in handleNext (especially for auto-advancing last question)
  const formDataRef = useRef(formData);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    formDataRef.current = formData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Vite env vars (must start with VITE_)
  const url = import.meta.env.VITE_FUNCTION_URL as string;
  const secret = import.meta.env.VITE_FORM_SHARED_SECRET as string;
  const handleNext = async () => {
    const activeIndex = currentIndexRef.current;
    
    // normal next
    if (activeIndex !== totalQuestions - 1) {
      setCurrentIndex(activeIndex + 1);
      return;
    }

    // last question => submit
    setIsSubmitting(true);
    const data = formDataRef.current;

    try {
      // Guard: detect placeholder/missing Supabase credentials (set at build time by Vite)
      const configuredUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const configuredKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
      if (
        !configuredUrl ||
        configuredUrl === 'https://placeholder.supabase.co' ||
        configuredUrl.includes('your-project-id')
      ) {
        throw new Error(
          'Supabase URL is not configured. Set VITE_SUPABASE_URL in Vercel environment variables and redeploy.'
        );
      }
      if (!configuredKey || configuredKey === 'placeholder-anon-key' || configuredKey.includes('your-anon')) {
        throw new Error(
          'Supabase Anon Key is not configured. Set VITE_SUPABASE_ANON_KEY in Vercel environment variables and redeploy.'
        );
      }

      // Helper: ensure multi-select values are stored as Postgres TEXT[]
      const toArray = (val: unknown): string[] | null => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') return [val];
        return null;
      };

      // ✅ snake_case columns matching doctor_onboarding_questionnaire table
      const dbRow = {
        // Professional
        specialization: data.specialization ?? null,
        qualification: data.qualification ?? null,
        experience: data.experience ?? null,
        hospital: data.hospital ?? null,
        bio: data.bio ?? null,
        // Services
        home_visits: data.homeVisits ?? null,
        services: toArray(data.services),
        patient_groups: toArray(data.patientGroups),
        medical_equipment: toArray(data.medicalEquipment),
        emergency_cases: data.emergencyCases ?? null,
        // Availability
        working_schedule: data.workingSchedule ?? null,
        time_slots: toArray(data.timeSlots),
        travel_distance: data.travelDistance ?? null,
        payment_preference: data.paymentPreference ?? null,
        // Platform
        app_comfort: data.appComfort ?? null,
        online_consultations: data.onlineConsultations ?? null,
        platform_expectations: toArray(data.platformExpectations),
        guidelines_agreement: data.guidelinesAgreement ?? null,
      };

      // 🚀 Submitting directly to Supabase table
      const { error } = await supabase
        .from('doctor_onboarding_questionnaire')
        .insert([dbRow]);

      if (error) throw error;
      setIsComplete(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      console.error('Error submitting form:', error);

      // "Failed to fetch" means the network request never reached Supabase.
      // Show the partial URL and common causes.
      const configuredUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const projectHint = configuredUrl
        ? `(URL: ${configuredUrl.replace(/^https?:\/\//, '').split('.')[0]}…)`
        : '(URL not set)';

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert(
          `Network error – could not reach Supabase ${projectHint}.\n\n` +
          `Possible causes:\n` +
          `1. Supabase project is PAUSED – go to app.supabase.com, open your project, and click "Restore".\n` +
          `2. Wrong URL in Vercel – verify VITE_SUPABASE_URL is exactly https://<id>.supabase.co (no trailing slash).\n` +
          `3. Env var set for wrong environment – in Vercel, make sure the variables are enabled for Production, Preview, and Development.`
        );
      } else {
        alert(`Submission error: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsSubmitting(false);
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-start pt-3 pb-4 px-3 sm:px-6">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="mb-2 px-1">
          <ProgressBar currentStep={currentIndex + 1} totalSteps={totalQuestions} />
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl shadow-primary/5 p-4 sm:p-6 relative overflow-hidden"
          layout
        >
          <div className="flex flex-col items-center mb-3">
            <img src={logo} alt="Curex24" className="h-14 w-auto drop-shadow-sm" />
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
