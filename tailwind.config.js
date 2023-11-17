import * as daisyui from 'daisyui';
import * as daisyuiThemes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  safelist: ['alert-success', 'alert-error', 'text-success-content', 'text-error-content'],
  daisyui: {
    logs: false,
    themes: [
      {
        emerald: {
          ...daisyuiThemes['[data-theme=emerald]'],
          '--animation-btn': '0.25s',
          '--animation-input': '.2s',
          '--btn-focus-scale': '0.95',
        },
      },
    ],
  },
};
