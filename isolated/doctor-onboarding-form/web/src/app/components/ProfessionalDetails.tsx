import { useState } from 'react';
import logo from '../../imports/icon-removebg-preview.png';

interface ProfessionalDetailsProps {
  onNext: (data: Record<string, any>) => void;
  data: Record<string, any>;
}

export function ProfessionalDetails({ onNext, data }: ProfessionalDetailsProps) {
  const [formData, setFormData] = useState({
    specialization: data.specialization || '',
    qualification: data.qualification || '',
    licenseStatus: data.licenseStatus || '',
    experience: data.experience || '',
    hospital: data.hospital || '',
    bio: data.bio || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.licenseStatus) newErrors.licenseStatus = 'License status is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(formData);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Curex24" className="h-24 w-auto mb-2 drop-shadow-sm" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Professional Details</h2>
          <p className="text-muted-foreground">Tell us about your medical background</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Primary Specialization</label>
            <select
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.specialization ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer`}
            >
              <option value="">Select specialization</option>
              <option value="general">General Physician</option>
              <option value="pediatrician">Pediatrician</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="orthopedic">Orthopedic</option>
              <option value="gynecologist">Gynecologist</option>
              <option value="physiotherapist">Physiotherapist</option>
              <option value="other">Other</option>
            </select>
            {errors.specialization && <p className="text-xs text-destructive mt-1 ml-1">{errors.specialization}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Highest Qualification</label>
            <select
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.qualification ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer`}
            >
              <option value="">Select qualification</option>
              <option value="mbbs">MBBS</option>
              <option value="md-ms">MD / MS</option>
              <option value="bds">BDS</option>
              <option value="bams-bhms">BAMS / BHMS</option>
              <option value="physiotherapy">Physiotherapy Degree</option>
              <option value="other">Other</option>
            </select>
            {errors.qualification && <p className="text-xs text-destructive mt-1 ml-1">{errors.qualification}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Medical License Status</label>
            <select
              value={formData.licenseStatus}
              onChange={(e) => setFormData({ ...formData, licenseStatus: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.licenseStatus ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer`}
            >
              <option value="">Select status</option>
              <option value="yes">Currently Licensed</option>
              <option value="no">Not Licensed</option>
              <option value="in-process">License in Process</option>
            </select>
            {errors.licenseStatus && <p className="text-xs text-destructive mt-1 ml-1">{errors.licenseStatus}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Clinical Experience</label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.experience ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer`}
            >
              <option value="">Select years</option>
              <option value="less-1">Less than 1 year</option>
              <option value="1-3">1–3 years</option>
              <option value="3-5">3–5 years</option>
              <option value="5-10">5–10 years</option>
              <option value="10+">More than 10 years</option>
            </select>
            {errors.experience && <p className="text-xs text-destructive mt-1 ml-1">{errors.experience}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground ml-1">Current Hospital / Clinic (Optional)</label>
          <input
            type="text"
            value={formData.hospital}
            onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
            className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="e.g. City General Hospital"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground ml-1">Professional Bio (Optional)</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]"
            placeholder="Tell patients about your expertise and care philosophy..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
        >
          Continue to Services
        </button>
      </form>
    </div>
  );
}
