import React from "react";

// --- Reusable Card Component ---
const ResourceCard = ({ title, description, type, link, thumbnail }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    {thumbnail && (
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover"
      />
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {type === "video" ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          ▶ Watch Video
        </a>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          📖 Learn More
        </a>
      )}
    </div>
  </div>
);

// Removed imports for Header, Navbar, Footer
export default function Education() {
  return (
    <main className="bg-gray-50 min-h-full"> {/* Changed min-h-screen to min-h-full to fit dashboard layout */}

      {/* Hero Section - Integrated into the Content area */}
      <section className="relative bg-green-700 text-white py-10 rounded-xl mb-8 text-center shadow-lg">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Educational Resource Center
          </h1>
          <p className="mt-2 text-md max-w-2xl mx-auto text-gray-200">
            Learn how to properly segregate, dispose, and recycle waste.
          </p>
        </div>
      </section>

      {/* Section 1: Infographics & Short Videos */}
      <section className="py-8 bg-white rounded-xl shadow-lg mb-8">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            ♻️ Infographics & Short Videos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ResourceCard
              title="How to Segregate Waste"
              description="Quick infographic to understand dry, wet, and hazardous waste segregation."
              type="video"
              link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              thumbnail="https://placehold.co/600x400?text=Segregation+Video"
            />
            <ResourceCard
              title="Why Recycling Matters"
              description="A short animated video on how recycling saves energy and reduces pollution."
              type="video"
              link="https://www.youtube.com/"
              thumbnail="https://placehold.co/600x400?text=Recycling+Video"
            />
            <ResourceCard
              title="Clean India Infographic"
              description="Downloadable infographic on India's waste management challenges."
              type="doc"
              link="https://example.com/infographic.pdf"
              thumbnail="https://placehold.co/600x400?text=Infographic"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Local Disposal Guidelines */}
      <section className="py-8 bg-white rounded-xl shadow-lg mb-8">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            🗑️ Local Disposal Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-600">Dry Waste</h3>
              <p className="mt-2 text-gray-600">
                Paper, plastics, glass, metals. Ensure they are clean and dry
                before disposal.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-600">Wet Waste</h3>
              <p className="mt-2 text-gray-600">
                Kitchen scraps, fruits, vegetables, garden waste. Ideal for
                composting.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-600">
                Hazardous Waste
              </h3>
              <p className="mt-2 text-gray-600">
                Batteries, paints, chemicals, medical waste. Dispose at
                designated hazardous waste centers only.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-600">E-Waste</h3>
              <p className="mt-2 text-gray-600">
                Old electronics, chargers, cables. Drop off at e-waste collection
                facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: DIY Composting / Recycling */}
      <section className="py-8 bg-white rounded-xl shadow-lg mb-8">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🌱 DIY Composting & Recycling
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard
              title="Home Composting Guide"
              description="Step-by-step guide to create compost from kitchen scraps."
              type="doc"
              link="https://example.com/compost-guide.pdf"
              thumbnail="https://placehold.co/600x400?text=Composting"
            />
            <ResourceCard
              title="DIY Plastic Bottle Planters"
              description="Learn how to reuse plastic bottles to make beautiful garden planters."
              type="video"
              link="https://www.youtube.com/"
              thumbnail="https://placehold.co/600x400?text=DIY+Planter"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
