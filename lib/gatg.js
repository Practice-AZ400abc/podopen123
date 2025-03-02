export const GA_TRACKING_ID = "G-H1CLHQJTSD"; // Replace with your GA ID

// Function to send pageviews
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Function to send custom events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
