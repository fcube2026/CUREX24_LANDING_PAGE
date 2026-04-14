export default function PatientsProviders() {

  return (

    <section className="py-24 text-center bg-gradient-to-b from-green-100 to-green-200">

      {/* Heading */}

      <h2 className="text-3xl font-bold mb-3">
        Built for Patients & Providers
      </h2>

      <p className="text-gray-700 mb-12">
        A platform that benefits both those seeking care and those providing it
      </p>

      {/* Cards */}

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Patients Card */}

          <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg text-left">

            <div className="text-3xl mb-4">
              👨‍👩‍👧
            </div>

            <h3 className="text-xl font-semibold mb-4">
              For Patients
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm">

              <li>✓ Instant access to nearby healthcare providers</li>

              <li>✓ Flexible care options (home or clinic)</li>

              <li>✓ Easy booking and scheduling</li>

              <li>✓ Continuous care with subscriptions</li>

            </ul>

          </div>

          {/* Providers Card */}

          <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg text-left">

            <div className="text-3xl mb-4">
              👨‍⚕️
            </div>

            <h3 className="text-xl font-semibold mb-4">
              For Providers
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm">

              <li>✓ Reach more patients in your area</li>

              <li>✓ Flexible working schedules</li>

              <li>✓ Manage appointments easily</li>

              <li>✓ Grow your practice digitally</li>

            </ul>

          </div>

        </div>

      </div>

    </section>

  );

}