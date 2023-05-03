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
  YesOptionLabel: 'Yes',
  NoOptionLabel: 'No',
  seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p><p class="govuk-body">Do not include personal details such as names and addresses.</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">NSPCC guidance</a> if you are unsure how to get help.</p>',
  errors: {
    behaviourDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
    },
    behaviourStartDate: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
    },
    seekHelpDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Safety concerns - Welsh',
  physicalAbusePageTitle: 'Briefly describe the physical abuse against the children if you feel able to - Welsh',
  psychologicalAbusePageTitle:
    'Briefly describe the psychological abuse against the children if you feel able to - Welsh',
  emotionalAbusePageTitle: 'Briefly describe the emotional abuse against the children if you feel able to - Welsh',
  sexualAbusePageTitle: 'Briefly describe the sexual abuse against the children if you feel able to - Welsh',
  financialAbusePageTitle: 'Briefly describe the financial abuse against the children if you feel able to - Welsh',
  introText: `<p class="govuk-body ">Complete this section as best you can. If you don't feel able to discuss the abuse at this stage, you can do so when you speak to Cafcass. - Welsh</p>
              <p class="govuk-body ">The information that you give will be used in the application. It is not a request for a domestic abuse injunction. - Welsh</p>
              <p class="govuk-body ">You can <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank">apply for a domestic abuse injunction</a> separately. - Welsh</p>`,
  warningText:
    'We will share the information that you give in this section with the other person in the case so that they can respond to what you have said. - Welsh',
  childrenConcernedAboutLabel: 'Which children are you concerned about? (optional) - Welsh',
  allchildLabel: 'All the children in above application - Welsh',
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. - Welsh (optional)',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings. - Welsh',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? - Welsh (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date. - Welsh',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? - Welsh (optional)',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, consider contacting <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> or <a href="https://www.gov.uk/report-child-abuse-to-local-council" class="govuk-link" rel="external" target="_blank">the social care team at you local council - Welsh </a>.</p>',
  YesOptionLabel: 'Yes - Welsh',
  NoOptionLabel: 'No - Welsh',
  seekHelpFromPersonOrAgencyLabel:
    'Have you ever asked for help from a professional person or agency? - Welsh (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP. - Welsh',
  seekHelpDetailsYesHint:
    '<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p><p class="govuk-body">Do not include personal details such as names and addresses. - Welsh</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/" class="govuk-link" rel="external" target="_blank">NSPCC guidance</a> if you are unsure how to get help. - Welsh</p>',
  errors: {
    behaviourDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
    },
    behaviourStartDate: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
    },
    seekHelpDetails: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
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
          divider: true,
        },
        ...childrenData.map(childObj => {
          return {
            name: 'childrenConcernedAbout',
            label: `${childObj.value.firstName} ${childObj.value.lastName}`,
            value: `${childObj.id}`,
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
          label: l => l.YesOptionLabel,
          value: YesNoEmpty.YES,
          conditionalText: l => l.isOngoingBehaviourHint,
        },
        {
          label: l => l.NoOptionLabel,
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
          label: l => l.YesOptionLabel,
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
          label: l => l.NoOptionLabel,
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
