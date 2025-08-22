/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './index.html'],
  theme: {
    extend: {
      colors: {
        // Component categories  
        'compute': '#FF9900',    // Orange - compute services
        'storage': '#569A31',    // Green - storage services
        'database': '#C925D1',   // Purple - database services  
        'network': '#146EB4',    // Blue - networking services
        'messaging': '#DC2626',  // Red - messaging services
        'analytics': '#059669',  // Emerald - analytics services
        'security': '#7C2D12',   // Brown - security services
        'devops': '#4338CA',     // Indigo - devops services
      }
    },
  },
  plugins: [],
}