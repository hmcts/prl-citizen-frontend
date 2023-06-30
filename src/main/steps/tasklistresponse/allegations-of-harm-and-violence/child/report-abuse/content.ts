import { Child, PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbuse, YesNoEmpty } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isTextAreaValid } from '../../../../../app/form/validation';
import { getDataShape } from '../../util';
import { generateContent as commonContent } from '../content';
export * from './routeGuard';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    behaviourStartDate: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    seekHelpDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (
  data: PRL_C1ASafteyConcernsAbuse,
  childrenData: Child[]
): GenerateDynamicFormFields => {
  const fields = {
    childrenConcernedAbout: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      labelSize: 's',
      label: l => l.childrenConcernedAboutLabel,
      values: [
        {
          name: 'childrenConcernedAbout',
          label: l => l.allchildLabel,
          value: 'All the children in application',
          exclusive: true,
        },
        {
          divider: l => l.divider,
        },
        ...childrenData.map(childObj => {
          return {
            name: 'childrenConcernedAbout',
            label: `${childObj.value.firstName} ${childObj.value.lastName}`,
            value: `${childObj.value.firstName} ${childObj.value.lastName}`,
          };
        }),
      ],
    },
    behaviourDetails: {
      type: 'textarea',
      labelSize: 's',
      label: l => l.behaviourDetailsLabel,
      hint: l => l.behaviourDetailsHintText,
      value: data.behaviourDetails,
      attributes: {
        rows: 4,
      },
      validator: value => isTextAreaValid(value),
    },
    behaviourStartDate: {
      type: 'textarea',
      labelSize: 's',
      label: l => l.behaviourStartDateLabel,
      hint: l => l.behaviourStartDateHintText,
      value: data.behaviourStartDate,
      attributes: {
        rows: 2,
      },
      validator: value => isTextAreaValid(value),
    },
    isOngoingBehaviour: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.isOngoingBehaviourLabel,
      labelSize: 's',
      values: [
        {
          label: l => l.ongoingBehaviourYesLabel,
          value: YesNoEmpty.YES,
          conditionalText: l => l.isOngoingBehaviourHint,
        },
        {
          label: l => l.ongoingBehaviourNoLabel,
          value: YesNoEmpty.NO,
        },
      ],
    },
    seekHelpFromPersonOrAgency: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.seekHelpFromPersonOrAgencyLabel,
      hint: l => l.seekHelpFromPersonOrAgencyHintText,
      labelSize: 's',
      values: [
        {
          label: l => l.professionalHelpYesLabel,
          value: YesNoEmpty.YES,
          subFields: {
            seekHelpDetails: {
              type: 'textarea',
              value: data.seekHelpDetails,
              hint: l => l.seekHelpDetailsYesHint,
              validator: value => isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.professionalHelpNoLabel,
          value: YesNoEmpty.NO,
          conditionalText: l => l.seekHelpDetailsNoHint,
        },
      ],
    },
  };

  const errors = {
    en: {},
    cy: {},
  };

  // mark the selection for the radio buttons based on the option chosen

  fields.isOngoingBehaviour.values = fields.isOngoingBehaviour.values.map(config =>
    config.value === data.isOngoingBehaviour ? { ...config, selected: true } : config
  );
  fields.seekHelpFromPersonOrAgency.values = fields.seekHelpFromPersonOrAgency.values.map(config =>
    config.value === data.seekHelpFromPersonOrAgency ? { ...config, selected: true } : config
  );

  // mark the selection for the children checkboxes based on the option chosen
  fields.childrenConcernedAbout.values = fields.childrenConcernedAbout.values.map(config =>
    // Checking if the data.childrenConcernedAbout has been prefilled, if YES, data will be fetched from userCase. If NOT, checkboxes are made fresh and untouched
    data.childrenConcernedAbout?.includes(config.value as string) ? { ...config, selected: true } : config
  );

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const getFormFields = (): FormContent => {
  return updatedForm;
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPageTitle = (abuseType: PRL_C1AAbuseTypes, translations: Record<string, any>) => {
  return translations[`${abuseType}PageTitle`];
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const abuseType: PRL_C1AAbuseTypes = content.additionalData!.req.params.abuseType;
  const sessionData: PRL_C1ASafteyConcernsAbuse = content.userCase?.PRL_c1A_safteyConcerns?.child?.[abuseType];
  const sessionChildrenData = content.userCase?.children ?? [];
  const { fields } = generateFormFields(sessionData ?? getDataShape().abuse, sessionChildrenData);

  return {
    ...translations,
    ...commonContent(content),
    title: getPageTitle(abuseType, translations),
    form: updateFormFields(form, fields),
  };
};
