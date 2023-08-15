/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Is there a reason why your request needs to be considered in the next five days?',
  reasonText: 'Give a reason why the court should consider your request urgently',
  hintText: 'For example, if there is an upcoming hearing or deadline set by the court.',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_isThereReasonForUrgentRequest: {
      required: 'Select whether there is a reason why your request needs to be considered in the next five days',
    },
    awp_urgentRequestReason: {
      required: 'Enter the reason why the court should consider this application as a matter of urgency',
    },
  },
};

const cy: typeof en = {
  title: 'Is there a reason why your request needs to be considered in the next five days? (welsh)',
  reasonText: 'Give a reason why the court should consider your request urgently (welsh)',
  hintText: 'For example, if there is an upcoming hearing or deadline set by the court. (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_isThereReasonForUrgentRequest: {
      required:
        'Select whether there is a reason why your request needs to be considered in the next five days (welsh)',
    },
    awp_urgentRequestReason: {
      required: 'Enter the reason why the court should consider this application as a matter of urgency (welsh)',
    },
  },
};

describe('urgent request content', () => {
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
    const isThereReasonForUrgentRequestFields = fields.awp_isThereReasonForUrgentRequest as FormOptions;
    const urgentRequestReasonSubField = isThereReasonForUrgentRequestFields.values[0].subFields
      ?.awp_urgentRequestReason as FormInput;

    expect(isThereReasonForUrgentRequestFields.type).toBe('radios');
    expect((isThereReasonForUrgentRequestFields.values[0].label as Function)(generatedContent)).toBe(en.yes);

    expect(urgentRequestReasonSubField?.type).toBe('textarea');
    expect((urgentRequestReasonSubField?.label as Function)(generatedContent)).toBe(en.reasonText);
    expect((urgentRequestReasonSubField?.hint as Function)(generatedContent)).toBe(en.hintText);

    expect((isThereReasonForUrgentRequestFields.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(isThereReasonForUrgentRequestFields.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
  });
});
