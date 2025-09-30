import React from 'react';

const steps = [
  {
    icon: '📸',
    title: 'Snap & Submit',
    description: 'Capture the issue with a photo and provide details about the problem in your area.'
  },
  {
    icon: '📍',
    title: 'Autolocate & Describe',
    description: 'The app automatically detects your location and categorizes your issue for faster resolution.'
  },
  {
    icon: '🔄',
    title: 'Track & Receive Updates',
    description: 'Follow the status of your report and receive notifications when action is taken.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-100" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl text-center shadow-xl flex-1 min-w-[280px] max-w-sm transform transition-transform duration-300 hover:-translate-y-3"
            >
              <div className="text-6xl mb-5">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
