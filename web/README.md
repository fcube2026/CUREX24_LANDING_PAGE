
  # Doctor Onboarding Questionnaire UI

  This is a code bundle for Doctor Onboarding Questionnaire UI. The original project is available at https://www.figma.com/design/0Ab3OmE7cYdpDPLv7z8cfK/Doctor-Onboarding-Questionnaire-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Supabase onboarding storage (doctor_onboarding_questionnaire)

  - **Client setup:** `web/src/lib/supabase.ts`
  - **Form submit mapping + insert:** `web/src/app/App.tsx`
  - **SQL table creation script:** `server/doctor_onboarding_questionnaire.sql`

  Example payload shape inserted into Supabase:

  ```json
  {
    "specialization": "general",
    "qualification": "mbbs",
    "experience": "3-5",
    "hospital": "City General Hospital",
    "bio": "General physician with home-care focus",
    "home_visits": "yes",
    "services": ["General consultation", "Follow-up visits"],
    "patient_groups": ["Adults", "Elderly patients"],
    "medical_equipment": ["Blood pressure monitor", "Glucose meter"],
    "emergency_cases": "minor",
    "working_schedule": "part-time",
    "time_slots": ["Morning", "Evening"],
    "travel_distance": "5-10",
    "payment_preference": "per-consultation",
    "app_comfort": "very",
    "online_consultations": "yes",
    "platform_expectations": ["More patient appointments", "Secure payment system"],
    "guidelines_agreement": "yes"
  }
  ```

  Production-safety notes:
  - Table creation uses `CREATE TABLE IF NOT EXISTS` to avoid overwriting existing objects.
  - Policy creation is idempotent (`pg_policies` checks) to avoid schema conflicts on re-run.
  - Frontend only marks submission successful after a successful Supabase insert.
  
