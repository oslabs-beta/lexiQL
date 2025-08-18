import React, { useState } from 'react';

export default function AboutUsContainer() {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What databases does Orbit support?',
      answer: 'Orbit works with PostgreSQL databases.',
    },
    {
      id: 'faq-2',
      question: 'Do I need my own database to try it?',
      answer: 'No. Click Use Sample Database to explore Orbit instantly.',
    },
    {
      id: 'faq-3',
      question: 'What does Orbit generate?',
      answer: 'A relational schema diagram plus boilerplate GraphQL types and resolvers.',
    },
    {
      id: 'faq-4',
      question: 'Is Orbit production-ready?',
      answer: 'Orbit is an open-source developer tool intended for prototyping and exploration.',
    },
    {
      id: 'faq-5',
      question: 'Where can I report issues or contribute?',
      answer: 'On GitHub—issues and pull requests are welcome.',
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
                className={`faq-trigger ${openItem === item.id ? 'open' : ''}`}
                onClick={() => handleToggle(item.id)}
                onKeyDown={(e) => {
                  handleKeyDown(e, item.id);
                  handleArrowKey(e, index);
                }}
                aria-expanded={openItem === item.id}
                aria-controls={`${item.id}-panel`}
              >
                <span className="faq-question">{item.question}</span>
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
                id={`${item.id}-panel`}
                className={`faq-panel ${openItem === item.id ? 'open' : ''}`}
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
