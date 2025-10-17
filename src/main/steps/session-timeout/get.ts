import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { Language, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

@autobind
export class SessionTimeoutGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const language: Language = req.session?.lang === 'cy' ? 'cy' : 'en';

    const content = generatePageContent({
      language,
      pageContent: generateContent,
      userCase: req.session?.userCase,
      userEmail: req.session?.user?.email,
      additionalData: { req },
    });

    if (req.session) {
      req.session.destroy(() => res.render('session-timeout/template', content));
    } else {
      res.render('session-timeout/template', content);
    }
  }
}
