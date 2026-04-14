import { useState } from 'react';
import { Upload, Shield, FileText, Smartphone, Globe, Target, X, CheckCircle } from 'lucide-react';
import logo from '../../imports/icon-removebg-preview.png';

interface PlatformVerificationProps {
  onNext: (data: Record<string, any>) => void;
  data: Record<string, any>;
}

export function PlatformVerification({ onNext, data }: PlatformVerificationProps) {
  const [formData, setFormData] = useState({
    appComfort: data.appComfort || '',
    onlineConsultations: data.onlineConsultations || '',
    platformExpectations: data.platformExpectations || [],
    guidelinesAgreement: data.guidelinesAgreement || '',
  });

  const [idFile, setIdFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const expectationOptions = [
    'More patient appointments',
    'Flexible work schedule',
    'Secure payment system',
    'Better visibility and reputation',
    'Networking with other doctors',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.appComfort) newErrors.appComfort = 'Please select your app comfort level';
    if (!formData.onlineConsultations) newErrors.onlineConsultations = 'Please select online consultation preference';
    if (formData.platformExpectations.length === 0) newErrors.platformExpectations = 'Select at least one expectation';
    if (!formData.guidelinesAgreement) newErrors.guidelinesAgreement = 'Please select guidelines agreement';
    if (!idFile) newErrors.id = 'Please upload your ID proof';
    if (!licenseFile) newErrors.license = 'Please upload your license proof';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({ ...formData, verified: true });
  };

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
    }
  };

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const toggleExpectation = (expectation: string) => {
    setFormData({
      ...formData,
      platformExpectations: formData.platformExpectations.includes(expectation)
        ? formData.platformExpectations.filter((e: string) => e !== expectation)
        : [...formData.platformExpectations, expectation],
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Curex24" className="h-20 w-auto mb-2" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Platform & Verification</h2>
          <p className="text-muted-foreground">Final steps for your profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              Mobile App Comfort
            </label>
            <select
              value={formData.appComfort}
              onChange={(e) => setFormData({ ...formData, appComfort: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.appComfort ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
            >
              <option value="">Select comfort level</option>
              <option value="very">Very comfortable</option>
              <option value="somewhat">Somewhat comfortable</option>
              <option value="neutral">Neutral</option>
              <option value="not">Not comfortable</option>
            </select>
            {errors.appComfort && <p className="text-xs text-destructive mt-1 ml-1">{errors.appComfort}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Online Consultations
            </label>
            <select
              value={formData.onlineConsultations}
              onChange={(e) => setFormData({ ...formData, onlineConsultations: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.onlineConsultations ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
            >
              <option value="">Select preference</option>
              <option value="yes">Yes, I'm open to online</option>
              <option value="no">No, physical only</option>
              <option value="maybe">Maybe in the future</option>
            </select>
            {errors.onlineConsultations && <p className="text-xs text-destructive mt-1 ml-1">{errors.onlineConsultations}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Platform Expectations
          </label>
          <div className="flex flex-wrap gap-2">
            {expectationOptions.map((expectation) => (
              <button
                key={expectation}
                type="button"
                onClick={() => toggleExpectation(expectation)}
                className={`px-4 py-2 rounded-full border-2 transition-all text-xs font-medium ${
                  formData.platformExpectations.includes(expectation)
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-secondary bg-secondary/20 text-foreground hover:bg-secondary/30'
                }`}
              >
                {expectation}
              </button>
            ))}
          </div>
          {errors.platformExpectations && <p className="text-xs text-destructive mt-1 ml-1">{errors.platformExpectations}</p>}
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Document Verification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`relative w-full p-4 border-2 border-dashed rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition-all ${idFile ? 'border-primary bg-primary/5' : 'border-secondary bg-secondary/10 hover:border-primary/30'} ${errors.id ? 'border-destructive' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idFile ? 'bg-primary/20' : 'bg-muted'}`}>
                  {idFile ? <CheckCircle className="w-5 h-5 text-primary" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-bold ${idFile ? 'text-primary' : 'text-foreground'}`}>
                    {idFile ? 'ID Uploaded' : 'Upload ID Proof'}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{idFile ? idFile.name : 'Govt issued ID'}</p>
                </div>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleIdUpload} className="hidden" />
                {idFile && (
                  <button type="button" onClick={(e) => { e.preventDefault(); setIdFile(null); }} className="absolute top-2 right-2 p-1 bg-white text-destructive rounded-full shadow-sm hover:bg-destructive/10">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </label>
              {errors.id && <p className="text-xs text-destructive mt-1 ml-1">{errors.id}</p>}
            </div>

            <div className="space-y-2">
              <label className={`relative w-full p-4 border-2 border-dashed rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition-all ${licenseFile ? 'border-primary bg-primary/5' : 'border-secondary bg-secondary/10 hover:border-primary/30'} ${errors.license ? 'border-destructive' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${licenseFile ? 'bg-primary/20' : 'bg-muted'}`}>
                  {licenseFile ? <CheckCircle className="w-5 h-5 text-primary" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-bold ${licenseFile ? 'text-primary' : 'text-foreground'}`}>
                    {licenseFile ? 'License Uploaded' : 'Upload License'}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{licenseFile ? licenseFile.name : 'Medical certificate'}</p>
                </div>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleLicenseUpload} className="hidden" />
                {licenseFile && (
                  <button type="button" onClick={(e) => { e.preventDefault(); setLicenseFile(null); }} className="absolute top-2 right-2 p-1 bg-white text-destructive rounded-full shadow-sm hover:bg-destructive/10">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </label>
              {errors.license && <p className="text-xs text-destructive mt-1 ml-1">{errors.license}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.guidelinesAgreement === 'yes'}
              onChange={(e) => setFormData({ ...formData, guidelinesAgreement: e.target.checked ? 'yes' : '' })}
              className="w-5 h-5 rounded-lg border-primary text-primary focus:ring-primary/20 transition-all cursor-pointer"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-all">
              I agree to the <span className="text-primary font-semibold underline underline-offset-4">Platform Guidelines</span> and terms of service.
            </span>
          </label>
          {errors.guidelinesAgreement && <p className="text-xs text-destructive mt-1 ml-1">{errors.guidelinesAgreement}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
