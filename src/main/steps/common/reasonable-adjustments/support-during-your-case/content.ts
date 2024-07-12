/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import {
  RALocalComponentC100SupportNeeds,
  RALocalComponentRespondentSupportNeeds,
} from '../../../../modules/reasonable-adjustments/definitions';
import { C100_URL } from '../../../../steps/urls';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Reasonable adjustments',
  headingTitle:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  line1:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  select_all_apply: 'Select all that apply to you - specific requirements can be given next',
  documentsHelp: 'I need documents in an alternative format',
  documentsHelpHint: 'for example, braille or different colours and text sizes',
  communicationHelp: 'I need help communicating and understanding',
  communicationHelpHint: 'for example, hearing, speaking or interpretation',
  extraSupport: 'I need to bring support with me to a hearing',
  extraSupportHint: 'for example, someone you know or an assistance dog',
  feelComfortableSupport: 'I need something to feel comfortable during a hearing',
  feelComfortableSupportHint: 'for example, extra breaks or extra space',
  helpTravellingMovingBuildingSupport: 'I need help travelling to, or moving around court buildings',
  helpTravellingMovingBuildingSupportHint:
    'for example, access and mobility support if a hearing takes place in person',
  noSupportRequired: 'No, I do not need any support at this time',
  errors: {
    ra_disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle:
    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
  line1:
    'Gwyddom fod rhai pobl angen cymorth i gael mynediad at wybodaeth ac i ddefnyddio ein gwasanaethau. Gelwir hyn yn aml yn addasiad rhesymol. Rhaid i rai addasiadau rhesymol gael eu cytuno gan farnwr neu GLlTEF. Gallwch drafod gyda’r llys os bydd eich anghenion yn newid.',
  select_all_apply: 'Dewiswch bob un sy’n berthnasol - gellir nodi gofynion penodol nesaf',
  documentsHelp: 'Rwyf angen dogfennau mewn fformat arall',
  documentsHelpHint: 'er enghraifft, Braille neu wahanol liwiau a maint testun ',
  communicationHelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  communicationHelpHint: 'er enghraifft, gwrando, siarad neu gymorth gan gyfieithydd/dehonglydd',
  extraSupport: 'Rwyf angen dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad',
  extraSupportHint: "er enghraifft, rhywun rydych chi'n ei adnabod neu gi cymorth",
  feelComfortableSupport: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad',
  feelComfortableSupportHint: 'er enghraifft, seibiannau ychwanegol neu mwy o le',
  helpTravellingMovingBuildingSupport: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  helpTravellingMovingBuildingSupportHint:
    'er enghraifft, cymorth gyda mynediad a symudedd os bydd gwrandawiad yn cael ei gynnal wyneb yn wyneb',
  noSupportRequired: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_disabilityRequirements: {
      required:
        "Dewiswch p'un a oes gennych anabledd corfforol, meddyliol neu addysgol ai peidio neu gyflwr iechyd sy'n golygu eich bod angen cymorth yn ystod eich achos",
    },
  },
});

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const isC100Journey = req.originalUrl.startsWith(C100_URL);

    return {
      ra_disabilityRequirements: {
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'ra_disabilityRequirements',
            label: l => l.documentsHelp,
            value: isC100Journey
              ? RALocalComponentC100SupportNeeds.DOCUMENTS_SUPPORT
              : RALocalComponentRespondentSupportNeeds.DOCUMENTS_SUPPORT,
            hint: l => l.documentsHelpHint,
          },
          {
            name: 'ra_disabilityRequirements',
            label: l => l.communicationHelp,
            value: isC100Journey
              ? RALocalComponentC100SupportNeeds.COMMUNICATION_HELP
              : RALocalComponentRespondentSupportNeeds.COMMUNICATION_HELP,
            hint: l => l.communicationHelpHint,
          },
          {
            name: 'ra_disabilityRequirements',
            label: l => l.extraSupport,
            value: isC100Journey
              ? RALocalComponentC100SupportNeeds.COURT_HEARING_SUPPORT
              : RALocalComponentRespondentSupportNeeds.COURT_HEARING_SUPPORT,
            hint: l => l.extraSupportHint,
          },
          {
            name: 'ra_disabilityRequirements',
            label: l => l.feelComfortableSupport,
            value: isC100Journey
              ? RALocalComponentC100SupportNeeds.COURT_HEARING_COMFORT
              : RALocalComponentRespondentSupportNeeds.COURT_HEARING_COMFORT,
            hint: l => l.feelComfortableSupportHint,
          },
          {
            name: 'ra_disabilityRequirements',
            label: l => l.helpTravellingMovingBuildingSupport,
            value: isC100Journey
              ? RALocalComponentC100SupportNeeds.TRAVELLING_TO_COURT
              : RALocalComponentRespondentSupportNeeds.TRAVELLING_TO_COURT,
            hint: l => l.helpTravellingMovingBuildingSupportHint,
          },
          {
            divider: l => l.divider,
          },
          {
            name: 'ra_disabilityRequirements',
            label: l => l.noSupportRequired,
            value: isC100Journey
              ? RALocalComponentC100SupportNeeds.NO_SUPPORT
              : RALocalComponentRespondentSupportNeeds.NO_SUPPORT,
            exclusive: true,
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return RAProvider.utils.generateContentForLocalComponent(content, languages, form);
};
