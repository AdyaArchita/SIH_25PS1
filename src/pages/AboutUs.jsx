import React from "react";
import { Header } from "./Home/Header";
import { Navbar } from "./Home/Navbar";

function AboutUs({ data = {} }) {
  const {
    intro = "Our platform is a pioneering initiative leveraging AI and IoT to create a smart, efficient, and sustainable waste management ecosystem for cleaner cities.",
    mission = {
      heading: "Our Mission",
      text: "To revolutionize urban waste management by automating segregation at the source, optimizing collection logistics, and promoting a circular economy to reduce landfill burden.",
    },
    vision = {
      heading: "Our Vision",
      text: "To build a future of zero-waste cities, where technology and community action converge to create a cleaner, greener, and healthier environment for all generations.",
    },
    achievements = {
      wasteSorted: "50,000+", // kg
      recyclingRate: 85,      // percentage
      binsDeployed: 250,
      carbonReduction: 15,    // tons
    },
    steps = [
      "Dispose Waste — Simply throw any item into the smart bin's single opening.",
      "AI-Powered Sorting — An internal camera and AI model instantly identify and sort the waste into correct categories (wet, dry, plastic, etc.).",
      "Real-time Monitoring — Ultrasonic sensors alert sanitation teams when specific compartments are full.",
      "Optimized Collection — Data-driven routes ensure timely and efficient waste collection, saving fuel, time, and resources.",
    ],
    images = [
      "/EcoSort/images/smart-bin-diagram.jpg",
      "/EcoSort/images/circular-economy.png",
      "/EcoSort/images/impact-numbers.png",
      "/EcoSort/images/how-it-works-flow.png",
    ],
    contact = {
      email: "contact@nagarsaarthi.example",
      phone: "+91 98765 43210",
    },
  } = data;

  const stat = (label, value) => (
    <div className="flex flex-col items-start">
      <dt className="text-3xl font-semibold tabular-nums">{value}</dt>
      <dd className="mt-1 text-sm text-gray-600">{label}</dd>
    </div>
  );

  const PlaceholderImage = ({ alt }) => (
    <div
      className="w-full h-64 sm:h-80 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400"
      role="img"
      aria-label={alt}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M8 3v4M16 3v4M3 11h18"
        />
      </svg>
    </div>
  );

  const Section = ({ children, image, index = 0, alt = "Section image" }) => (
    <section className="py-12">
      <div
        className={`container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 ${
          index % 2 !== 0 ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="lg:w-1/2">
          {image ? (
            <img
              src={image}
              alt={alt}
              className="w-full h-auto max-h-96 object-contain rounded-2xl shadow-sm border"
            />
          ) : (
            <PlaceholderImage alt={alt} />
          )}
        </div>
        <div className="lg:w-1/2 text-gray-800">{children}</div>
      </div>
    </section>
  );

  // Sections for alternating layout
  const sections = [
    {
      title: "Building the Future of Clean Cities",
      text: intro,
      image: images[0],
      alt: "Smart bin diagram",
    },
    {
      title: mission.heading,
      text: mission.text,
      image: images[1],
      alt: "Circular economy",
      extra: {
        title: vision.heading,
        text: vision.text,
        alt: "Vision",
      },
    },
    {
      title: "Our Impact in Numbers",
      text: "Our measurable achievements since launch:",
      image: images[2],
      alt: "Impact numbers",
      stats: achievements,
    },
    {
      title: "How It Works",
      text: steps.map((s, i) => `Step ${i + 1}: ${s}`),
      image: images[3],
      alt: "How it works",
      isList: true,
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      <Header />
      <Navbar />

      {sections.map((section, idx) => (
        <Section key={idx} image={section.image} index={idx} alt={section.alt}>
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          {section.isList ? (
            <ol className="mt-4 space-y-4 list-decimal list-inside text-gray-700">
              {section.text.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-700 leading-relaxed">{section.text}</p>
          )}

          {section.extra && (
            <>
              <h3 className="text-xl font-semibold mt-6">{section.extra.title}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">{section.extra.text}</p>
            </>
          )}

          {section.stats && (
            <dl className="mt-6 grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border">{stat("Waste Sorted (Kg)", section.stats.wasteSorted)}</div>
              <div className="bg-gray-50 p-6 rounded-2xl border">{stat("Recycling Rate", `${section.stats.recyclingRate}%`)}</div>
              <div className="bg-gray-50 p-6 rounded-2xl border">{stat("Smart Bins Deployed", section.stats.binsDeployed)}</div>
              <div className="bg-gray-50 p-6 rounded-2xl border">{stat("CO₂ Reduction (Tons)", section.stats.carbonReduction)}</div>
            </dl>
          )}
        </Section>
      ))}

      <footer className="py-10">
        <div className="container mx-auto px-6 lg:px-8 border-t pt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold">Contact & Partnerships</h4>
              <p className="mt-2 text-sm text-gray-600">
                For inquiries, contact us at <br />
                <a href={`mailto:${contact.email}`} className="text-indigo-600 underline">
                  {contact.email}
                </a>
                <br />
                <span className="text-gray-700">{contact.phone}</span>
              </p>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            © {new Date().getFullYear()} NagarSaarthi — Smart Waste Management. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default AboutUs;
