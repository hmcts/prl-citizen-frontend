/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  title: 'Attending a Mediation Information and Assessment Meeting (MIAM)',
  miam: 'A MIAM is a one-off meeting that you must attend by law.',
  whatHappens: 'What happens at a MIAM',
  atMiam: 'At the MIAM, a trained professional known as a mediator will explain:',
  miamList: [
    'how mediation works',
    'the benefits of mediation',
    'whether mediation is right for you',
    'the likely costs of mediation',
    'if you might qualify for help with the costs of mediation and legal advice',
    'other options you could use to help you reach an agreement',
  ],
  findAMediator:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank">Find a local mediator to book a MIAM (opens in a new tab)</a>.',
  whenDontHaveToAttend: 'When you do not have to attend a MIAM',
  dontHaveToAttend:
    'You do not have to attend a MIAM if you have a valid reason (an exemption). For example, you or the children are at risk of harm. Find a list of <a href ="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">valid reasons for not attending a MIAM (opens in a new tab)</a>.',
  ifExempt: 'If you’re exempt from attending a MIAM, you may have to provide evidence to the court.',
  attendingMiam: 'Attending a MIAM',
  understandLabel: 'I understand that I have to attend a MIAM or provide a valid reason for not attending.',
  errors: {
    miam_consent: {
      required:
        'Confirm that you understand that you have to attend a MIAM or provide a valid reason for not attending',
    },
  },
};

export const cy = {
  title: 'Mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
  miam: 'Cyfarfod un-tro y mae’r gyfraith yn datgan bod rhaid i chi fynychu yw MIAM.',
  whatHappens: 'Beth fydd yn digwydd mewn MIAM',
  atMiam: 'Yn y MIAM, bydd gweithiwr proffesiynol hyfforddedig a elwir yn gyfryngwr yn egluro:',
  miamList: [
    'sut mae cyfryngu yn gweithio',
    'manteision cyfryngu',
    'a yw cyfryngu yn iawn i chi',
    'costau tebygol cyfryngu',
    'os byddwch efallai yn gymwys i gael help i dalu costau cyfryngu a chyngor cyfreithiol',
    "opsiynau eraill y gallech eu defnyddio i'ch helpu i ddod i gytundeb",
  ],
  findAMediator:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank">Dod o hyd i gyfryngwr lleol er mwyn trefnu MIAM (yn agor mewn tab newydd)</a>.',
  whenDontHaveToAttend: 'Amgylchiadau pam nad oes rhaid ichi fynychu MIAM',
  dontHaveToAttend:
    'Nid oes rhaid i chi fynychu MIAM os oes gennych reswm dilys (esemptiad). Er enghraifft, rydych chi neu\'r plant mewn perygl o niwed. Gweld rhestr o <a href ="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">resymau dilys dros beidio â mynychu MIAM (yn agor mewn tab newydd)</a>.',
  ifExempt: 'If you’re exempt from attending a MIAM, you may have to provide evidence to the court. (welsh)',
  attendingMiam: 'Mynychu MIAM',
  understandLabel: "Rwy'n deall bod rhaid i mi fynychu MIAM neu ddarparu rheswm dilys dros beidio â mynychu.",
  errors: {
    miam_consent: {
      required:
        'Cadarnhewch eich bod yn deall bod rhaid i chi fynychu MIAM neu ddarparu rheswm dilys dros beidio â mynychu',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_consent: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      labelSize: 'm',
      label: l => l.attendingMiam,
      values: [
        {
          name: 'miam_consent',
          label: l => l.understandLabel,
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
