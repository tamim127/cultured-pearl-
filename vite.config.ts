import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 100000,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react-router-dom',
      ],
      output: {
        paths: {
          'react': 'https://esm.sh/react@18.3.1',
          'react-dom': 'https://esm.sh/react-dom@18.3.1',
          'react-dom/client': 'https://esm.sh/react-dom@18.3.1/client',
          'react/jsx-runtime': 'https://esm.sh/react@18.3.1/jsx-runtime',
          'react-router-dom': 'https://esm.sh/react-router-dom@6.28.0?external=react,react-dom',
        },
        manualChunks: (id) => {
          if (id.includes('/data/eventsData') || id.includes('/data/teamData') || id.includes('/data/storeAndBlogData') || id.includes('/constants/images')) {
            return 'data-catalog';
          }
          if (id.includes('/pages/Events') || id.includes('/pages/EventDetail')) {
            return 'events-bundle';
          }
          if (id.includes('/pages/MeetTheTeam') || id.includes('/pages/Debutante') || id.includes('/pages/Scholarship')) {
            return 'programs-bundle';
          }
          if (id.includes('/pages/Shop') || id.includes('/pages/Gallery') || id.includes('/pages/Videos') || id.includes('/pages/Blog') || id.includes('/pages/Contact')) {
            return 'media-bundle';
          }
          if (id.includes('/pages/Give') || id.includes('/pages/Sisterhood') || id.includes('/pages/NotFound')) {
            return 'community-bundle';
          }
          if (id.includes('/pages/Home') || id.includes('/pages/About')) {
            return 'home-bundle';
          }
        },
      },
    },
  },
});
