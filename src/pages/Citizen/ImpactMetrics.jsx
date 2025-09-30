import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ImpactMetrics() {
  // Live counters
  const [counters, setCounters] = useState({
    wasteSegregated: 0,
    treesSaved: 0,
    bottlesRecycled: 0,
  });

  // Goals
  const goals = {
    wasteSegregated: 5000, // in tons
    treesSaved: 2000,
    bottlesRecycled: 100000,
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        wasteSegregated: Math.min(prev.wasteSegregated + Math.floor(Math.random() * 5), goals.wasteSegregated),
        treesSaved: Math.min(prev.treesSaved + Math.floor(Math.random() * 2), goals.treesSaved),
        bottlesRecycled: Math.min(prev.bottlesRecycled + Math.floor(Math.random() * 20), goals.bottlesRecycled),
      }));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "Tons of Waste Segregated",
      value: counters.wasteSegregated,
      goal: goals.wasteSegregated,
      color: "bg-green-600",
    },
    {
      label: "Trees Saved",
      value: counters.treesSaved,
      goal: goals.treesSaved,
      color: "bg-emerald-500",
    },
    {
      label: "Plastic Bottles Recycled",
      value: counters.bottlesRecycled,
      goal: goals.bottlesRecycled,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="min-h-full bg-gray-50 py-4 px-0">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Impact & Sustainability Metrics
        </motion.h1>

        {/* Counters */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {item.label}
              </h2>
              <motion.p
                className="text-3xl font-bold text-green-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {item.value.toLocaleString()}
              </motion.p>
              <p className="text-gray-600 text-sm">
                Goal: {item.goal.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress Bars */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Progress Toward Clean City Goals 🌍
          </h2>
          <div className="space-y-6">
            {metrics.map((item, idx) => {
              const percentage = Math.round((item.value / item.goal) * 100);
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-800">{item.label}</span>
                    <span className="text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      className={`h-4 rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
