"use client";

import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
        <p className="text-sm text-gray-700">
          This website uses cookies to improve your experience.
        </p>
        <button
          onClick={handleAccept}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Accept
        </button>
      </div>
    )
  );
};

export default CookieConsent;
