import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need help travelling to, or moving around court buildings',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  parkingSpace: 'Parking space close to the venue',
  parkingSpaceSubField: 'Describe why you need this',
  wheelchairAccess: 'Step free / wheelchair access',
  venueWheelchair: 'Use of venue wheelchair',
  accessToilet: 'Accessible toilet',
  helpUsingLift: 'Help using a lift',
  differentTypeChair: 'A different type of chair',
  differentTypeChairSubField: 'Describe why you need',
  differentTypeChairSubFieldHint: 'For example, a chair with back support',
  guideBuilding: 'Guiding in the building',
  travellingCourtOther: 'Other',
  travellingCourtOtherSubField: 'Describe what you need',
  travellingCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_parkingSpaceSubField: {
      required: 'Describe why you need a parking space close to the venue',
    },
    ra_differentTypeChairSubField: {
      required: 'Describe what type of chair you need',
    },
    ra_travellingCourtOtherSubField: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  parkingSpace: "Lle parcio yn agos i'r lleoliad",
  parkingSpaceSubField: 'Disgrifiwch pam fod arnoch angen hyn',
  wheelchairAccess: 'Dim gris / mynediad ar gyfer cadair olwyn',
  venueWheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
  accessToilet: 'Toiledau hygyrch',
  helpUsingLift: 'Help i ddefnyddio lifft',
  differentTypeChair: 'Math gwahanol o gadair',
  differentTypeChairSubField: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  differentTypeChairSubFieldHint: 'Er enghraifft, cadair â chymorth cefn',
  guideBuilding: 'Cymorth i fynd o amgylch yr adeilad',
  travellingCourtOther: 'Arall',
  travellingCourtOtherSubField: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  travellingCourtNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_parkingSpaceSubField: {
      required: 'Describe why you need a parking space close to the venue - welsh',
    },
    ra_differentTypeChairSubField: {
      required: 'Describe what type of chair you need - welsh',
    },
    ra_travellingCourtOtherSubField: {
      required: 'Describe what help you need if travelling to, or moving around court buildings - welsh',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings - welsh',
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
            ra_parkingSpaceSubField: {
              type: 'textarea',
              label: l => l.parkingSpaceSubField,
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
            ra_differentTypeChairSubField: {
              type: 'textarea',
              label: l => l.differentTypeChairSubField,
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
            ra_travellingCourtOtherSubField: {
              type: 'textarea',
              label: l => l.travellingCourtOtherSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },

        {
          divider: 'or',
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
