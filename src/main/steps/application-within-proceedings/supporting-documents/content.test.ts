/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Do you have supporting documents to upload?',
  canShowProof:
    'If you can show you have proof the other person in the case agrees to your request or you have any other supporting documents, you can upload them here.',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_hasSupportingDocuments: {
      required: 'Select whether you have supporting documents to upload',
    },
  },
};

const cy: typeof en = {
  title: 'A oes gennych chi ddogfennau ategol i’w huwchlwytho?',
  canShowProof:
    'Os gallwch ddangos bod gennych brawf bod yr unigolyn arall yn yr achos yn cytuno â’ch cais neu os oes gennych unrhyw ddogfennau ategol eraill, gallwch eu huwchlwytho yma.',
  yes: 'Oes',
  no: 'Nac oes',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_hasSupportingDocuments: {
      required: 'Dewiswch p’un a oes gennych chi ddogfennau ategol i’w huwchlwytho',
    },
  },
};

describe('supporting documents content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          partyType: 'applicant',
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
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain help with fees form fields', () => {
    const supportingDocumentsField = fields.awp_hasSupportingDocuments as FormOptions;

    expect(supportingDocumentsField.type).toBe('radios');
    expect((supportingDocumentsField.label as Function)(generatedContent)).toBe(en.canShowProof);
    expect((supportingDocumentsField.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((supportingDocumentsField.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(supportingDocumentsField.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/applicant/application-within-proceedings/list-of-applications/1');
  });
});
