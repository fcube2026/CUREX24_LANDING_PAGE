import React from "react";

const Footer = () => {

  return (

    <footer className="bg-white border-t border-gray-200 py-12">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>

          <h3 className="font-bold text-xl text-gray-800">
            Curex24
          </h3>

          <p className="mt-4 text-gray-600">

            Care that comes to you.

          </p>

        </div>

        <div>

          <h4 className="font-semibold text-gray-800">
            Services
          </h4>

          <ul className="mt-4 space-y-2 text-gray-600">

            <li>Doctors</li>
            <li>Physiotherapy</li>
            <li>Nursing</li>
            <li>Speech Therapy</li>

          </ul>

        </div>

        <div>

          <h4 className="font-semibold text-gray-800">
            Company
          </h4>

          <ul className="mt-4 space-y-2 text-gray-600">

            <li>About</li>
            <li>Careers</li>
            <li>Partners</li>

          </ul>

        </div>

        <div>

          <h4 className="font-semibold text-gray-800">
            Contact
          </h4>

          <p className="mt-4 text-gray-600">
            support@curex24.com
          </p>

        </div>

      </div>

      <p className="text-center text-gray-500 mt-10">

        © 2026 Curex24. All rights reserved.

      </p>

    </footer>

  );
};

export default Footer;