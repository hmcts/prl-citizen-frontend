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
    parkingSpaceSubField: {
      required: 'Describe why you need a parking space close to the venue',
    },
    differentTypeChairSubField: {
      required: 'Describe what type of chair you need',
    },
    travellingCourtOtherSubField: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
    },
    travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need help travelling to, or moving around court buildings - welsh',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  parkingSpace: 'Parking space close to the venue - welsh',
  parkingSpaceSubField: 'Describe why you need this - welsh',
  wheelchairAccess: 'Step free / wheelchair access - welsh',
  venueWheelchair: 'Use of venue wheelchair - welsh',
  accessToilet: 'Accessible toilet - welsh',
  helpUsingLift: 'Help using a lift - welsh',
  differentTypeChair: 'A different type of chair - welsh',
  differentTypeChairSubField: 'Describe why you need - welsh',
  differentTypeChairSubFieldHint: 'For example, a chair with back support - welsh',
  guideBuilding: 'Guiding in the building - welsh',
  travellingCourtOther: 'Other - welsh',
  travellingCourtOtherSubField: 'Describe what you need - welsh',
  travellingCourtNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    parkingSpaceSubField: {
      required: 'Describe why you need a parking space close to the venue - welsh',
    },
    differentTypeChairSubField: {
      required: 'Describe what type of chair you need - welsh',
    },
    travellingCourtOtherSubField: {
      required: 'Describe what help you need if travelling to, or moving around court buildings - welsh',
    },
    travellingCourt: {
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
    travellingCourt: {
      id: 'travellingCourt',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'travellingCourt',
          label: l => l.parkingSpace,
          value: 'parkingSpace',
          subFields: {
            parkingSpaceSubField: {
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
          name: 'travellingCourt',
          label: l => l.wheelchairAccess,
          value: 'wheelchairAccess',
        },
        {
          name: 'travellingCourt',
          label: l => l.venueWheelchair,
          value: 'venueWheelchair',
        },
        {
          name: 'travellingCourt',
          label: l => l.accessToilet,
          value: 'accessToilet',
        },
        {
          name: 'travellingCourt',
          label: l => l.helpUsingLift,
          value: 'helpUsingLift',
        },
        {
          name: 'travellingCourt',
          label: l => l.differentTypeChair,
          value: 'differentTypeChair',
          subFields: {
            differentTypeChairSubField: {
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
          name: 'travellingCourt',
          label: l => l.guideBuilding,
          value: 'guideBuilding',
        },
        {
          name: 'travellingCourt',
          label: l => l.travellingCourtOther,
          value: 'travellingCourtOther',
          subFields: {
            travellingCourtOtherSubField: {
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
          name: 'travellingCourt',
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
