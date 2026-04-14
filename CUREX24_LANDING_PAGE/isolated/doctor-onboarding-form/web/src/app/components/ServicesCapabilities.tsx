import { useState } from 'react';
import { Home, Stethoscope, Users, Briefcase, Plus, Check } from 'lucide-react';
import logo from '../../imports/icon-removebg-preview.png';

interface ServicesCapabilitiesProps {
  onNext: (data: Record<string, any>) => void;
  data: Record<string, any>;
}

export function ServicesCapabilities({ onNext, data }: ServicesCapabilitiesProps) {
  const [formData, setFormData] = useState({
    homeVisits: data.homeVisits || '',
    services: data.services || [],
    patientGroups: data.patientGroups || [],
    medicalEquipment: data.medicalEquipment || [],
    emergencyCases: data.emergencyCases || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceOptions = [
    'General consultation',
    'Minor injury treatment',
    'Prescription of medication',
    'Blood pressure / vitals check',
    'Wound care',
    'Physiotherapy',
    'Follow-up visits',
  ];

  const patientGroupOptions = [
    { label: 'Children', icon: '👶' },
    { label: 'Adults', icon: '👨' },
    { label: 'Elderly patients', icon: '🧓' },
    { label: 'Pregnant women', icon: '🤰' },
  ];

  const equipmentOptions = [
    'Blood pressure monitor',
    'Glucose meter',
    'First aid / wound care kit',
    'ECG device',
    'Portable diagnostic tools',
    'None',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.homeVisits) newErrors.homeVisits = 'Please select your home visit preference';
    if (formData.services.length === 0) newErrors.services = 'Select at least one service';
    if (formData.patientGroups.length === 0) newErrors.patientGroups = 'Select at least one patient group';
    if (!formData.emergencyCases) newErrors.emergencyCases = 'Please select emergency case preference';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(formData);
  };

  const toggleService = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter((s: string) => s !== service)
        : [...formData.services, service],
    });
  };

  const togglePatientGroup = (group: string) => {
    setFormData({
      ...formData,
      patientGroups: formData.patientGroups.includes(group)
        ? formData.patientGroups.filter((g: string) => g !== group)
        : [...formData.patientGroups, group],
    });
  };

  const toggleEquipment = (equipment: string) => {
    if (equipment === 'None') {
      setFormData({ ...formData, medicalEquipment: ['None'] });
    } else {
      const filtered = formData.medicalEquipment.filter((e: string) => e !== 'None');
      setFormData({
        ...formData,
        medicalEquipment: filtered.includes(equipment)
          ? filtered.filter((e: string) => e !== equipment)
          : [...filtered, equipment],
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Curex24" className="h-20 w-auto mb-2" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Services & Capabilities</h2>
          <p className="text-muted-foreground">What care can you provide?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            Can you provide Home Visits?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['yes', 'no'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, homeVisits: option })}
                className={`py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  formData.homeVisits === option
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-secondary bg-secondary/20 text-foreground hover:border-primary/30'
                }`}
              >
                {option === 'yes' ? <Check className="w-8 h-8" /> : <Plus className="w-8 h-8 rotate-45" />}
                <span className="font-semibold capitalize">{option}</span>
              </button>
            ))}
          </div>
          {errors.homeVisits && <p className="text-xs text-destructive mt-1 ml-1">{errors.homeVisits}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-primary" />
            Services offered during visits
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {serviceOptions.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-4 py-3 rounded-xl border transition-all text-left text-sm ${
                  formData.services.includes(service)
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-secondary bg-secondary/10 text-foreground hover:bg-secondary/20'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
          {errors.services && <p className="text-xs text-destructive mt-1 ml-1">{errors.services}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Primary Patient Groups
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {patientGroupOptions.map((group) => (
              <button
                key={group.label}
                type="button"
                onClick={() => togglePatientGroup(group.label)}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                  formData.patientGroups.includes(group.label)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-secondary bg-secondary/20 text-foreground hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{group.icon}</span>
                <span className="text-[10px] sm:text-xs font-medium text-center">{group.label}</span>
              </button>
            ))}
          </div>
          {errors.patientGroups && <p className="text-xs text-destructive mt-1 ml-1">{errors.patientGroups}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Available Medical Equipment
          </label>
          <div className="flex flex-wrap gap-2">
            {equipmentOptions.map((equipment) => (
              <button
                key={equipment}
                type="button"
                onClick={() => toggleEquipment(equipment)}
                className={`px-4 py-2 rounded-full border-2 transition-all text-xs font-medium ${
                  formData.medicalEquipment.includes(equipment)
                    ? 'border-primary bg-primary text-white'
                    : 'border-secondary bg-secondary/20 text-foreground hover:bg-secondary/30'
                }`}
              >
                {equipment}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-sm font-medium text-foreground ml-1">Would you handle Emergency Cases?</label>
          <select
            value={formData.emergencyCases}
            onChange={(e) => setFormData({ ...formData, emergencyCases: e.target.value })}
            className={`w-full px-4 py-3 bg-secondary/30 border ${errors.emergencyCases ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
          >
            <option value="">Select preference</option>
            <option value="yes">Yes, I can handle emergencies</option>
            <option value="minor">Only minor cases</option>
            <option value="no">No, preferred not</option>
          </select>
          {errors.emergencyCases && <p className="text-xs text-destructive mt-1 ml-1">{errors.emergencyCases}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
        >
          Continue to Availability
        </button>
      </form>
    </div>
  );
}
