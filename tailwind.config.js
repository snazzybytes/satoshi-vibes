// The content section of your tailwind.config.js file is where
// you configure the paths to all of your HTML templates,
// JavaScript components, and any other source files that contain Tailwind class names.
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // For the best performance and to avoid false positives,
    // be as specific as possible with your content configuration.
  ],
}
