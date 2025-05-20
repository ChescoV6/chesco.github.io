module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'chesco-blue': '#1e40af',
        'chesco-purple': '#7c3aed',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 8px rgba(30, 64, 175, 0.3)',
      },
    },
  },
  plugins: [],
};