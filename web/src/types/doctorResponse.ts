export interface DoctorResponse {
  id?: string | number;
  name?: string | null;
  specialization?: string | null;
  experience?: string | number | null;
  home_visits?: string | null;
  online_consultations?: string | null;
  hospital?: string | null;
  working_schedule?: string | null;
  created_at?: string | null;
  [key: string]: unknown;
}

export const EXPERIENCE_NUMBER_REGEX = /(\d+(?:\.\d+)?)/;
