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
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need help travelling to, or moving around court buildings - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  parkingSpace: 'Parking space close to the venue - welsh',
  parkingSpace_subfield: 'Describe why you need this - welsh',
  wheelchairAccess: 'Step free / wheelchair access - welsh',
  venueWheelchair: 'Use of venue wheelchair - welsh',
  accessToilet: 'Accessible toilet - welsh',
  helpUsingLift: 'Help using a lift - welsh',
  differentTypeChair: 'A different type of chair - welsh',
  differentTypeChair_subfield: 'Describe why you need - welsh',
  differentTypeChairSubFieldHint: 'For example, a chair with back support - welsh',
  guideBuilding: 'Guiding in the building - welsh',
  travellingCourtOther: 'Other - welsh',
  travellingCourtOther_subfield: 'Describe what you need - welsh',
  travellingCourtNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    ra_parkingSpace_subfield: {
      required: 'Describe why you need a parking space close to the venue - welsh',
    },
    ra_differentTypeChair_subfield: {
      required: 'Describe what type of chair you need - welsh',
    },
    ra_travellingCourtOther_subfield: {
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
