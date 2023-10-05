/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Inform the other parties in the case',
  reasonCantBeInformed:
    "If there is a reason the other parties in this case cannot be informed about the application, the court may need to consider it without their involvement. This is known as 'without notice'.",
  needToAsk: 'We need to ask this question as it may determine the court fees you need to pay.',
  informOtherPartieslabel: 'Can the other parties in the case be informed about this application?',
  cantBeInformedLabel: 'Give a reason why the other parties cannot be informed',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_informOtherParties: {
      required: 'Select whether the other parties in the case can be informed about this application',
    },
    awp_reasonCantBeInformed: {
      required: 'Give a reason why the other parties in the case cannot be informed of this application',
    },
  },
};

const cy: typeof en = {
  title: 'Inform the other parties in the case (welsh)',
  reasonCantBeInformed:
    "If there is a reason the other parties in this case cannot be informed about the application, the court may need to consider it without their involvement. This is known as 'without notice'. (welsh)",
  needToAsk: 'We need to ask this question as it may determine the court fees you need to pay. (welsh)',
  informOtherPartieslabel: 'Can the other parties in the case be informed about this application? (welsh)',
  cantBeInformedLabel: 'Give a reason why the other parties cannot be informed (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_informOtherParties: {
      required: 'Select whether the other parties in the case can be informed about this application (welsh)',
    },
    awp_reasonCantBeInformed: {
      required: 'Give a reason why the other parties in the case cannot be informed of this application (welsh)',
    },
  },
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
    const informOtherPartiesFields = fields.awp_informOtherParties as FormOptions;
    const reasonCantBeInformedSubField = informOtherPartiesFields.values[1].subFields
      ?.awp_reasonCantBeInformed as FormInput;

    expect(informOtherPartiesFields.type).toBe('radios');
    expect((informOtherPartiesFields.label as Function)(generatedContent)).toBe(en.informOtherPartieslabel);

    expect((informOtherPartiesFields.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((informOtherPartiesFields.values[1].label as Function)(generatedContent)).toBe(en.no);

    expect(reasonCantBeInformedSubField?.type).toBe('textarea');
    expect((reasonCantBeInformedSubField?.label as Function)(generatedContent)).toBe(en.cantBeInformedLabel);

    expect(reasonCantBeInformedSubField.validator).toBe(isFieldFilledIn);
    expect(informOtherPartiesFields.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
