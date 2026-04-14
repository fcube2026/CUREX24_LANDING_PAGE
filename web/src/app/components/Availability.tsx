import { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import logo from '../../imports/icon-removebg-preview.png';

interface AvailabilityProps {
  onNext: (data: Record<string, any>) => void;
  data: Record<string, any>;
}

export function Availability({ onNext, data }: AvailabilityProps) {
  const [formData, setFormData] = useState({
    workingSchedule: data.workingSchedule || '',
    timeSlots: data.timeSlots || [],
    travelDistance: data.travelDistance || '',
    paymentPreference: data.paymentPreference || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlotOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.workingSchedule) newErrors.workingSchedule = 'Select your working schedule';
    if (formData.timeSlots.length === 0) newErrors.timeSlots = 'Select at least one time slot';
    if (!formData.travelDistance) newErrors.travelDistance = 'Select travel distance';
    if (!formData.paymentPreference) newErrors.paymentPreference = 'Select payment preference';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(formData);
  };

  const toggleTimeSlot = (slot: string) => {
    setFormData({
      ...formData,
      timeSlots: formData.timeSlots.includes(slot)
        ? formData.timeSlots.filter((s: string) => s !== slot)
        : [...formData.timeSlots, slot],
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Curex24" className="h-20 w-auto mb-2" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Availability & Preferences</h2>
          <p className="text-muted-foreground">When are you available for care?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Preferred Working Schedule
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'full-time', label: 'Full Time', desc: '40+ hours/week' },
              { id: 'part-time', label: 'Part Time', desc: 'Flexible hours' },
              { id: 'weekends', label: 'Weekends', desc: 'Saturday & Sunday' },
              { id: 'on-call', label: 'On-Call', desc: 'Emergency response' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData({ ...formData, workingSchedule: option.id })}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1 ${
                  formData.workingSchedule === option.id
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-secondary bg-secondary/10 text-foreground hover:border-primary/30'
                }`}
              >
                <span className="font-semibold text-sm">{option.label}</span>
                <span className="text-[10px] text-muted-foreground">{option.desc}</span>
              </button>
            ))}
          </div>
          {errors.workingSchedule && <p className="text-xs text-destructive mt-1 ml-1">{errors.workingSchedule}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Available Time Slots
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlotOptions.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => toggleTimeSlot(slot)}
                className={`py-3 px-2 rounded-xl border-2 transition-all font-medium text-xs ${
                  formData.timeSlots.includes(slot)
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-secondary bg-secondary/10 text-foreground hover:bg-secondary/20'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.timeSlots && <p className="text-xs text-destructive mt-1 ml-1">{errors.timeSlots}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Travel Radius (KM)
            </label>
            <select
              value={formData.travelDistance}
              onChange={(e) => setFormData({ ...formData, travelDistance: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.travelDistance ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
            >
              <option value="">Select distance</option>
              <option value="0-5">Up to 5 km</option>
              <option value="5-10">5–10 km</option>
              <option value="10-20">10–20 km</option>
              <option value="20+">More than 20 km</option>
            </select>
            {errors.travelDistance && <p className="text-xs text-destructive mt-1 ml-1">{errors.travelDistance}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground ml-1 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Payment Preference
            </label>
            <select
              value={formData.paymentPreference}
              onChange={(e) => setFormData({ ...formData, paymentPreference: e.target.value })}
              className={`w-full px-4 py-3 bg-secondary/30 border ${errors.paymentPreference ? 'border-destructive' : 'border-transparent'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
            >
              <option value="">Select preference</option>
              <option value="per-consultation">Per Consultation</option>
              <option value="monthly">Monthly Partnership</option>
              <option value="commission">Commission Based</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.paymentPreference && <p className="text-xs text-destructive mt-1 ml-1">{errors.paymentPreference}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
        >
          Continue to Verification
        </button>
      </form>
    </div>
  );
}
