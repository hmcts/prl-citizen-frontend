import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
//import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Previous MIAM attendance or NCDR',
  content: 'You must provide evidence that you’ve previously attended a MIAM or NCDR.',
  haveDocSignedByMediatorForPrevAttendance: 'Do you have a document signed by a mediator?',
  yes: 'Yes',
  no: 'No',
  detailsOfEvidence: 'Provide details of MIAM attendance',
  detailsOfEvidenceHint:
    'If you are the respondent in existing proceedings, provide the date of the MIAM alongside the name and contact details of the mediator.',
  errors: {
    miam_haveDocSignedByMediatorForPrevAttendance: {
      required: 'Select yes if you have a document signed by a mediator',
    },
    miam_detailsOfEvidence: {
      required: 'Provide details of MIAM attendance',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Eisoes wedi mynychu MIAM neu NCDR',
  content: 'Mae’n rhaid i chi ddarparu tystiolaeth eich bod eisoes wedi mynychu MIAM neu NCDR.',
  haveDocSignedByMediatorForPrevAttendance: 'A oes gennych chi ddogfen wedi’i llofnodi gan gyfryngwr?',
  yes: 'Oes',
  no: '	Nac oes',
  detailsOfEvidence: 'Darparu manylion o fynychu MIAM',
  detailsOfEvidenceHint:
    'Os mai chi yw’r atebydd yn yr achos sydd ar y gweill, rhowch ddyddiad y MIAM yn ogystal ag enw a manylion cyswllt y cyfryngwr.',
  errors: {
    miam_haveDocSignedByMediatorForPrevAttendance: {
      required: 'Dewiswch ‘Oes’ os oes gennych chi ddogfen wedi’i llofnodi gan gyfryngwr',
    },
    miam_detailsOfEvidence: {
      required: 'Darparu manylion o fynychu MIAM',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Miam Upload-should return english content', () => {
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
    const haveDocSignedByMediatorForPrevAttendanceField =
      fields.miam_haveDocSignedByMediatorForPrevAttendance as FormOptions;
    expect((haveDocSignedByMediatorForPrevAttendanceField.label as LanguageLookup)(generatedContent)).toBe(
      en.haveDocSignedByMediatorForPrevAttendance
    );
    expect(haveDocSignedByMediatorForPrevAttendanceField.validator).toBe(atLeastOneFieldIsChecked);

    expect((haveDocSignedByMediatorForPrevAttendanceField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.yes
    );
    expect((haveDocSignedByMediatorForPrevAttendanceField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.no
    );

    expect(
      (
        haveDocSignedByMediatorForPrevAttendanceField.values[1].subFields?.miam_detailsOfEvidence
          .label as LanguageLookup
      )(generatedContent)
    ).toBe(en.detailsOfEvidence);
    expect(
      (
        haveDocSignedByMediatorForPrevAttendanceField.values[1].subFields?.miam_detailsOfEvidence.hint as LanguageLookup
      )(generatedContent)
    ).toBe(en.detailsOfEvidenceHint);
    (haveDocSignedByMediatorForPrevAttendanceField.values[1].subFields?.miam_detailsOfEvidence.validator as Function)(
      'miam_detailsOfEvidence'
    );
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
});
