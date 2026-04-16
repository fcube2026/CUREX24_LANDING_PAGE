-- SQL for creating the doctor_onboarding_questionnaire table in Supabase
-- Run this in the Supabase SQL Editor
-- ⚠️  This script ONLY creates a new table. It does NOT modify or delete
--     any existing schemas, tables, or data.

CREATE TABLE IF NOT EXISTS doctor_onboarding_questionnaire (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Professional Details (Category 1)
  specialization         text,                -- single-choice (MCQ)
  qualification          text,                -- single-choice (MCQ)
  experience             text,                -- single-choice (MCQ)
  hospital               text,                -- free text (optional)
  bio                    text,                -- textarea   (optional)

  -- Services & Capabilities (Category 2)
  home_visits            text,                -- binary yes/no
  services               text[],              -- multi-select
  patient_groups         text[],              -- multi-select
  medical_equipment      text[],              -- multi-select
  emergency_cases        text,                -- single-choice (MCQ)

  -- Availability (Category 3)
  working_schedule       text,                -- single-choice (MCQ)
  time_slots             text[],              -- multi-select
  travel_distance        text,                -- single-choice (MCQ)
  payment_preference     text,                -- single-choice (MCQ)

  -- Platform & Verification (Category 4)
  app_comfort            text,                -- single-choice (MCQ)
  online_consultations   text,                -- binary yes/no
  platform_expectations  text[],              -- multi-select
  guidelines_agreement   text                 -- binary yes/no
);

-- Grant schema and table access to the anon and authenticated roles
-- (Required to fix "permission denied for schema public" errors)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT, SELECT ON TABLE public.doctor_onboarding_questionnaire TO anon, authenticated;

-- Enable Row Level Security
ALTER TABLE doctor_onboarding_questionnaire ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no auth required for onboarding form)
CREATE POLICY "Allow anonymous insert"
  ON doctor_onboarding_questionnaire
  FOR INSERT
  WITH CHECK (true);

-- Allow anonymous reads (adjust as needed for dashboards)
CREATE POLICY "Allow anonymous read"
  ON doctor_onboarding_questionnaire
  FOR SELECT
  USING (true);
