import { Application } from 'express';

/**
 * Module that enables toggling between languages
 */
export class LanguageToggle {
  static supportedLanguages = ['en', 'cy'];

  public enableFor(app: Application): void {
    app.use((req, res, next) => {
      if (req.method === 'GET' && req.query['lng']) {
        const requestedLanguage = req.query['lng'] as string;

        if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
          req.session['lang'] = requestedLanguage;
        }
      }
      next();
    });
  }
}
