import React from "react";

// Updated data for the EcoSort theme
const reports = [
  { description: "Bin Full Report at KIIT Square", timestamp: "10:45 PM today" },
  { description: "Damaged Bin at Ekamra Kanan", timestamp: "9:15 PM today" },
  { description: "Sorting Error in Chennai", timestamp: "8:30 PM today" },
  { description: "Illegal Dumping near Hawa Mahal", timestamp: "7:50 PM today" },
  { description: "Bin Offline at Sabarmati Riverfront", timestamp: "6:20 PM today" },
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Eco-conscious Citizen",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    quote: "EcoSort makes it so simple to report a full or damaged bin. It feels great to contribute to a cleaner city!",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Housing Society Secretary",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Our society has never been cleaner. The smart bins and efficient collection have made a huge difference.",
  },
  {
    id: 3,
    name: "Dr. Meera Patel",
    role: "Municipal Operations Head",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "The data from EcoSort's network is invaluable for optimizing our waste collection routes and resources.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gray-100">
      {/* Civic Statistics + Reports */}
      <div className="bg-gray-800 text-gray-100 py-6 px-4 font-sans">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-10">
          {/* Left: Statistics */}
          <div className="flex-1 min-w-[300px]">
            <hr className="border-t-8 border-green-500 my-6" />
            <div className="flex flex-wrap gap-5 justify-between">
              <div className="flex-1 min-w-[200px] text-center">
                <div className="text-4xl font-bold mb-1">1,500+</div>
                <div className="text-sm text-gray-400">Tonnes of Waste Processed</div>
              </div>
              <div className="flex-1 min-w-[200px] text-center">
                <div className="text-4xl font-bold mb-1">1,250</div>
                <div className="text-sm text-gray-400">Smart Bins Deployed</div>
              </div>
              <div className="flex-1 min-w-[200px] text-center">
                <div className="text-4xl font-bold mb-1">97%</div>
                <div className="text-sm text-gray-400">Segregation Accuracy</div>
              </div>
            </div>
          </div>

          {/* Right: Recently Reported Problems */}
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-xl font-semibold mb-5 text-gray-100">
              Latest Network Reports
            </h2>
            <ul className="space-y-4">
              {reports.map((report, index) => (
                <li key={index}>
                  <div className="text-gray-100">{report.description}</div>
                  <div className="text-gray-400 text-sm">{report.timestamp}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Voices for a Cleaner India
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex-1 min-w-[300px] max-w-xs"
              >
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-5 border-4 border-green-500 mx-auto"
                />
                <blockquote className="text-gray-600 italic mb-5 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <h4 className="text-gray-800 font-semibold text-lg mb-1">{testimonial.name}</h4>
                <p className="text-green-600 font-medium text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
