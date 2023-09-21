import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: ' ',
  label: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  label: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  one: 'Do',
  two: 'Naddo',
  continue: 'Parhau',
  errors: {
    start: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: { userCase: { id: '1234' } },
        params: {
          documentCategory: DocCategory.WITNESS_STATEMENT,
          docType: DocType.POSITION_STATEMENTS,
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.label).toEqual('Has the court asked for this document?');
    expect(generatedContent.section).toEqual(' ');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have other people witness for witness statements', () => {
    const commonContentOther = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.OTHER_PEOPLE_WITNESS_STATEMENTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContentOther));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have media files for witness statements', () => {
    const commonContent1 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.MEDIA_FILES,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent1));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have medical records for witness statements', () => {
    const commonContent2 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.MEDICAL_RECORDS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent2));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have letters from school for witness statements', () => {
    const commonContent3 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.LETTERS_FROM_SCHOOL,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent3));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have tencancy docs for witness statements', () => {
    const commonContent4 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.TENANCY_AND_MORTGAGE_AVAILABILITY,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent4));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have doc category only  for witness statements', () => {
    const commonContent5 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.WITNESS_STATEMENT,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent5));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have previous orders for applications', () => {
    const commonContent6 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.APPLICATIONS,
            docType: DocType.PREVIOUS_ORDERS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent6));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have previous orders only  for applications', () => {
    const commonContent7 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.APPLICATIONS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent7));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have other docs for other docs', () => {
    const commonContent8 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.OTHER_DOCUMENTS,
            docType: DocType.OTHER_DOCUMENTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent8));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have other docs only as doc category for other docs', () => {
    const commonContent9 = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.OTHER_DOCUMENTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContent9));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have medical reports for expert reports', () => {
    const commonContentMed = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.EXPERT_REPORTS,
            docType: DocType.MEDICAL_REPORTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContentMed));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have paternity reports for expert reports', () => {
    const commonContentPat = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.EXPERT_REPORTS,
            docType: DocType.PATERNITY_TEST_REPORTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContentPat));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have drug alchohol for expert reports', () => {
    const commonContentDrug = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.EXPERT_REPORTS,
            docType: DocType.DRUG_ALCOHOL_TESTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContentDrug));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have police reports for expert reports', () => {
    const commonContentPol = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.EXPERT_REPORTS,
            docType: DocType.POLICE_REPORTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContentPol));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should have only doc category for expert reports', () => {
    const commonContentExp = {
      language: 'en',
      additionalData: {
        req: {
          session: { userCase: { id: '1234' } },
          params: {
            documentCategory: DocCategory.EXPERT_REPORTS,
          },
        },
      },
    } as unknown as CommonContent;
    languageAssertions('en', en, () => generateContent(commonContentExp));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.start as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
