import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function SmartDisposal() {
  const [suggestions, setSuggestions] = useState(
    JSON.parse(localStorage.getItem("binSuggestions")) || []
  );
  const [form, setForm] = useState({ name: "", location: "" });

  const bins = [
    { id: 1, name: "Recycling Center - Ward 5", status: "Available", coords: [28.61, 77.23] },
    { id: 2, name: "Compost Pit - Ward 10", status: "Almost Full", coords: [28.62, 77.21] },
    { id: 3, name: "Smart Bin - Market Street", status: "Overflowing 🚨", coords: [28.63, 77.22] },
  ];

  // Save suggestions to localStorage
  useEffect(() => {
    localStorage.setItem("binSuggestions", JSON.stringify(suggestions));
  }, [suggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([...suggestions, form]);
    setForm({ name: "", location: "" });
  };

  return (
    <div className="min-h-full bg-gray-50 py-4 px-0">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-green-700 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Smart Disposal & Bin Tracking
        </motion.h1>

        {/* Map */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MapContainer center={[28.61, 77.23]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {bins.map((bin) => (
              <Marker key={bin.id} position={bin.coords}>
                <Popup>
                  <strong>{bin.name}</strong> <br />
                  Status:{" "}
                  <span
                    className={`${
                      bin.status.includes("Overflowing")
                        ? "text-red-600"
                        : bin.status.includes("Almost")
                        ? "text-yellow-600"
                        : "text-green-600"
                    } font-semibold`}
                  >
                    {bin.status}
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Bin Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {bins.map((bin) => (
            <motion.div
              key={bin.id}
              className="bg-white p-6 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="font-semibold text-lg text-gray-900">{bin.name}</h2>
              <p
                className={`mt-2 font-medium ${
                  bin.status.includes("Overflowing")
                    ? "text-red-600"
                    : bin.status.includes("Almost")
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {bin.status}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Suggest New Bin Location */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Suggest a New Bin Location 📝
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="location"
              placeholder="Suggested Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Submit Suggestion
            </button>
          </form>

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Submitted Suggestions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {suggestions.map((s, idx) => (
                  <li key={idx}>
                    <strong>{s.name}</strong>: {s.location}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
