import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { YesNoEmpty } from '../../../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../../../app/form/Form';
import { Validator, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, en as enContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Safety concerns',
  physicalAbusePageTitle: 'Briefly describe the physical abuse against the children if you feel able to',
  psychologicalAbusePageTitle: 'Briefly describe the psychological abuse against the children if you feel able to',
  emotionalAbusePageTitle: 'Briefly describe the emotional abuse against the children if you feel able to',
  sexualAbusePageTitle: 'Briefly describe the sexual abuse against the children if you feel able to',
  financialAbusePageTitle: 'Briefly describe the financial abuse against the children if you feel able to',
  introText: `<p class="govuk-body ">Complete this section as best you can. If you don't feel able to discuss the abuse at this stage, you can do so when you speak to Cafcass.</p>
              <p class="govuk-body ">The information that you give will be used in the application. It is not a request for a domestic abuse injunction.</p>
              <p class="govuk-body ">You can <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank">apply for a domestic abuse injunction</a> separately.</p>`,
  warningText:
    'We will share the information that you give in this section with the other person in the case so that they can respond to what you have said.',
  childrenConcernedAboutLabel: 'Which children are you concerned about? (optional)',
  allchildLabel: 'All the children in above application',
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional)',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings.',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date.',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional)',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, consider contacting <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> or <a href="https://www.gov.uk/report-child-abuse-to-local-council" class="govuk-link" rel="external" target="_blank">the social care team at you local council </a>.</p>',
  ongoingBehaviourYesLabel: 'Yes',
  ongoingBehaviourNoLabel: 'No',
  professionalHelpYesLabel: 'Yes',
  professionalHelpNoLabel: 'No',
  seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p><p class="govuk-body">Do not include personal details such as names and addresses.</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">NSPCC guidance</a> if you are unsure how to get help.</p>',
  errors: {
    behaviourDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    behaviourStartDate: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    seekHelpDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  caption: 'Pryderon diogelwch',
  physicalAbusePageTitle:
    "Disgrifiwch yn gryno y cam-drin corfforol yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
  psychologicalAbusePageTitle:
    "Disgrifiwch yn gryno y cam-drin seicolegol yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
  emotionalAbusePageTitle:
    "Disgrifiwch yn gryno y cam-drin emosiynol yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
  sexualAbusePageTitle:
    "Disgrifiwch yn gryno y cam-drin rhywiol yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
  financialAbusePageTitle:
    "Disgrifiwch yn gryno y cam-drin ariannol yn erbyn y plant os ydych chi'n teimlo eich bod yn gallu gwneud hynny",
  introText: `<p class="govuk-body ">Llenwch yr adran hon y gorau y gallwch. Os nad ydych chi'n teimlo eich bod chi'n gallu trafod y gamdriniaeth ar hyn o bryd, gallwch wneud hynny wrth siarad efo Cafcass</p>
  <p class="govuk-body ">Bydd yr wybodaeth y byddwch yn ei rhoi yn cael ei defnyddio yn y cais. Nid yw'n gais am waharddeb cam-drin domestig.</p>
  <p class="govuk-body ">Gallwch<a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank"> wneud cais am waharddeb cam-drin domestig</a> ar wahân</p>`,
  warningText:
    "Byddwn yn rhannu'r wybodaeth y byddwch yn ei rhoi yn yr adran hon gyda'r unigolyn arall yn yr achos er mwyn iddo allu ymateb i'r hyn rydych chi wedi'i ddweud.",
  childrenConcernedAboutLabel: "Pa blant ydych chi'n poeni amdanyn nhw?",
  allchildLabel: 'Pob plentyn yn y cais',
  behaviourDetailsLabel: "Disgrifiwch yr ymddygiadau yr hoffech i'r llys fod yn ymwybodol ohonynt.",
  behaviourDetailsHintText:
    "Cadwch eich ateb yn fyr. Bydd cyfle i chi roi mwy o fanylion i'r llys yn ddiweddarach yn yr achos.",
  behaviourStartDateLabel: 'Pryd ddechreuodd yr ymddygiad hwn a pha mor hir wnaeth hynny barhau?',
  behaviourStartDateHintText: 'Nid oes angen i hyn fod yn union ddyddiad.',
  isOngoingBehaviourLabel: 'Ydy’r ymddygiad yn digwydd ar hyn o bryd?',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Ffoniwch 999 os oes argyfwng. Os nad yw\'n argyfwng, ystyriwch gysylltu â\'r <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> neu\'r <a href="https://www.gov.uk/report-child-abuse-to-local-council" class="govuk-link" rel="external" target="_blank">ttîm gofal cymdeithasol yn eich cyngor  lleol</a>.</p>',
  ongoingBehaviourYesLabel: 'Ydy',
  ongoingBehaviourNoLabel: 'Nac ydy',
  professionalHelpYesLabel: 'Do',
  professionalHelpNoLabel: 'Naddo',
  seekHelpFromPersonOrAgencyLabel: 'Ydych chi erioed wedi gofyn am help gan unigolyn neu asiantaeth broffesiynol?',
  seekHelpFromPersonOrAgencyHintText: "Er enghraifft, siarad â'ch meddyg teulu lleol.",
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Dywedwch wrth bwy wnaethoch chi ofyn am help, a beth wnaethon nhw i helpu (dewisol). </p><p class="govuk-body">Peidiwch â chynnwys manylion personol fel enwau a chyfeiriadau.</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">Gweler <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">cyfarwyddyd NSPCC</a>os nad ydych yn siŵr sut i gael help.</p>',
  errors: {
    behaviourDetails: {
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    behaviourStartDate: {
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    seekHelpDetails: {
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('C1A safetyconcerns > child > report abuse > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      PRL_c1A_safteyConcerns: {
        child: {
          physicalAbuse: {
            childrenConcernedAbout: '',
            behaviourDetails: '',
            behaviourStartDate: '',
            isOngoingBehaviour: YesNoEmpty.YES,
            seekHelpFromPersonOrAgency: YesNoEmpty.NO,
            seekHelpDetails: '',
          },
        },
      },
      children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          value: {
            firstName: 'Bob',
            lastName: 'Silly',
            personalDetails: {
              dateOfBirth: {
                year: '',
                month: '',
                day: '',
              },
              isDateOfBirthUnknown: 'Yes',
              approxDateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              sex: 'Male',
            },
            childMatters: {
              needsResolution: [],
            },
            parentialResponsibility: {
              statement: 'lorem ipsum dolor sit am',
            },
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          abuseType: 'physicalAbuse',
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
    languageAssertions(
      'en',
      {
        ...en,
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      {
        ...cy,
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain report abuse form fields', () => {
    const childrenConcernedAboutDetails = fields.childrenConcernedAbout as FormOptions;
    const behaviourDetails = fields.behaviourDetails as FormOptions;
    const behaviourStartDate = fields.behaviourStartDate as FormOptions;
    const isOngoingBehaviour = fields.isOngoingBehaviour as FormOptions;
    const seekHelpFromPersonOrAgency = fields.seekHelpFromPersonOrAgency as FormOptions;
    const seekHelpDetails = seekHelpFromPersonOrAgency.values[0].subFields!.seekHelpDetails as FormInput;

    expect(childrenConcernedAboutDetails.type).toBe('checkboxes');
    expect((childrenConcernedAboutDetails.label as Function)(generatedContent)).toBe(en.childrenConcernedAboutLabel);
    expect((childrenConcernedAboutDetails.values[0].label as Function)(generatedContent)).toBe(en.allchildLabel);
    expect((childrenConcernedAboutDetails.values[1].divider as Function)(enContent)).toBe('or');
    expect(childrenConcernedAboutDetails.values[2].name).toBe('childrenConcernedAbout');
    expect(childrenConcernedAboutDetails.values[2].label).toBe('Bob Silly');
    expect(childrenConcernedAboutDetails.values[2].value).toBe('7483640e-0817-4ddc-b709-6723f7925474');

    expect(behaviourDetails.type).toBe('textarea');
    expect((behaviourDetails.label as Function)(generatedContent)).toBe(en.behaviourDetailsLabel);
    expect((behaviourDetails.hint as Function)(generatedContent)).toBe(en.behaviourDetailsHintText);
    (behaviourDetails.validator as Validator)('test value');
    expect(isTextAreaValid).toHaveBeenCalledWith('test value');

    expect(behaviourStartDate.type).toBe('textarea');
    expect((behaviourStartDate.label as Function)(generatedContent)).toBe(en.behaviourStartDateLabel);
    expect((behaviourStartDate.hint as Function)(generatedContent)).toBe(en.behaviourStartDateHintText);
    (behaviourStartDate.validator as Validator)('test value');
    expect(isTextAreaValid).toHaveBeenCalledWith('test value');

    expect(isOngoingBehaviour.type).toBe('radios');
    expect((isOngoingBehaviour.label as Function)(generatedContent)).toBe(en.isOngoingBehaviourLabel);
    expect((isOngoingBehaviour.values[0].label as Function)(generatedContent)).toBe(en.ongoingBehaviourYesLabel);
    expect((isOngoingBehaviour.values[0].conditionalText as Function)(generatedContent)).toBe(
      en.isOngoingBehaviourHint
    );
    expect((isOngoingBehaviour.values[1].label as Function)(generatedContent)).toBe(en.ongoingBehaviourNoLabel);

    expect(seekHelpFromPersonOrAgency.type).toBe('radios');
    expect((seekHelpFromPersonOrAgency.label as Function)(generatedContent)).toBe(en.seekHelpFromPersonOrAgencyLabel);
    expect((seekHelpFromPersonOrAgency.hint as Function)(generatedContent)).toBe(en.seekHelpFromPersonOrAgencyHintText);
    expect((seekHelpFromPersonOrAgency.values[0].label as Function)(generatedContent)).toBe(
      en.professionalHelpYesLabel
    );
    expect((seekHelpFromPersonOrAgency.values[1].label as Function)(generatedContent)).toBe(en.professionalHelpNoLabel);
    expect((seekHelpFromPersonOrAgency.values[1].conditionalText as Function)(generatedContent)).toBe(
      en.seekHelpDetailsNoHint
    );

    expect(seekHelpDetails.type).toBe('textarea');
    expect((seekHelpDetails.hint as Function)(generatedContent)).toBe(en.seekHelpDetailsYesHint);
    (seekHelpDetails.validator as Validator)('test value');
    expect(isTextAreaValid).toHaveBeenCalledWith('test value');
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(enContent)).toBe('Continue');
  });
});
