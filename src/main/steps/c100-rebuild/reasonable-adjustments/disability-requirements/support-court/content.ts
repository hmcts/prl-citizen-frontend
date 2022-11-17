import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need to bring support with me to a court hearing',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  supportWorkerCarer: 'A support worker or carer',
  supportWorkerCarer_subfield: 'Tell us who you will bring',
  friendFamilyMember: 'A friend or family member',
  friendFamilyMember_subfield: 'Tell us who you will bring',
  assistanceGuideDog: 'Assistance / guide dog',
  therapyAnimal: 'Therapy animal',
  therapyAnimal_subfield: 'Describe what you need',
  supportCourtOther: 'Other',
  supportCourtOther_subfield: 'Describe what you need',
  supportCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_supportWorkerCarer_subfield: {
      required: 'Enter the name of the support worker or carer you will bring',
    },
    ra_friendFamilyMember_subfield: {
      required: 'Enter the name of a friend or family member you will bring',
    },
    ra_therapyAnimal_subfield: {
      required: 'Describe which therapy animal you will bring',
    },
    ra_supportCourtOther_subfield: {
      required: 'Describe which support you need to bring with you to a hearing ',
    },
    ra_supportCourt: {
      required: 'Select which support you need to bring with you to a hearing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need to bring support with me to a court hearing - welsh',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  supportWorkerCarer: 'A support worker or carer - welsh',
  supportWorkerCarer_subfield: 'Tell us who you will bring - welsh',
  friendFamilyMember: 'A friend or family member - welsh',
  friendFamilyMember_subfield: 'Tell us who you will bring - welsh',
  assistanceGuideDog: 'Assistance / guide dog - welsh',
  therapyAnimal: 'Therapy animal - welsh',
  therapyAnimal_subfield: 'Describe what you need - welsh',
  supportCourtOther: 'Other - welsh',
  supportCourtOther_subfield: 'Describe what you need - welsh',
  supportCourtNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    ra_supportWorkerCarer_subfield: {
      required: 'Enter the name of the support worker or carer you will bring - welsh',
    },
    ra_friendFamilyMember_subfield: {
      required: 'Enter the name of a friend or family member you will bring - welsh',
    },
    ra_therapyAnimal_subfield: {
      required: 'Describe which therapy animal you will bring - welsh',
    },
    ra_supportCourtOther_subfield: {
      required: 'Describe which support you need to bring with you to a hearing - welsh',
    },
    ra_supportCourt: {
      required: 'Select which support you need to bring with you to a hearing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_supportCourt: {
      id: 'ra_supportCourt',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_supportCourt',
          label: l => l.supportWorkerCarer,
          value: 'supportWorkerCarer',
          subFields: {
            ra_supportWorkerCarer_subfield: {
              type: 'textarea',
              label: l => l.supportWorkerCarer_subfield,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_supportCourt',
          label: l => l.friendFamilyMember,
          value: 'friendFamilyMember',
          subFields: {
            ra_friendFamilyMember_subfield: {
              type: 'textarea',
              label: l => l.friendFamilyMember_subfield,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_supportCourt',
          label: l => l.assistanceGuideDog,
          value: 'assistanceGuideDog',
        },
        {
          name: 'ra_supportCourt',
          label: l => l.therapyAnimal,
          value: 'therapyAnimal',
          subFields: {
            ra_therapyAnimal_subfield: {
              type: 'textarea',
              label: l => l.therapyAnimal_subfield,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_supportCourt',
          label: l => l.supportCourtOther,
          value: 'supportCourtOther',
          subFields: {
            ra_supportCourtOther_subfield: {
              type: 'textarea',
              label: l => l.supportCourtOther_subfield,
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
          name: 'ra_supportCourt',
          label: l => l.supportCourtNoOption,
          value: 'supportCourtNoOption',
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
