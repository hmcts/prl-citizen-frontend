import { Application } from 'express';

import { initFeatureToggle } from '../../../main/app/utils/featureToggles';

export class FeatureToggleProvider {
  public enable(app: Application): void {
    if (!app.locals.developmentMode) {
      initFeatureToggle();
    }
  }
}
