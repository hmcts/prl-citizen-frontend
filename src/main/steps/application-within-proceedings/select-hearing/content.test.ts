/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput } from '../../../app/form/Form';
import { isValidOption } from '../../../app/form/validation';
import { CommonContent, en as enContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Which hearing are you applying to delay or cancel?',
  caption: 'Delay or cancel a hearing date',
  cancel: 'Cancel',
  selectHearingLabel: 'Select the hearing',
  selectHearingDropdownDefaultLabel: '-- Select a value --',
  urgentFlag: 'Urgent',
  errors: {
    awp_cancelDelayHearing: {
      notSelected: 'Select the hearing you want to delay or cancel',
    },
  },
};

const cy: typeof en = {
  title: 'Pa wrandawiad ydych chi’n gwneud cais i’w ohirio neu ei ganslo?',
  caption: 'Gohirio neu ganslo dyddiad gwrandawiad',
  cancel: 'Canslo',
  selectHearingLabel: 'Dewiswch y gwrandawiad',
  selectHearingDropdownDefaultLabel: '-- Dewiswch y gwerth',
  urgentFlag: 'Urgent - welsh',
  errors: {
    awp_cancelDelayHearing: {
      notSelected: 'Dewiswch y gwrandawiad rydych eisiau ei ohirio neu ei ganslo',
    },
  },
};

describe('select hearing content', () => {
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
            hearingCollection: [
              {
                hearingType: 'ABA5-FOF',
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: '2023-07-13T10:55:47.329703',
                urgentFlag: true,
              },
              {
                hearingType: 'ABA5-FOF',
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: '2023-07-14T10:55:47.329703',
                urgentFlag: true,
              },
              {
                hearingType: 'ABA5-FOF',
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: '2023-07-23T10:55:47.329703',
                urgentFlag: false,
              },
              {
                hearingType: 'ABA5-FOF',
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: '2023-08-1T10:55:47.329703',
                urgentFlag: false,
              },
            ],
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

  const hearingOptions = [
    { selected: true, text: '-- Select a value --', value: '' },
    { selected: false, text: 'Finding of Fact-13/07/2023', value: 'ABA5-FOF-2023-07-13T10:55:47.329703' },
    { selected: false, text: 'Finding of Fact-14/07/2023', value: 'ABA5-FOF-2023-07-14T10:55:47.329703' },
    { selected: false, text: 'Finding of Fact-23/07/2023', value: 'ABA5-FOF-2023-07-23T10:55:47.329703' },
    { selected: false, text: 'Finding of Fact-01/08/2023', value: 'ABA5-FOF-2023-08-1T10:55:47.329703' },
  ];

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

  test('should contain select hearing form fields', () => {
    const selectHearingFields = fields.awp_cancelDelayHearing as FormInput;

    expect(selectHearingFields.type).toBe('select');
    expect((selectHearingFields.label as Function)(generatedContent)).toBe(en.selectHearingLabel);
    expect((selectHearingFields.options as Function)(generatedContent)).toStrictEqual(hearingOptions);
    expect(selectHearingFields.validator).toBe(isValidOption);
  });

  test('should contain continue button', () => {
    expect(form?.onlycontinue?.text(generatePageContent({ language: 'en' }))).toBe(enContent.onlycontinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
  });

  test('should return correct hearing options when hearingCollection is undefined', () => {
    commonContent.additionalData!.req.session.userCase.hearingCollection = undefined;
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
    expect((fields.awp_cancelDelayHearing.options as Function)(generatedContent)).toStrictEqual([
      {
        selected: true,
        text: '-- Select a value --',
        value: '',
      },
    ]);
  });
});
