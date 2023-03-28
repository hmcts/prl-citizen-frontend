import autobind from 'autobind-decorator';

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

  public async add({ id, href }, session: AppSession): Promise<void | AppSession> {
    if (!session?.applicationSettings?.breadcrumbs) {
      await this.enable(session);
    }

    let breadcrumbs = session?.applicationSettings?.breadcrumbs
      ? [...session?.applicationSettings?.breadcrumbs]
      : [null];

    if (breadcrumbs) {
      const index = breadcrumbs.findIndex(breadcrumb => breadcrumb.id === id);

      if (index >= 0) {
        breadcrumbs = breadcrumbs.map(breadcrumb =>
          breadcrumb.id === id
            ? {
                id,
                href,
              }
            : breadcrumb
        );

        breadcrumbs.splice(index + 1);
      } else {
        breadcrumbs.push({
          id,
          href,
        });
      }
    }

    return new Promise(resolve => {
      if (session?.applicationSettings?.breadcrumbs) {
        session.applicationSettings = {
          ...session.applicationSettings,
          breadcrumbs,
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
