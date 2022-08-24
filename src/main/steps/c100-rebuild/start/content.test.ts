import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';
import { generateContent } from './content';

const en = {
  caption: 'Getting started',
  headingTitle: `What you’ll need to complete your application`,
  subTitle1: 'You will need to have:',
  subTitle2: 'You may also need:',
  paraGraph1: `If you are applying for an order to formalise an arrangement (a consent order)
   make sure  that you have a written and signed agreement with the respondent in place, before you start the application.`,
  paraGraph2: `You can still complete the application 
  if you do not have all of the details - but it will likely take longer to process.`,
  paraGraph3: `If you are currently involved in Child Arrangements, 
  Prohibited Steps or Specific Issue Order proceedings for the same child or children, 
  you can apply to the same court using the shorter form C2. Please make sure you state the case number when you submit the form.`,
  paraGraph4: `You will need to pay the court fee of £232 before your application can be processed. 
  You may be able to get help with making this payment. 
  See the guidance on <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link app-link--inverted" target="_blank" rel="external">help with fees</a>.`,
  btnText:'Continue',
  btnLinkText: 'Go back',
  firstList: [
    'details of the other people in the case (the respondents), including their contact details, address and date of birth',
    `the children's details, including date of birth`,
    'details of any previous family court cases',
    'solicitor details (if you have asked one to represent you)',
    `a signed document confirming your mediation information and assessment meeting (MIAM) attendance (unless you are exempt)`
  ],
  secondList: [
    'a written agreement for the court to formalise, if you are applying for a consent order',
    `documentation for the <a href="https://www.gov.uk/litigation-friend/apply" class="govuk-link app-link--inverted" target="_blank" rel="external">litigation friend</a> if any of the people making the application are under 18 years old`
  ],
};

const cy = {
  caption: 'Getting started - welsh',
  headingTitle: `What you’ll need to complete your application - welsh`,
  subTitle1: 'You will need to have: - welsh',
  subTitle2: 'You may also need: - welsh',
  paraGraph1: `If you are applying for an order to formalise an arrangement (a consent order)
   make sure  that you have a written and signed agreement with the respondent in place, before you start the application. - welsh`,
  paraGraph2: `You can still complete the application 
  if you do not have all of the details - but it will likely take longer to process. - welsh`,
  paraGraph3: `If you are currently involved in Child Arrangements, 
  Prohibited Steps or Specific Issue Order proceedings for the same child or children, 
  you can apply to the same court using the shorter form C2. Please make sure you state the case number when you submit the form. - welsh`,
  paraGraph4: `You will need to pay the court fee of £232 before your application can be processed. 
  You may be able to get help with making this payment. 
  See the guidance on <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link app-link--inverted" target="_blank" rel="external">help with fees</a>. - welsh`,
  btnText:'Continue - welsh',
  btnLinkText: 'Go back - welsh',
  firstList: [
    'details of the other people in the case (the respondents), including their contact details, address and date of birth - welsh',
    `the children's details, including date of birth - welsh`,
    'details of any previous family court cases - welsh',
    'solicitor details (if you have asked one to represent you) - welsh',
    `a signed document confirming your mediation information and assessment meeting (MIAM) attendance (unless you are exempt) - welsh`
  ],
  secondList: [
    'a written agreement for the court to formalise, if you are applying for a consent order - welsh',
    `documentation for the <a href="https://www.gov.uk/litigation-friend/apply" class="govuk-link app-link--inverted" target="_blank" rel="external">litigation friend</a> if any of the people making the application are under 18 years old - welsh`
  ],
};
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
