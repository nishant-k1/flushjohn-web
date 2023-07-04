export const GA_TRACKING_ID = "AW-11246929750"; // Replace with your own Google Analytics Tracking ID

// Function to load the Google tag
export const loadGtag = () => {
  if (process.env.NODE_ENV !== "production") {
    return; // Don't load the tag if not in production
  }

  // Load the gtag.js library asynchronously
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize and configure the tag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID);
};
