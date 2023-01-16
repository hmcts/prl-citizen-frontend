/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
  title: 'Attending a Mediation Information and Assessment Meeting MIAM',
  paragraph1:
    'Before completing this application you’re legally required to attend a Mediation Information and Assessment Meeting (MIAM), unless <a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" aria-label=" you’re exempt."> you’re exempt.</a>',
  paragraph2:
    'A <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> is a meeting where you\'ll be given information about <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" class="govuk-link" target="_blank" aria-label="mediation,"> mediation,</a> and other ways to reach an agreement without going to court. A mediator will discuss with you whether these options are suitable for your case.',
  legalAidLink:
    '<a href="https://www.gov.uk/check-legal-aid" class="govuk-link" target="_blank" aria-label="Check if you’re eligible for legal aid during mediation">Check if you’re eligible for legal aid during mediation</a>',
  miamMeeting:
    'A <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> is a one-off meeting and not the same as mediation.',
  miamHeading1: 'What happens at a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamHeading2: 'If you’ve already attended a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamHeading3:
    'When you don’t have to attend a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamList: [
    'how mediation works',
    'the benefits of mediation',
    'whether mediation is right for you',
    'the likely costs',
    'if you may qualify for help with the costs of mediation and legal advice',
    'other options you could use to help you reach an agreement',
  ],
  line1: 'At the <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> a mediator will explain:',
  line2:
    'Your mediator will also discuss the <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" target="_blank" aria-label="Family Mediation Voucher Scheme">Family Mediation Voucher Scheme</a> with you if you are eligible.',
  line3Link:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank" aria-label="Find a mediator to book a MIAM">Find a mediator to book a MIAM</a>',
  line4:
    'You should have a document signed by the mediator confirming this. You need to upload this document to your application.',
  line5:
    'You do not have to attend a <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> if you have a valid reason. For example, you or the children are at risk of harm.',
  line6Link:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" aria-label="List of valid reasons for not attending a MIAM">List of valid reasons for not attending a MIAM</a>',
  miamLabel: 'Attending a MIAM',
  miamConsentStatement: 'I understand that I have to attend a MIAM or provide a valid reason for not attending.',
  errors: {
    miam_consent: {
      required:
        'Confirm that you understand that you have to attend a MIAM or provide a valid reason for not attending.',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  title: 'Mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
  paragraph1:
    'Cyn gallu cwblhau’r cais hwn, mae  gofyniad cyfreithiol i chi fynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM), oni <a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" aria-label=" you’re exempt.">bai eich bod wedi\'ch heithrio.</a>',
  paragraph2:
    'Cyfarfod lle byddwch yn cael gwybodaeth am <a href="https://helpwithchildarrangements.service.justice.gov.uk/professional-mediation" class="govuk-link" target="_blank" aria-label="mediation,">gyfryngu</a> yw <abbr title="Mediation Information and Assessment Meeting"> MIAM</abbr>, a ffyrdd eraill o ddod i gytundeb heb fynd i\'r llys. Bydd cyfryngwr yn trafod gyda chi a yw\'r opsiynau hyn yn addas ar gyfer eich achos.',
  legalAidLink:
    '<a href="https://www.gov.uk/check-legal-aid" class="govuk-link" target="_blank" aria-label="Check if you’re eligible for legal aid during mediation">Gwiriwch a ydych yn gymwys i gael cymorth cyfreithiol yn ystod cyfryngu</a>',
  miamMeeting:
    'Cyfarfod un tro yw <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> ac nid yw yr un fath â chyfryngu.',
  miamHeading1: "Beth sy'n digwydd mewn  <abbr title='Mediation Information and Assessment Meeting'>MIAM</abbr> ",
  miamHeading2: 'Os ydych eisoes wedi mynychu <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>',
  miamHeading3:
    'Pan nad oes rhaid i chi fynychu <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr> ',
  miamList: [
    'sut mae cyfryngu yn gweithio',
    'manteision cyfryngu',
    'a yw cyfryngu yn addas i chi',
    'y costau tebygol',
    'a fyddwch yn gymwys i gael help i dalu costau cyfryngu a chael cyngor cyfreithiol',
    "opsiynau eraill y gallech eu defnyddio i'ch helpu i ddod i gytundeb",
  ],
  line1: 'Yn y <abbr title="Mediation Information and Assessment Meeting">MIAM</abbr>, bydd y cyfryngwr yn egluro:',
  line2:
    'Bydd eich cyfryngwr hefyd yn trafod y <a href="https://www.gov.uk/guidance/family-mediation-voucher-scheme" class="govuk-link" target="_blank" aria-label="Family Mediation Voucher Scheme">Cynllun Talebau Cyfryngu i Deuluoedd</a> gyda chi os ydych yn gymwys.',
  line3Link:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank" aria-label="Find a mediator to book a MIAM">Dod o hyd i gyfryngwr i drefnu MIAM</a>',
  line4:
    'Dylech gael dogfen wedi’i llofnodi gan y cyfryngwr yn cadarnhau hyn. Mae angen i chi lwytho’r ddogfen hon i’ch cais.',
  line5:
    "Nid oes rhaid i chi fynychu <abbr title='Mediation Information and Assessment Meeting'>MIAM</abbr> os oes gennych reswm dilys. Er enghraifft, rydych chi neu'r plant mewn perygl o niwed.",
  line6Link:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" aria-label="List of valid reasons for not attending a MIAM">Rhestr o resymau dilys dros beidio â mynychu MIAM</a>',
  miamLabel: 'Mynychu MIAM',
  miamConsentStatement: "Rwy'n deall bod yn rhaid i mi fynychu MIAM neu ddarparu rheswm dilys dros beidio â mynychu.",
  errors: {
    miam_consent: {
      required:
        'Cadarnhewch eich bod yn deall bod yn rhaid i chi  fynychu MIAM neu ddarparu rheswm dilys dros beidio â mynychu',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_consent: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      label: l => l.miamLabel,
      values: [
        {
          name: 'miam_consent',
          label: l => l.miamConsentStatement,
          value: YesOrNo.YES,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
