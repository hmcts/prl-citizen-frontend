import autobind from 'autobind-decorator';
import _ from 'lodash';

import { AppSession } from '../../../app/controller/AppRequest';

import { language } from './content';

interface BreadCrumb {
  id: string;
  text: string;
  href: string;
}

@autobind
class BreadcrumbController {
  public async enable(session: AppSession): Promise<void | AppSession> {
    return new Promise(resolve => {
      if (session) {
        session.applicationSettings = {
          ...session.applicationSettings,
          breadcrumbs: [],
        };
        session.save(resolve);
      } else {
        resolve();
      }
    });
  }

  public async add(breadcrumbs: Record<string, string>[], session: AppSession): Promise<void | AppSession> {
    if (!session?.applicationSettings?.breadcrumbs) {
      await this.enable(session);
    }

    const existingBreadcrumbs = [..._.get(session, 'applicationSettings.breadcrumbs', [])];

    breadcrumbs.forEach(breadcrumb => {
      const index = existingBreadcrumbs.findIndex(_breadcrumb => _breadcrumb.id === breadcrumb.id);

      if (index >= 0) {
        existingBreadcrumbs[index] = { id: breadcrumb.id, href: breadcrumb.href };
        existingBreadcrumbs.splice(index + 1);
      } else {
        existingBreadcrumbs.push({
          id: breadcrumb.id,
          href: breadcrumb.href,
        });
      }
    });

    return new Promise(resolve => {
      if (session?.applicationSettings?.breadcrumbs) {
        session.applicationSettings = {
          ...session.applicationSettings,
          breadcrumbs: existingBreadcrumbs,
        };
        session.save(resolve);
      } else {
        resolve();
      }
    });
  }

  public get(session: AppSession, lang: string): BreadCrumb[] | [] {
    const breadcrumbs = session?.applicationSettings?.breadcrumbs;

    if (breadcrumbs?.length) {
      return breadcrumbs.map(breadcrumb => ({ ...breadcrumb, text: language?.[lang]?.[breadcrumb.id] ?? '' }));
    }

    return [];
  }
}

export default new BreadcrumbController();
