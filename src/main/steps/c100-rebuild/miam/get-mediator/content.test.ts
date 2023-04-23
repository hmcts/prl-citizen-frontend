import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'You must attend a MIAM',
  paragraph: `You have not provided a valid reason for not attending a MIAM.
                You’re legally required to attend one if you want to 
                go to court to resolve a dispute involving the children.`,
  stepsLabel: 'You need to follow these steps before continuing with your application:',
  step1: 'Enter your postcode to find a mediator',
  steps: [
    'Book initial meeting with the mediator',
    'Attend the MIAM',
    'Ask the mediator for a document confirming your attendance',
  ],
  paragraph1: `Alternatively you can 
                <a href="https://helpwithchildarrangements.service.justice.gov.uk" 
                class="govuk-link" rel="external" target="_blank">read the child 
                arrangements guide</a> to see if there’s a more suitable option 
                than going to court.`,
  formActionUrl: 'https://www.familymediationcouncil.org.uk/find-local-mediator/',
};

const cy = {
  title: 'You must attend a MIAM - welsh',
  paragraph: `You have not provided a valid reason for not attending a MIAM.
                You’re legally required to attend one if you want to 
                go to court to resolve a dispute involving the children.- Welsh`,
  stepsLabel: 'You need to follow these steps before continuing with your application: - Welsh',
  step1: 'Enter your postcode to find a mediator - Welsh',
  steps: [
    'Book initial meeting with the mediator - Welsh',
    'Attend the MIAM - Welsh',
    'Ask the mediator for a document confirming your attendance - Welsh',
  ],
  paragraph1: `Alternatively you can 
                <a href="https://helpwithchildarrangements.service.justice.gov.uk" 
                class="govuk-link" rel="external" target="_blank">read the child 
                arrangements guide</a> to see if there’s a more suitable option 
                than going to court. - Welsh`,
  formActionUrl: 'https://www.familymediationcouncil.org.uk/find-local-mediator/ - Welsh',
};

describe('miam->have document signed by mediator or not', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
