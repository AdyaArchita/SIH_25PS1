import React from "react";
import { Header } from "./Home/Header";
import { Navbar } from "./Home/Navbar";
import { Footer } from "./Home/Footer";

// --- Card component used for Benefits/Features ---
const InfoCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
    <div className="text-4xl mb-4 text-green-600">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function ForMunicipalities() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for your interest! Our team will contact you shortly to schedule a demo."
    );
    e.target.reset();
  };

  return (
    <main className="bg-gray-50">
      {/* Navbar + Header */}
      <Header />
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-28"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1599723503554-340157934e2c?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60"></div>
        <div className="relative container mx-auto px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Partner with EcoSort to Build a Smarter, Cleaner City
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Join the revolution in urban sanitation. Implement a data-driven,
            cost-effective, and sustainable waste management system in your
            municipality.
          </p>
        </div>
      </section>

      {/* Urban Waste Challenge Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            The Urban Waste Challenge
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Rapid urbanization has overwhelmed traditional waste management
            practices. Overflowing landfills, poor segregation at source, and
            lack of citizen engagement contribute to rising costs and declining
            environmental quality.
          </p>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our Solution
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            EcoSort empowers municipalities with cutting-edge technology and
            citizen engagement tools to transform waste management into an
            efficient, transparent, and environmentally friendly process.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard
              icon="📊"
              title="Real-time Data Insights"
              description="Track and analyze waste segregation at source, identify trends, and allocate resources more effectively."
            />
            <InfoCard
              icon="🤝"
              title="Citizen Engagement"
              description="Encourage households to adopt better waste practices with gamification and rewards."
            />
            <InfoCard
              icon="💰"
              title="Cost Savings"
              description="Reduce transportation and landfill expenses by improving segregation efficiency."
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Key Features for Municipalities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard
              icon="📍"
              title="Ward-Level Analytics"
              description="Get granular insights on waste patterns at ward and street levels."
            />
            <InfoCard
              icon="🚛"
              title="Optimized Collection Routes"
              description="Leverage data to design more efficient waste collection schedules."
            />
            <InfoCard
              icon="📢"
              title="Awareness Campaigns"
              description="Deploy targeted communication campaigns to improve citizen participation."
            />
            <InfoCard
              icon="✅"
              title="Compliance Reports"
              description="Generate automated reports for state and central government compliance."
            />
            <InfoCard
              icon="🎖️"
              title="Recognition Programs"
              description="Incentivize high-performing wards and households."
            />
            <InfoCard
              icon="🌱"
              title="Sustainability Impact"
              description="Measure reduction in landfill waste and increased recycling rates."
            />
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Implementation Roadmap
          </h2>
          <ol className="space-y-6 max-w-2xl mx-auto">
            <li className="flex items-start gap-4">
              <span className="text-green-600 font-bold text-xl">1.</span>
              <p className="text-gray-700">Pilot Program in select wards</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-600 font-bold text-xl">2.</span>
              <p className="text-gray-700">Integration with existing waste collection systems</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-600 font-bold text-xl">3.</span>
              <p className="text-gray-700">Full-scale rollout across municipality</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-600 font-bold text-xl">4.</span>
              <p className="text-gray-700">Continuous monitoring and improvements</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Partner with Us
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
          >
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Organization</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Request a Demo
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
