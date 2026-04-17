-- SQL for creating the questionnaire_responses table in Supabase
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- UI fields matching questions.ts ids
  specialization text,
  qualification text,
  experience text,
  hospital text,
  bio text,
  "homeVisits" text,
  services text,
  "patientGroups" text,
  "medicalEquipment" text,
  "emergencyCases" text,
  "workingSchedule" text,
  "timeSlots" text,
  "travelDistance" text,
  "paymentPreference" text,
  "appComfort" text,
  "onlineConsultations" text,
  "platformExpectations" text,
  "guidelinesAgreement" text
);

-- Grant schema and table access to the anon and authenticated roles
-- (Required to fix "permission denied for schema public" errors in newer Supabase projects)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT, SELECT ON TABLE public.questionnaire_responses TO anon, authenticated;

-- Enable RLS (Optional, but good practice)
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no auth required as requested)
CREATE POLICY "Allow anonymous insert" ON questionnaire_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (Optional, adjust as needed)
CREATE POLICY "Allow anonymous read" ON questionnaire_responses
  FOR SELECT
  USING (true);
