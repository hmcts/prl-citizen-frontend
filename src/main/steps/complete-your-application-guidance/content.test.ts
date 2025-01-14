import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../app/form/Form';
import { CommonContent, generatePageContent } from '../common/common.content';
import { interpolate } from '../common/string-parser';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Completing your application',
  paragraphs: [
    'You can complete this application online or by post.',
    'At the end of the application process you will need to pay a court fee of £{feeAmount}.',
    'The payment will be taken at the end of the process, when you submit your application.',
  ],
  helpPayingCourtFeesSubHeading: 'Get help paying court fees',
  courtFeesParagraphs: [
    'You may be able to get help with some or all of your court fees depending on your savings, income and benefits.',
    'If you apply for help with fees a payment will not be taken when you submit the application.',
    "<p class='govuk-body'> Check the <a href='https://www.gov.uk/get-help-with-court-fees' class='govuk-link' rel='external' target='_blank'>help with fees guidance on GOV.UK</a> to find out if you meet the criteria and apply for support.</p>",
  ],
  cancel: 'Cancel',
};

const cy = {
  title: 'Cwblhau eich cais',
  paragraphs: [
    'Gallwch gwblhau’r cais hwn ar-lein neu ei anfon drwy’r post.',
    'Ar ddiwedd y broses gwneud cais bydd angen ichi dalu ffi’r llys o £{feeAmount}.',
    'Fe gymerir y taliad ar ddiwedd y broses, pan fyddwch yn cyflwyno eich cais.',
  ],
  helpPayingCourtFeesSubHeading: 'Help i dalu ffioedd llys',
  courtFeesParagraphs: [
    'Efallai y gallwch gael help gyda rhywfaint o’ch ffioedd llys neu’r holl ffioedd yn dibynnu ar eich cynilion, eich incwm a’ch budd-daliadau.',
    'Os byddwch yn gwneud cais am help i dalu ffioedd ni chymerir y taliad pan fyddwch yn cyflwyno’r cais.',
    "<p class='govuk-body'> Cyfeiriwch at y cyfarwyddyd ar <a href='https://www.gov.uk/get-help-with-court-fees' class='govuk-link' rel='external' target='_blank'>help i dalu ffioedd ar GOV.UK</a> i weld os ydych yn bodloni’r meini prawf ac i wneud cais am gymorth. </p>",
  ],
  cancel: 'Canslo',
};

describe('complete-your-application-guidance > content', () => {
  const commonContent = { language: 'en', userCase: { c100ApplicationFees: '232' } } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    en.paragraphs[1] = interpolate(en.paragraphs[1], {
      feeAmount: '232',
    });
    cy.paragraphs[1] = interpolate(cy.paragraphs[1], {
      feeAmount: '232',
    });
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generatedContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain submit button', () => {
    expect(form.submit.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });
});
