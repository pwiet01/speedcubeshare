import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { watch } from 'vite-plugin-watch';

export default defineConfig({
  plugins: [
    sveltekit(),
    watch({
      pattern: 'src/lib/server/mail/templates/*/*.handlebars',
      command: 'sh buildMail.sh',
    }),
  ],
});
