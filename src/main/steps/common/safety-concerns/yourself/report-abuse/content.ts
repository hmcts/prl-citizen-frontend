import { C1AAbuseTypes, C1ASafteyConcernsAbuse, YesNoEmpty } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isTextAreaValid } from '../../../../../app/form/validation';
import { C100_URL } from '../../../../../steps/urls';
import { getDataShape } from '../../util';
import { generateContent as commonContent } from '../content';
export * from './routeGuard';

const en = () => ({
  caption: 'Safety concerns',
  physicalAbusePageTitle: 'Briefly describe the physical abuse if you feel able to (optional)',
  psychologicalAbusePageTitle: 'Briefly describe the psychological abuse if you feel able to (optional)',
  emotionalAbusePageTitle: 'Briefly describe the emotional abuse if you feel able to (optional)',
  sexualAbusePageTitle: 'Briefly describe the sexual abuse if you feel able to (optional)',
  financialAbusePageTitle: 'Briefly describe the financial abuse if you feel able to (optional)',
  somethingElsePageTitle: 'Briefly describe the abuse if you feel able to (optional)',
  introText: `<p class="govuk-body ">Complete this section as best you can. If you don't feel able to discuss the abuse at this stage, you can do so when you speak to Cafcass.</p>
  <p class="govuk-body ">The information that you give will be used in the application. It is not a request for a domestic abuse injunction.</p>
  <p class="govuk-body ">You can <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank">apply for a domestic abuse injunction</a> separately.</p>`,
  warningText: {
    text: 'We will share the information that you give in this section with the other person in the case (the applicant) so that they can respond to what you have said.',
    iconFallbackText: 'Warning',
  },
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional)',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings.',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date.',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional)',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, <a href="https://www.gov.uk/report-domestic-abuse" class="govuk-link" rel="external" target="_blank">contact one of the suggested agencies</a> to get help or report the behaviour with <a href="https://www.police.uk/" class="govuk-link" rel="external" target="_blank">your local policing team</a>.</p>',
  YesOptionLabel: 'Yes',
  NoOptionLabel: 'No',
  seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
  seekHelpDetailsYesLabel: 'Indicate who you sought help from, and what they did to help (optional).',
  seekHelpDetailsYesHint: '<p class="govuk-body">Do not include personal details such as names and addresses.</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" rel="external" target="_blank">GOV.UK guidance</a> if you are unsure how to get help.</p>',
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

const cy = () => ({
  caption: 'Pryderon am ddiogelwch',
  physicalAbusePageTitle:
    'Disgrifiwch y cam-drin corfforol yn gryno os ydych yn teimlo eich bod yn gallu gwneud hynny (dewisol)',
  psychologicalAbusePageTitle:
    'Disgrifiwch y cam-drin seicolegol yn gryno os ydych yn teimlo eich bod yn gallu gwneud hynny (dewisol)',
  emotionalAbusePageTitle:
    'Disgrifiwch yn gryno y cam-drin emosiynol os ydych yn teimlo eich bod yn gallu gwneud hynny (dewisol)',
  sexualAbusePageTitle:
    'Disgrifiwch y cam-drin rhywiol yn gryno os ydych yn teimlo eich bod yn gallu gwneud hynny (dewisol)',
  financialAbusePageTitle:
    'Disgrifiwch y cam-drin ariannol yn gryno os ydych yn teimlo eich bod yn gallu gwneud hynny (dewisol)',
  somethingElsePageTitle:
    'Disgrifiwch y gamdriniaeth yn gryno os ydych yn teimlo eich bod yn gallu gwneud hynny (dewisol)',
  introText: `<p class="govuk-body ">Llenwch yr adran hon y gorau y gallwch. Os nad ydych chi'n teimlo eich bod chi'n gallu trafod y gamdriniaeth ar hyn o bryd, gallwch wneud hynny wrth siarad efo Cafcass</p>
 <p class="govuk-body">Bydd yr wybodaeth y byddwch yn ei rhoi yn cael ei defnyddio yn y cais. Nid yw'n gais am waharddeb cam-drin domestig.</p>
 <p class="govuk-body"> Gallwch wneud<a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link govuk-link a" rel="external" target="_blank"> cais am waharddeb cam-drin domestig</a> ar wahân</p>`,
  warningText: {
    text: "Byddwn yn rhannu'r wybodaeth y byddwch yn ei rhoi yn yr adran hon gyda'r unigolyn arall yn yr achos er mwyn iddo allu ymateb i'r hyn rydych chi wedi'i ddweud.",
    iconFallbackText: 'Rhybudd',
  },
  behaviourDetailsLabel: "Disgrifiwch yr ymddygiadau yr hoffech i'r llys fod yn ymwybodol ohonynt. (dewisol)",
  behaviourDetailsHintText:
    "Cadwch eich ateb yn fyr. Bydd cyfle i chi roi mwy o fanylion i'r llys yn ddiweddarach yn yr achos.",
  behaviourStartDateLabel: 'Pryd ddechreuodd yr ymddygiad hwn a pha mor hir wnaeth hynny barhau? (dewisol)',
  behaviourStartDateHintText: 'Nid oes angen i hyn fod yn union ddyddiad.',
  isOngoingBehaviourLabel: "Ydy'r ymddygiad yn parhau? (dewisol)",
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">CFfoniwch 999 os oes argyfwng. Os nad yw\'n argyfwng, ystyriwch gysylltu â\'r <a href="https://www.nspcc.org.uk" class="govuk-link" rel="external" target="_blank">NSPCC</a> neu\'r <a href="https://www.gov.uk/report-child-abuse-to-local-council" class="govuk-link" rel="external" target="_blank">tîm gofal cymdeithasol yn eich cyngor  lleol</a>.</p>',
  YesOptionLabel: 'Do',
  NoOptionLabel: 'Naddo',
  seekHelpFromPersonOrAgencyLabel:
    'Ydych chi erioed wedi gofyn am help gan unigolyn neu asiantaeth broffesiynol? (dewisol)',
  seekHelpFromPersonOrAgencyHintText: "Er enghraifft, siarad â'ch meddyg teulu lleol.",
  seekHelpDetailsYesLabel: 'Dywedwch wrth bwy wnaethoch chi ofyn am help, a beth wnaethon nhw i helpu (dewisol).',
  seekHelpDetailsYesHint: '<p class="govuk-body">Peidiwch â chynnwys manylion personol fel enwau a chyfeiriadau.</p>',
  seekHelpDetailsNoHint:
    '<p class="govuk-body">Gweler <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" rel="external" target="_blank">cyfarwyddyd GOV.UK </a>os nad ydych yn siŵr sut i gael help.</p>',
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

export const generateFormFields = (data: C1ASafteyConcernsAbuse): GenerateDynamicFormFields => {
  const fields = {
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
              label: l => l.seekHelpDetailsYesLabel,
              labelSize: 'xs',
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

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const getFormFields = (req: AppRequest, abuseType: C1AAbuseTypes): FormContent => {
  const C100RebuildJourney = req.originalUrl.startsWith(C100_URL);
  const sessionData: C1ASafteyConcernsAbuse = C100RebuildJourney
    ? req.session.userCase?.c1A_safteyConcerns?.applicant?.[abuseType]
    : req.session.userCase?.c1A_safteyConcerns?.respondent?.[abuseType];

  return updateFormFields(form, generateFormFields(sessionData ?? getDataShape().abuse).fields);
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPageTitle = (abuseType: C1AAbuseTypes, translations: Record<string, any>) => {
  return translations[`${abuseType}PageTitle`];
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const C100RebuildJourney = content.additionalData!.req.originalUrl.startsWith(C100_URL);
  const abuseType: C1AAbuseTypes = content.additionalData!.req.params.abuseType;
  const sessionData: C1ASafteyConcernsAbuse = C100RebuildJourney
    ? content.userCase?.c1A_safteyConcerns?.applicant?.[abuseType]
    : content.userCase?.c1A_safteyConcerns?.respondent?.[abuseType];
  const { fields } = generateFormFields(sessionData ?? getDataShape().abuse);
  if (C100RebuildJourney) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });
  }
  return {
    ...translations,
    ...commonContent(content),
    title: getPageTitle(abuseType, translations),
    form: updateFormFields(form, fields),
  };
};
