import React, { useState } from 'react';

export default function AboutUsContainer() {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is Orbit?',
      answer:
        'Orbit is an open-source tool for visualizing GraphQL schemas. It helps you explore relationships, fields, and queries in a clean, interactive interface without needing to manually trace dependencies or dig through raw schema files.',
    },
    {
      id: 'faq-2',
      question: 'Why is it called Orbit?',
      answer:
        'We chose the name Orbit because it reflects the way databases organize information — with tables, columns, and relationships all revolving around each other. The graph you see in Orbit feels like a system of connected nodes in motion, which inspired the name.',
    },
    {
      id: 'faq-3',
      question: 'Who is Orbit built for?',
      answer:
        "Orbit is designed for engineers working with GraphQL, whether you're building APIs, teaching schema design, or onboarding teammates. It's also helpful for product managers or designers who want a visual map of how different data entities relate.",
    },
    {
      id: 'faq-4',
      question: 'Is Orbit free to use?',
      answer:
        'Yes! Orbit is completely free and open source. You can clone the repository, contribute improvements, or simply run it locally for your own projects. There are no licensing fees or restrictions on personal or commercial use.',
    },
    {
      id: 'faq-5',
      question: 'How do I get started with Orbit?',
      answer:
        'You can try Orbit instantly by pasting a GraphQL schema into the app. For more advanced use, clone the repo from GitHub and follow the setup instructions. We provide sample data and a quickstart guide so you can be up and running in minutes.',
    },
    {
      id: 'faq-6',
      question: 'Can I contribute to Orbit?',
      answer:
        'Absolutely. We welcome pull requests, bug reports, and feature suggestions. Check out the GitHub repo for contribution guidelines. Even small improvements like clarifying documentation or reporting an issue make a difference.',
    },
    {
      id: 'faq-7',
      question: "What's on the roadmap?",
      answer:
        "Upcoming work includes improved schema import options, customizable layouts, and better integration with developer workflows. We're also exploring ways to make large schemas easier to navigate, such as search and filtering features.",
    },
  ];

  const handleToggle = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  const handleKeyDown = (event, itemId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle(itemId);
    }
  };

  const handleArrowKey = (event, currentIndex) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % faqItems.length;
      const nextItem = document.getElementById(`faq-${nextIndex + 1}`);
      nextItem?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? faqItems.length - 1 : currentIndex - 1;
      const prevItem = document.getElementById(`faq-${prevIndex + 1}`);
      prevItem?.focus();
    }
  };

  return (
    <div className="faqContainer" id="faq">
      <div className="faq__stack">
        <h2>Frequently Asked Questions</h2>
        <a
          href="https://github.com/oslabs-beta/Orbit/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="faq-anchor"
        >
          Have more questions? Open an issue on GitHub.
        </a>
        <div className="faq-accordion">
          {faqItems.map((item, index) => (
            <div key={item.id} className="faq-item">
              <button
                id={item.id}
                className={`faq-question ${openItem === item.id ? 'expanded' : ''}`}
                onClick={() => handleToggle(item.id)}
                onKeyDown={(e) => {
                  handleKeyDown(e, item.id);
                  handleArrowKey(e, index);
                }}
                aria-expanded={openItem === item.id}
                aria-controls={`${item.id}-answer`}
              >
                <span className="faq-question-text">{item.question}</span>
                <svg
                  className="faq-chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                id={`${item.id}-answer`}
                className={`faq-answer ${openItem === item.id ? 'expanded' : ''}`}
                aria-labelledby={item.id}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
