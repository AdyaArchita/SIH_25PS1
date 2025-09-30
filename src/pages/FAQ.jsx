import React, { useState } from "react";
import { Header } from "./Home/Header";
import { Navbar } from "./Home/Navbar";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const categorizedFAQs = [
  {
        category: "Using the Smart Bins",
    items: [
      {
        question: "How do I use an EcoSort smart bin?",
        answer:
          "Simply approach the bin and dispose of your waste into the single collection slot. An internal camera and AI system will automatically identify and sort the waste into the correct compartment (wet, dry, plastic, etc.).",
      },
      {
        question: "Do I need to separate my waste before using the bin?",
        answer:
          "No, you do not. The primary benefit of our smart bin is its ability to automatically segregate waste for you. This increases the efficiency and accuracy of recycling.",
      },
      {
        question: "What types of waste can I dispose of?",
        answer:
          "Our bins are designed to handle most common municipal solid waste, including food scraps, plastic bottles, paper, cardboard, and glass. Please avoid disposing of hazardous materials or construction debris.",
      },
      {
        question: "What happens to the waste after it is sorted?",
        answer:
          "Once sorted, the waste is collected by municipal teams. The clean, segregated materials are then sent to dedicated recycling and processing facilities, promoting a circular economy.",
      },
    ],
  },
  {
    category: "Reporting Bin Issues",
    items: [
      {
        question: "How do I report a bin that is full or damaged?",
        answer:
          "You can report any issue with a specific bin through the 'Report a Bin Issue' page on our website or by using our EcoSort Assistant chatbot. You'll need to provide the bin's location and a brief description of the problem.",
      },
      {
        question: "What should I do if I see someone dumping garbage illegally near a bin?",
        answer:
          "Please report this immediately using the 'Illegal Dumping' category on the reporting page. This helps us coordinate with local authorities to take appropriate action.",
      },
      {
        question: "How long does it take to resolve a reported bin issue?",
        answer:
          "Response times vary. Reports of full bins are typically addressed within hours, while hardware repairs may take 1-2 business days. You can track the real-time status of your report on your Citizen Profile page.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    items: [
      {
        question: "Do I need to register to report an issue?",
        answer:
          "Yes, registering ensures that you can track the status of your report and receive updates when the issue is resolved.",
      },
      {
        question: "Can I report an issue anonymously?",
        answer:
          "Currently, reports require registration. However, your personal information is kept confidential and is only used for follow-ups and notifications.",
      },
      {
        question: "Will my report be visible to others?",
        answer:
          "Reports are visible on the platform in an anonymized format. Personal details of the reporter are never publicly shared.",
      },
      {
        question: "How is my data protected?",
        answer:
          "We follow strict privacy protocols. All personal data is encrypted and stored securely. Only authorized municipal staff can access your report details.",
      },
    ],
  },
  {
    category: "Technical Support",
    items: [
      {
        question: "Is there a mobile app?",
        answer:
          "Currently, our platform is web-based, but it is optimized for mobile browsers. Mobile apps are planned for future releases.",
      },
      {
        question: "What if I encounter a technical problem while using the platform?",
        answer:
          "You can contact our support team via the provided email or phone number. Include a screenshot and description of the issue for faster resolution.",
      },
    ],
  },
  {
    category: "Community & Participation",
    items: [
      {
        question: "How can I become a part of the platform's community programs?",
        answer:
          "We regularly conduct community outreach programs. Stay updated via our newsletter or contact the support team to participate.",
      },
    ],
  },
];

export default function FAQ() {
  const [openFAQs, setOpenFAQs] = useState({}); // Track open state per category+question
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (catIdx, faqIdx) => {
    const key = `${catIdx}-${faqIdx}`;
    setOpenFAQs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter FAQs based on search query
  const filteredCategories = categorizedFAQs.map((category) => {
    const filteredItems = category.items.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(cat => cat.items.length > 0); // Only categories with matching items

  return (
    <main className="bg-white text-gray-900">
      <Header />
      <Navbar />

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-700 mb-6">
            Find answers to common questions about using our civic reporting platform.
          </p>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-lg">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {filteredCategories.length === 0 && (
            <p className="text-gray-500">No FAQs match your search query.</p>
          )}

          {filteredCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((faq, faqIdx) => {
                  const isOpen = openFAQs[`${catIdx}-${faqIdx}`];
                  return (
                    <div
                      key={faqIdx}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleFAQ(catIdx, faqIdx)}
                        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-white text-gray-700">{faq.answer}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NagarSaarthi-Civic Crowdsorced Reporting Platform — All rights reserved.
        </div>
      </footer>
    </main>
  );
}
