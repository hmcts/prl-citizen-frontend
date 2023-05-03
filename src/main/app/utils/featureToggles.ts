/* eslint-disable import/namespace */
import config = require('config');
import toBoolean = require('to-boolean');

import { LaunchDarklyClient } from '../../common/clients/launchDarklyClient';

export class FeatureToggles {
  launchDarklyClient: LaunchDarklyClient;

  constructor(launchDarklyClient: LaunchDarklyClient) {
    this.launchDarklyClient = launchDarklyClient;
  }

  static isEnabled(featureName: string): boolean {
    return FeatureToggles.isAnyEnabled(featureName);
  }

  static hasAnyAuthorisedFeature(authorisedFeatures: string[], ...features: string[]): boolean {
    if (features.length === 0) {
      throw new Error('At least one feature name has to be provided');
    }

    return features.some(
      feature =>
        FeatureToggles.isEnabled(feature) && authorisedFeatures !== undefined && authorisedFeatures.includes(feature)
    );
  }

  static isAnyEnabled(...featureNames: string[]): boolean {
    if (featureNames.length === 0) {
      throw new Error('At least one feature name has to be provided');
    }
    return featureNames.some(featureName => toBoolean(config.get<boolean>(`featureToggles.${featureName}`)));
  }

  async isC100reBuildEnabled(): Promise<boolean> {
    const isC100RebuildEnabled = this.launchDarklyClient.serviceVariation(
      'c100-rebuild',
      toBoolean(config.get<boolean>('featureToggles.c100Rebuild'))
    );
    return isC100RebuildEnabled;
  }

  async isTestingSupportEnabled(): Promise<boolean> {
    const isTestingSupportEnabled = this.launchDarklyClient.serviceVariation(
      'testing-support',
      toBoolean(config.get<boolean>('featureToggles.testingSupport'))
    );
    return isTestingSupportEnabled;
  }
}

let featureToggleObj: FeatureToggles;
export const initializeFeatureToggle = async (): Promise<FeatureToggles> => {
  featureToggleObj = new FeatureToggles(new LaunchDarklyClient());
  featureToggleObj.launchDarklyClient.initializeLD();
  return featureToggleObj;
};

export const initFeatureToggle = (): void => {
  initializeFeatureToggle();
};

export const getFeatureToggle = (): FeatureToggles => {
  return featureToggleObj;
};
