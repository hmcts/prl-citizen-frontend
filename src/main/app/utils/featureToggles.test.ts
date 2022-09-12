import { expect } from 'chai';

import { FeatureToggles } from '../../../main/app/utils/featureToggles';

describe('FeatureToggles', () => {
  describe('isAnyEnabled', () => {
    it('should throw an error when no toggle names are provided', () => {
      expect(() => FeatureToggles.isAnyEnabled()).to.throw(Error);
    });

    it('should throw an error if toggle does not exist', () => {
      expect(() => FeatureToggles.isAnyEnabled('one', 'two', 'three')).to.throw(Error);
    });
  });

  describe('hasAnyAuthorisedFeature', () => {
    it('should throw an error when no feature names are provided', () => {
      expect(() => FeatureToggles.hasAnyAuthorisedFeature(['one'])).to.throw(Error);
    });

    it('should throw an error if toggle does not exist', () => {
      expect(() => FeatureToggles.hasAnyAuthorisedFeature([])).to.throw(Error);
    });
  });

  describe('isEnabled', () => {
    it('should throw an error if toggle does not exist', () => {
      expect(() => FeatureToggles.isEnabled('I am not a valid toggle name')).to.throw(Error);
    });
  });
});
