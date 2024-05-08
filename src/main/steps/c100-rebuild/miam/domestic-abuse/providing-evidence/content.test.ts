import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Providing evidence of domestic abuse',
  content: 'You have said that you don’t have to attend MIAM because of the following reasons:',
  yes: 'Yes',
  no: 'No',
  provideEvidence: 'Can you provide evidence?',
  explainNoEvidence: 'Explain why you cannot provide evidence',
  errors: {
    miam_canProvideDomesticAbuseEvidence: {
      required: 'Select yes if you can provide evidence',
    },
    miam_detailsOfDomesticAbuseEvidence: {
      required: 'Explain why you cannot provide evidence',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Darparu tystiolaeth o gam-drin domestig',
  content: 'Rydych wedi dweud nad oes rhaid i chi fynychu MIAM oherwydd y rhesymau canlynol:',
  yes: 'Gallaf',
  no: 'Na allaf',
  provideEvidence: 'Allwch chi ddarparu tystiolaeth?',
  explainNoEvidence: 'Eglurwch pam allwch chi ddim darparu tystiolaeth',
  errors: {
    miam_canProvideDomesticAbuseEvidence: {
      required: 'Dewiswch ‘gallaf’ os gallwch chi ddarparu tystiolaeth',
    },
    miam_detailsOfDomesticAbuseEvidence: {
      required: 'Eglurwch pam allwch chi ddim darparu tystiolaeth',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('C100-rebuild > MIAM >  domestic abuse > providing-evidence', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent({ ...commonContent, language: 'en' }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain miam_haveDocSignedByMediatorForPrevAttendance field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const miam_canProvideDomesticAbuseEvidenceField = fields.miam_canProvideDomesticAbuseEvidence as FormOptions;
    expect((miam_canProvideDomesticAbuseEvidenceField.label as LanguageLookup)(generatedContent)).toBe(
      en.provideEvidence
    );
    expect(miam_canProvideDomesticAbuseEvidenceField.validator).toBe(atLeastOneFieldIsChecked);

    expect((miam_canProvideDomesticAbuseEvidenceField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.yes
    );
    expect((miam_canProvideDomesticAbuseEvidenceField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.no);

    expect(
      (
        miam_canProvideDomesticAbuseEvidenceField.values[1].subFields?.miam_detailsOfDomesticAbuseEvidence
          .label as LanguageLookup
      )(generatedContent)
    ).toBe(en.explainNoEvidence);
    (
      miam_canProvideDomesticAbuseEvidenceField.values[1].subFields?.miam_detailsOfDomesticAbuseEvidence
        .validator as Function
    )('miam_detailsOfEvidence');
    expect(isFieldFilledIn).toHaveBeenCalledWith('miam_detailsOfEvidence');
    expect(isTextAreaValid).toHaveBeenCalledWith('miam_detailsOfEvidence');
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('should generate correct list of abuse reasonse', () => {
    const content = {
      language: 'en',
      userCase: {
        miam_domesticAbuse: ['policeInvolvement', 'letterOfBeingVictim'],
        miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSomeoneArrest', 'evidenceOfConviction'],
        miam_domesticAbuse_letterOfBeingVictim_subfields: ['letterFromHealthProfessional'],
      },
    } as unknown as CommonContent;
    expect(generateContent(content).listOfAbuseReasons).toStrictEqual([
      {
        abuseEvidenceType: 'The police have been involved',
        abuseEvidenceReasons: [
          'Evidence that a party in the application has been arrested for a domestic abuse offence',
          'Evidence of a conviction for a domestic abuse offence',
        ],
      },
      {
        abuseEvidenceType:
          'A letter confirming that you or someone who is a party to the application are (or have been) a victim of domestic abuse',
        abuseEvidenceReasons: ['A letter or report from a health professional'],
      },
    ]);
  });
});
