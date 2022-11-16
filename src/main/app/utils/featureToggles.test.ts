import { expect } from 'chai';

import { FeatureToggles } from '../../../main/app/utils/featureToggles';
import { LaunchDarklyClient } from '../../common/clients/launchDarklyClient';

jest.mock('../../common/clients/launchDarklyClient');

const mockedLaunchDarklyClient = LaunchDarklyClient as jest.MockedClass<typeof LaunchDarklyClient>;

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
      expect(() => FeatureToggles.hasAnyAuthorisedFeature(['one'], 'test')).to.throw(Error);
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

  describe('isC100reBuildEnabled', () => {
    it('should throw and error if isC100reBuildEnabled does not exist', async () => {
      new FeatureToggles(new mockedLaunchDarklyClient()).isC100reBuildEnabled().then(data => {
        expect(data).to.be.undefined;
      });
      await expect(await new FeatureToggles(new mockedLaunchDarklyClient()).isC100reBuildEnabled().then(() => false)).to
        .be.false;
    });
  });
});
