export const GA_TRACKING_ID = "AW-11246929750"; // Replace with your own Google Analytics Tracking ID

// Function to load the Google tag
export const loadGtag = () => {
  if (process.env.NODE_ENV !== "production") {
    return; // Don't load the tag if not in production
  }

  if (typeof window !== "undefined") {
    // Load the gtag.js library asynchronously
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize and configure the tag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_TRACKING_ID);
  }
};

// Function to send events to Google Analytics
export const gtag = (...args) => {
  if (window.gtagInitialized) {
    window.gtag(...args);
  }
};

// Set gtagInitialized flag when the script is loaded
if (typeof window !== "undefined") {
  window.gtagInitialized = false;
  window.addEventListener("load", () => {
    window.gtagInitialized = true;
  });
}
