import { DocCategory, DocType } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant -> upload-document -> document-sharing-details', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: { userCase: { id: '1234' } },
        params: {
          documentCategory: DocCategory.WITNESS_STATEMENT,
          docType: DocType.YOUR_WITNESS_STATEMENTS,
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

  test('should return correct english content', () => {
    expect(generatedContent.cardTitle).toEqual('Before you submit a document');
    expect(generatedContent.cardContent).toEqual(
      'Remove or cross out with a pen any confidential details or personal contact information you want to keep private so they are no longer visible.'
    );
    expect(generatedContent.bodyContent).toEqual(
      'If your contact details have changed, go to <a href="/applicant/confirm-contact-details/checkanswers" class="govuk-link" target="_self">confirm or edit your contact details</a> to update them.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.cardTitle).toEqual('Cyn ichi gyflwyno dogfen');
    expect(generatedContent.cardContent).toEqual(
      "Dilëwch neu croeswch allan gyda beiro unrhyw fanylion cyfrinachol neu wybodaeth gyswllt bersonol yr ydych eisiau ei chadw'n breifat fel nad ydynt bellach yn weladwy."
    );
    expect(generatedContent.bodyContent).toEqual(
      'Os yw\'ch manylion cyswllt wedi newid, ewch i <a href="/applicant/confirm-contact-details/checkanswers" class="govuk-link" target="_self">gadarnhau neu olygu eich manylion cyswllt</a> i\'w diweddaru.'
    );
  });

  test('should contain continue button', () => {
    expect(form.onlyContinue.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain correct cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/case/1234');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
