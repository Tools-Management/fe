import { definePreset } from '@primeuix/themes';
import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';

export default {
  install: function install(app: App) {
    const CustomPreset = definePreset(Aura, {
      semantic: {
        primary: {
          50: 'var(--color-white)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
        },
        colorScheme: {
          light: {
            primary: {
              color: 'var(--color-brand-500)',
              inverseColor: 'var(--color-white)',
              hoverColor: 'var(--color-brand-600)',
              activeColor: 'var(--color-brand-700)',
            },
            highlight: {
              background: 'var(--color-brand-500)',
              focusBackground: 'var(--color-brand-500)',
              color: 'var(--color-white)',
              focusColor: 'var(--color-brand-700)',
            },
          },
          dark: {
            primary: {
              color: 'var(--color-white)',
              inverseColor: 'var(--color-brand-700)',
              hoverColor: 'var(--color-brand-600)',
              activeColor: 'var(--color-brand-700)',
            },
            highlight: {
              background: 'var(--color-brand-500)',
              focusBackground: 'var(--color-brand-500)',
              color: 'var(--color-white)',
              focusColor: 'var(--color-brand-700)',
            },
          },
        },
      },
    });
    app.use(PrimeVue, {
      theme: {
        preset: CustomPreset,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue',
          },
        },
      },
      ripple: true,
    });
    app.use(ConfirmationService);
    app.use(ToastService);
    app.use(DialogService);
    app.directive('tooltip', Tooltip);
    app.directive('ripple', Ripple);
  },
};