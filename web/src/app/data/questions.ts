export interface Question {
  id: string;
  label: string;
  type: 'select' | 'multi-select' | 'text' | 'textarea' | 'binary';
  options?: string[] | { label: string; value: string; icon?: string; desc?: string }[];
  placeholder?: string;
  category: string;
  optional?: boolean;
}

export const questions: Question[] = [
  {
    id: 'experience',
    label: 'How many years of clinical experience do you have?',
    type: 'select',
    category: 'Professional',
    options: [
      { label: 'Less than 1 year', value: 'less-1' },
      { label: '1–3 years', value: '1-3' },
      { label: '3–5 years', value: '3-5' },
      { label: '5–10 years', value: '5-10' },
      { label: 'More than 10 years', value: '10+' },
    ],
  },
  {
    id: 'hospital',
    label: 'Which hospital or clinic are you currently associated with? (Optional)',
    type: 'text',
    category: 'Professional',
    placeholder: 'e.g. City General Hospital',
    optional: true,
  },
  // Category 2: Services
  {
    id: 'homeVisits',
    label: 'Are you available to provide Home Visits?',
    type: 'binary',
    category: 'Services',
    options: ['yes', 'no'],
  },
  {
    id: 'services',
    label: 'Which services would you like to offer during visits?',
    type: 'multi-select',
    category: 'Services',
    options: [
      'General consultation',
      'Minor injury treatment',
      'Prescription of medication',
      'Blood pressure / vitals check',
      'Wound care',
      'Physiotherapy',
      'Follow-up visits',
    ],
  },
  {
    id: 'patientGroups',
    label: 'Which patient groups do you primarily focus on?',
    type: 'multi-select',
    category: 'Services',
    options: [
      { label: 'Children', value: 'Children', icon: '👶' },
      { label: 'Adults', value: 'Adults', icon: '👨' },
      { label: 'Elderly patients', value: 'Elderly patients', icon: '🧓' },
      { label: 'Pregnant women', value: 'Pregnant women', icon: '🤰' },
    ],
  },
  {
    id: 'medicalEquipment',
    label: 'What medical equipment can you bring for visits?',
    type: 'multi-select',
    category: 'Services',
    options: [
      'Blood pressure monitor',
      'Glucose meter',
      'First aid / wound care kit',
      'ECG device',
      'Portable diagnostic tools',
      'None',
    ],
  },
  {
    id: 'emergencyCases',
    label: 'Are you open to handling emergency cases?',
    type: 'select',
    category: 'Services',
    options: [
      { label: 'Yes, I can handle emergencies', value: 'yes' },
      { label: 'Only minor cases', value: 'minor' },
      { label: 'No, preferred not', value: 'no' },
    ],
  },

  // Category 3: Availability
  {
    id: 'workingSchedule',
    label: 'What is your preferred working schedule?',
    type: 'select',
    category: 'Availability',
    options: [
      { label: 'Full Time', value: 'full-time', desc: '40+ hours/week' },
      { label: 'Part Time', value: 'part-time', desc: 'Flexible hours' },
      { label: 'Weekends', value: 'weekends', desc: 'Saturday & Sunday' },
      { label: 'On-Call', value: 'on-call', desc: 'Emergency response' },
    ],
  },
  {
    id: 'timeSlots',
    label: 'Tell us your preferred time slots.',
    type: 'multi-select',
    category: 'Availability',
    options: ['Morning', 'Afternoon', 'Evening', 'Night'],
  },
  {
    id: 'travelDistance',
    label: 'What is your maximum travel radius for home visits?',
    type: 'select',
    category: 'Availability',
    options: [
      { label: 'Up to 5 km', value: '0-5' },
      { label: '5–10 km', value: '5-10' },
      { label: '10–20 km', value: '10-20' },
      { label: 'More than 20 km', value: '20+' },
    ],
  },
  {
    id: 'paymentPreference',
    label: 'How would you like to be compensated?',
    type: 'select',
    category: 'Availability',
    options: [
      { label: 'Per Consultation', value: 'per-consultation' },
      { label: 'Monthly Partnership', value: 'monthly' },
      { label: 'Commission Based', value: 'commission' },
      { label: 'Flexible', value: 'flexible' },
    ],
  },

  // Category 4: Platform
  {
    id: 'appComfort',
    label: 'How comfortable are you with using mobile health apps?',
    type: 'select',
    category: 'Platform',
    options: [
      { label: 'Very comfortable', value: 'very' },
      { label: 'Somewhat comfortable', value: 'somewhat' },
      { label: 'Neutral', value: 'neutral' },
      { label: 'Not comfortable', value: 'not' },
    ],
  },
  {
    id: 'onlineConsultations',
    label: 'Are you open to providing online consultations?',
    type: 'binary',
    category: 'Platform',
    options: [
      { label: "Yes, I'm open to online", value: 'yes' },
      { label: 'No, physical only', value: 'no' },
    ],
  },
  {
    id: 'platformExpectations',
    label: 'What are your primary expectations from Curex24?',
    type: 'multi-select',
    category: 'Platform',
    options: [
      'More patient appointments',
      'Flexible work schedule',
      'Secure payment system',
      'Better visibility and reputation',
      'Networking with other doctors',
    ],
  },
  {
    id: 'guidelinesAgreement',
    label: 'Do you agree to follow the platform guidelines and terms of service?',
    type: 'binary',
    category: 'Platform',
    options: ['yes', 'no'],
  },
  {
    id: 'bio',
    label: 'Share a brief professional bio with your patients. (Optional)',
    type: 'textarea',
    category: 'Professional',
    placeholder: 'Tell patients about your expertise and care philosophy...',
    optional: true,
  },
];
