import { initFeatureToggle } from '../../../main/app/utils/featureToggles';

export class FeatureToggleProvider {
  public enable(): void {
    initFeatureToggle();
  }
}
