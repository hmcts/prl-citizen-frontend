/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { C100_URL } from '../../../../steps/urls';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Reasonable adjustments',
  headingTitle: 'I need help travelling to, or moving around court buildings',
  select_all_apply: 'Select all that apply to you',
  parkingSpace: 'Parking space close to the venue',
  parkingSpace_subfield: 'Describe why you need this',
  wheelchairAccess: 'Step free / wheelchair access',
  venueWheelchair: 'Use of venue wheelchair',
  accessToilet: 'Accessible toilet',
  helpUsingLift: 'Help using a lift',
  differentTypeChair: 'A different type of chair',
  differentTypeChair_subfield: 'Describe why you need',
  differentTypeChairSubFieldHint: 'For example, a chair with back support',
  guideBuilding: 'Guiding in the building',
  travellingCourtOther: 'Other',
  travellingCourtOther_subfield: 'Describe what you need',
  travellingCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_parkingSpace_subfield: {
      required: 'Describe why you need a parking space close to the venue',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_differentTypeChair_subfield: {
      required: 'Describe what type of chair you need',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_travellingCourtOther_subfield: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  parkingSpace: "Lle parcio yn agos i'r lleoliad",
  parkingSpace_subfield: 'Disgrifiwch pam fod arnoch angen hyn',
  wheelchairAccess: 'Dim gris / mynediad ar gyfer cadair olwyn',
  venueWheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
  accessToilet: 'Toiledau hygyrch',
  helpUsingLift: 'Help i ddefnyddio lifft',
  differentTypeChair: 'Math gwahanol o gadair',
  differentTypeChair_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  differentTypeChairSubFieldHint: 'Er enghraifft, cadair â chymorth cefn',
  guideBuilding: 'Cymorth i fynd o amgylch yr adeilad',
  travellingCourtOther: 'Arall',
  travellingCourtOther_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  travellingCourtNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_parkingSpace_subfield: {
      required: "Disgrifiwch pam fod arnoch angen lle parcio yn agos i'r lleoliad",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_differentTypeChair_subfield: {
      required: 'Disgrifiwch pa fath o gadair sydd ei hangen arnoch',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_travellingCourtOther_subfield: {
      required:
        "Disgrifiwch pa help sydd ei angen arnoch os ydych chi'n teithio i adeiladau'r llys, neu symud o gwmpas adeiladau'r llys",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_travellingCourt: {
      required:
        "Dewiswch pa gymorth sydd ei angen arnoch os ydych chi'n teithio i adeiladau'r llys, neu symud o gwmpas adeiladau'r llys",
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
      ra_travellingCourt: {
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: value => atLeastOneFieldIsChecked(value),
        values: [
          {
            name: 'ra_travellingCourt',
            label: l => l.parkingSpace,
            value: isC100Journey ? 'parkingSpace' : 'parkingspace',
            subFields: {
              ra_parkingSpace_subfield: {
                type: 'textarea',
                label: l => l.parkingSpace_subfield,
                labelSize: null,
                attributes: {
                  rows: 1,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.wheelchairAccess,
            value: isC100Journey ? 'wheelchairAccess' : 'stepfree',
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.venueWheelchair,
            value: isC100Journey ? 'venueWheelchair' : 'wheelchair',
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.accessToilet,
            value: isC100Journey ? 'accessToilet' : 'toilet',
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.helpUsingLift,
            value: isC100Journey ? 'helpUsingLift' : 'lift',
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.differentTypeChair,
            value: isC100Journey ? 'differentTypeChair' : 'differentchair',
            subFields: {
              ra_differentTypeChair_subfield: {
                type: 'textarea',
                label: l => l.differentTypeChair_subfield,
                hint: l => l.differentTypeChairSubFieldHint,
                labelSize: null,
                attributes: {
                  rows: 1,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.guideBuilding,
            value: isC100Journey ? 'guideBuilding' : 'building',
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.travellingCourtOther,
            value: isC100Journey ? 'travellingCourtOther' : 'other',
            subFields: {
              ra_travellingCourtOther_subfield: {
                type: 'textarea',
                label: l => l.travellingCourtOther_subfield,
                labelSize: null,
                attributes: {
                  rows: 3,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },

          {
            divider: l => l.divider,
          },
          {
            name: 'ra_travellingCourt',
            label: l => l.travellingCourtNoOption,
            value: isC100Journey ? 'travellingCourtNoOption' : 'nosupport',
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
