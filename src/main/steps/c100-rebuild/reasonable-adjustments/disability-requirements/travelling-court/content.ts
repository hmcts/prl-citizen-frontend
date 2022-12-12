/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
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
    },
    ra_differentTypeChair_subfield: {
      required: 'Describe what type of chair you need',
    },
    ra_travellingCourtOther_subfield: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
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
    },
    ra_differentTypeChair_subfield: {
      required: 'Disgrifiwch pa fath o gadair sydd ei hangen arnoch',
    },
    ra_travellingCourtOther_subfield: {
      required:
        "Disgrifiwch pa help sydd ei angen arnoch os ydych chi'n teithio i adeiladau'r llys, neu symud o gwmpas adeiladau'r llys",
    },
    ra_travellingCourt: {
      required:
        "Dewiswch pa gymorth sydd ei angen arnoch os ydych chi'n teithio i adeiladau'r llys, neu symud o gwmpas adeiladau'r llys",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_travellingCourt: {
      id: 'ra_travellingCourt',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_travellingCourt',
          label: l => l.parkingSpace,
          value: 'parkingSpace',
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
          value: 'wheelchairAccess',
        },
        {
          name: 'ra_travellingCourt',
          label: l => l.venueWheelchair,
          value: 'venueWheelchair',
        },
        {
          name: 'ra_travellingCourt',
          label: l => l.accessToilet,
          value: 'accessToilet',
        },
        {
          name: 'ra_travellingCourt',
          label: l => l.helpUsingLift,
          value: 'helpUsingLift',
        },
        {
          name: 'ra_travellingCourt',
          label: l => l.differentTypeChair,
          value: 'differentTypeChair',
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
          value: 'guideBuilding',
        },
        {
          name: 'ra_travellingCourt',
          label: l => l.travellingCourtOther,
          value: 'travellingCourtOther',
          subFields: {
            ra_travellingCourtOther_subfield: {
              type: 'textarea',
              label: l => l.travellingCourtOther_subfield,
              labelSize: null,
              attributes: {
                rows: 1,
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
          value: 'travellingCourtNoOption',
          behaviour: 'exclusive',
        },
      ],
    },
  },
  onlycontinue: {
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
