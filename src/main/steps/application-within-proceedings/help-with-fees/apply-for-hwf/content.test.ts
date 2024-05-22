/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const applicationType = 'C2';
const enReasonText = 'ask to delay or cancel a hearing date';
const cyReasonText = 'gohirio neu ganslo dyddiad gwrandawiad';

const en = {
  title: 'Apply for help with fees',
  applyBefore: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  listItems: [
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a>',
    `Enter ${applicationType} when you are asked to enter a court or tribunal number`,
    'Complete the help with fees application',
    `Return to complete your ${applicationType} application to ${enReasonText}`,
    'Enter your help with fees reference number',
  ],
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

const cy: typeof en = {
  title: 'Gwneud cais am help i dalu ffioedd',
  applyBefore: 'Mae’n rhaid i chi wneud cais am Help i Dalu Ffioedd cyn i chi gyflwyno’ch cais.',
  nextSteps: 'Y camau nesaf',
  listItems: [
    'Ewch i <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">Gwneud Cais am Help i Dalu Ffioedd (yn agor mewn tab newydd)</a>',
    `Rhowch ${applicationType} pan ofynnir i chi roi rhif llys neu dribiwnlys`,
    'Cwblhewch y cais am Help i Dalu Ffioedd',
    `Dychwelwch eich cais ${applicationType} i ${cyReasonText}`,
    'Rhowch eich cyfeirnod Help i Dalu Ffioedd',
  ],
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
};

describe('help with fees content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        session: {
          userCase: {
            id: '1234',
            caseTypeOfApplication: 'FL401',
            caseInvites: [],
            respondents: '',
            respondentsFL401: '',
          },
          user: {
            id: '1234',
          },
        },
      },
    },
  } as unknown as CommonContent;

  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
