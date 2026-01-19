
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  prefix: 'tw-',
  corePlugins: {
    preflight: true    // ❌ disable Tailwind base reset
  },
  theme: {

    extend: {

      colors: {
        bg: 'oklch(100% 0 0)',
        text: 'oklch(30% 0 0)',
        surface: 'oklch(95% 0 0)', // ✅ REQUIRED
        border: 'oklch(80% 0 0)',
        accent: 'oklch(70% 0.15 40)',
      },
      borderRadius: {
        xs: '0.125rem',
      },
      backdropBlur: {
        xs: '4px',
      },
      fontFamily: {
        secondary: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '6xl': '72rem', // 1152px (default Tailwind value)
      },
      clipPath: {
        custom: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
      },

    },
  },
  safelist: [
    /*     'grid-cols-[250px_1fr]',
        'tw-grid-cols-[250px_1fr]', */
  ],
  plugins: [

  ]
}

