export default function PartnerSection() {

  return (

    <section className="py-24 bg-gradient-to-b from-green-200 to-green-300 flex justify-center">

      <div className="bg-white/60 
                      backdrop-blur-md 
                      p-10 
                      rounded-2xl 
                      shadow-xl 
                      text-center 
                      max-w-4xl 
                      w-full">

        {/* Title */}

        <h2 className="text-3xl font-bold mb-4">
          Partner With Curex24
        </h2>

        {/* Description */}

        <p className="text-gray-700 mb-10 max-w-2xl mx-auto">

          Join our growing network of healthcare professionals and providers.
          Expand your reach, manage patients easily, and deliver care more efficiently.

        </p>

        {/* Features Grid */}

        <div className="grid md:grid-cols-2 gap-6 text-left mb-10 text-gray-700">

          <div>✓ Access a wider patient base</div>

          <div>✓ Flexible scheduling system</div>

          <div>✓ Digital appointment management</div>

          <div>✓ Grow your healthcare practice</div>

        </div>

        {/* Button */}

        <button className="bg-green-500 
                           hover:bg-green-600 
                           text-white 
                           px-8 
                           py-3 
                           rounded-xl 
                           shadow-md 
                           transition">

          Become a Partner

        </button>

      </div>

    </section>

  );

}