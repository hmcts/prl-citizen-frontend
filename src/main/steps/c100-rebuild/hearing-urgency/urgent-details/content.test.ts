import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { generateContent } from '../../hearing-urgency/urgent-details/content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Tell us about your situation',
  reasonForUrgentHearing: 'Reason you are asking for an urgent hearing',
  riskOfSafety: "Risk to my safety or the children's safety",
  riskOfChildAbduction: 'Risk that the children will be abducted',
  overseasLegalProceeding: 'Legal proceedings taking place overseas',
  otherRisks: 'Other risks',
  giveDetailsOtherRisks: 'Give details of the risk in your case',
  giveDetailsOtherRisksHint:
    'The court will only give you an earlier hearing date if there are risk factors in your case. Otherwise, your request will be rejected.',
  timeOfHearing: 'How soon do you need the hearing to take place?',
  hearingWithNext48Hrs: 'Do you need a hearing within the next 48 hours?',
  hearingWithNext48HrsDetails: 'What have you done to inform the respondents of your application?',
  hearingWithNext48HrsDetailsHint:
    'If you have not told the respondents, please explain why. The court will need you to give a good reason.',
  one: 'Yes',
  two: 'No',

  errors: {
    hu_reasonOfUrgentHearing: {
      required: 'Select the reason why you are asking for an urgent hearing',
    },
    hu_otherRiskDetails: {
      required: 'Give details of the risk in your case that support your need for an urgent hearing',
    },
    hu_timeOfHearingDetails: {
      required: 'Enter how soon you need the hearing to take place',
    },
    hu_hearingWithNext48HrsDetails: {
      required: 'Select yes if you need a hearing within the next 48 hours',
    },
    hu_hearingWithNext48HrsMsg: {
      required: 'Provide details of what you have done to inform the respondents of your application',
    },
  },
};

const cy = {
  title: 'Dywedwch wrthym am eich sefyllfa',
  reasonForUrgentHearing: 'Eich rheswm dros ofyn am wrandawiad brys',
  riskOfSafety: 'Mae fy niogelwch i neu ddiogelwch fy mhlant mewn perygl',
  riskOfChildAbduction: 'Perygl o herwgipio’r plant',
  overseasLegalProceeding: 'Achos cyfreithiol yn mynd rhagddo dramor',
  otherRisks: 'Risgiau eraill',
  giveDetailsOtherRisks: 'Rhowch fanylion y risg yn eich achos',
  giveDetailsOtherRisksHint:
    'Dim ond os oes ffactorau risg yn eich achos y bydd y llys yn rhoi dyddiad gwrandawiad cynharach ichi. Fel arall, gwrthodir eich cais.',
  timeOfHearing: 'Pa mor fuan y mae angen cynnal y gwrandawiad?',
  hearingWithNext48Hrs: 'A oes angen gwrandawiad o fewn y 48 awr nesaf?',
  hearingWithNext48HrsDetails: 'Beth ydych chi wedi ei wneud i hysbysu’r atebwyr ynglŷn â’ch cais?',
  hearingWithNext48HrsDetailsHint:
    'Os nad ydych wedi dweud wrth yr atebwyr, eglurwch pam. Bydd y llys yn disgwyl ichi roi rheswm da.',
  one: 'Do',
  two: 'Naddo',

  errors: {
    hu_reasonOfUrgentHearing: {
      required: 'Dewiswch y rhesymau pam rydych yn gofyn am wrandawiad brys',
    },
    hu_otherRiskDetails: {
      required: "Rhowch fanylion y risg sy'n cefnogi'ch angen am wrandawiad brys",
    },
    hu_timeOfHearingDetails: {
      required: "Nodwch pa mor fuan y mae angen i'r gwrandawiad gael ei gynnal",
    },
    hu_hearingWithNext48HrsDetails: {
      required: 'Dewiswch oes os oes angen gwrandawiad arnoch o fewn y 48 awr nesaf',
    },
    hu_hearingWithNext48HrsMsg: {
      required: "Darparwch fanylion yr hyn rydych chi wedi'i wneud i hysbysu’r atebwyr yn eich cais",
    },
  },
};
describe('Urgent Hearing', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

  test('should contain urgent hearing fields', () => {
    const hearingUrgencyCheck = fields.hu_reasonOfUrgentHearing as FormOptions;
    expect(hearingUrgencyCheck.type).toBe('checkboxes');
    expect((hearingUrgencyCheck.values[0].label as LanguageLookup)(generatedContent)).toBe(en.riskOfSafety);
    expect((hearingUrgencyCheck.values[1].label as LanguageLookup)(generatedContent)).toBe(en.riskOfChildAbduction);
    expect((hearingUrgencyCheck.values[2].label as LanguageLookup)(generatedContent)).toBe(en.overseasLegalProceeding);
    expect((hearingUrgencyCheck.values[3].label as LanguageLookup)(generatedContent)).toBe(en.otherRisks);

    const hearingUrgencyRiskDetails = fields.hu_otherRiskDetails as FormOptions;
    expect(hearingUrgencyRiskDetails.type).toBe('textarea');
    expect((hearingUrgencyRiskDetails.label as LanguageLookup)(generatedContent)).toBe(en.giveDetailsOtherRisks);

    const hearingUrgencytimeOfHearingDetails = fields.hu_timeOfHearingDetails as FormOptions;
    expect(hearingUrgencytimeOfHearingDetails.type).toBe('text');
    expect((hearingUrgencytimeOfHearingDetails.label as LanguageLookup)(generatedContent)).toBe(en.timeOfHearing);

    const hu_hearingWithNext48HrsDetails = fields.hu_hearingWithNext48HrsDetails as FormOptions;
    expect(hu_hearingWithNext48HrsDetails.type).toBe('radios');
    expect((hu_hearingWithNext48HrsDetails.label as LanguageLookup)(generatedContent)).toBe(en.hearingWithNext48Hrs);
  });

  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
