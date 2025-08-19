import React from 'react';

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="back-to-top-container">
      <button onClick={scrollToTop} className="back-to-top-button" aria-label="Back to top">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span>Back to Top</span>
      </button>
    </div>
  );
}
