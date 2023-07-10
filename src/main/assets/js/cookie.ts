import cookieManager from '@hmcts/cookie-manager';

cookieManager.on('UserPreferencesLoaded', preferences => {
  const dataLayer = window.dataLayer || [];
  dataLayer.push({ event: 'Cookie Preferences', cookiePreferences: preferences });
});

cookieManager.on('UserPreferencesSaved', preferences => {
  const dataLayer = window.dataLayer || [];
  const dtrum = window.dtrum;

  dataLayer.push({ event: 'Cookie Preferences', cookiePreferences: preferences });

  if (dtrum !== undefined) {
    if (preferences.apm === 'on') {
      dtrum.enable();
      dtrum.enableSessionReplay(ignoreCostControl=false);
    } else {
      dtrum.disableSessionReplay(ignoreCostControl=false);
      dtrum.disable();
    }
  }
});

cookieManager.on('PreferenceFormSubmitted', () => {
  const message = document.querySelector('.cookie-preference-success') as HTMLElement;
  message.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

cookieManager.init({
  userPreferences: {
    cookieName: 'prl-cookie-preferences',
  },
  cookieManifest: [
    {
      categoryName: 'essential',
      optional: false,
      cookies: ['prl-cookie-preferences'],
    },
    {
      categoryName: 'analytics',
      cookies: ['_ga', '_gid', 'gat'],
    },
    {
      categoryName: 'apm',
      cookies: ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'dtValidationCookie', 'dtDisabled', 'rxVisitor', 'rxvt'],
    },
  ],
});

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    dtrum: DtrumApi;
  }
}

interface DtrumApi {
  enable(): void;
  enableSessionReplay(): void;
  disable(): void;
  disableSessionReplay(): void;
}
