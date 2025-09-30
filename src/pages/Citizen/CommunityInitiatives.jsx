import { useState } from "react";
import { motion } from "framer-motion";

export default function CommunityInitiatives() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Registration:", formData);
    setSubmitted(true);
  };

  const initiatives = [
    {
      title: "Cleanliness Drives",
      description:
        "Join local teams in keeping your streets and parks free from litter.",
      icon: "🧹",
    },
    {
      title: "Swachhata Competitions",
      description:
        "Compete in community-led cleanliness contests to promote awareness.",
      icon: "🏆",
    },
    {
      title: "Tree Plantation",
      description:
        "Participate in drives that bring greenery and fresh air to your city.",
      icon: "🌱",
    },
  ];

  const stories = [
    {
      title: "Ward 12 Beat Plastic",
      description:
        "Residents reduced plastic waste by 60% through a door-to-door awareness program.",
    },
    {
      title: "School Swachhata Contest",
      description:
        "Local schools competed, resulting in cleaner surroundings and student-led initiatives.",
    },
  ];

  return (
    <div className="min-h-full bg-gray-50 py-4 px-0">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Community Initiatives
        </motion.h1>

        {/* Initiatives Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {initiatives.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          className="mb-10 bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Success Stories 🌟
          </h2>
          <div className="space-y-6">
            {stories.map((story, idx) => (
              <div
                key={idx}
                className="p-6 bg-green-50 border-l-4 border-green-600 rounded-md shadow-sm"
              >
                <h3 className="font-semibold text-lg text-gray-900">
                  {story.title}
                </h3>
                <p className="text-gray-700">{story.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Event Registration Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Register for a Local Clean-Up Event 📝
          </h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Event</option>
                <option value="Cleanliness Drive">Cleanliness Drive</option>
                <option value="Swachhata Competition">
                  Swachhata Competition
                </option>
                <option value="Tree Plantation">Tree Plantation</option>
              </select>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Register
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-semibold">
              ✅ Thank you for registering! We'll contact you with event details.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
