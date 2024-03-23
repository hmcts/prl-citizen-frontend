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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_friendFamilyMember_subfield: {
      required: 'Enter the name of a friend or family member you will bring',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_therapyAnimal_subfield: {
      required: 'Describe which therapy animal you will bring',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_supportCourtOther_subfield: {
      required: 'Describe which support you need to bring with you to a hearing ',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_supportCourt: {
      required: 'Select which support you need to bring with you to a hearing',
    },
  },
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad llys',
  line1:
    'Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  supportWorkerCarer: 'Gweithiwr cymorth neu ofalwr',
  supportWorkerCarer_subfield: 'Dywedwch wrthym pwy fyddwch yn dod efo chi',
  friendFamilyMember: "ffrind neu aelod o'r teulu",
  friendFamilyMember_subfield: 'Dywedwch wrthym pwy fyddwch yn dod efo chi',
  assistanceGuideDog: 'Ci cymorth / ci tywys',
  therapyAnimal: 'Anifail therapi',
  therapyAnimal_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  supportCourtOther: 'Arall',
  supportCourtOther_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  supportCourtNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_supportWorkerCarer_subfield: {
      required: "Rhowch enw'r gweithiwr cymorth neu'r gofalwr y byddwch yn dod efo chi",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_friendFamilyMember_subfield: {
      required: "Rhowch enw ffrind neu aelod o'r teulu byddwch yn dod efo chi",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_therapyAnimal_subfield: {
      required: 'Disgrifiwch pa anifail therapi y byddwch yn dod efo chi',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_supportCourtOther_subfield: {
      required: 'Disgrifiwch pa gefnogaeth sydd angen arnoch i chi ddod efo chi i’r gwrandawiad',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_supportCourt: {
      required: 'Dewiswch pa gefnogaeth rydych angen dod efo chi i’r gwrandawiad',
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
      ra_supportCourt: {
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: value => atLeastOneFieldIsChecked(value),
        values: [
          {
            name: 'ra_supportCourt',
            label: l => l.supportWorkerCarer,
            value: isC100Journey ? 'supportWorkerCarer' : 'supportworker',
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
            value: isC100Journey ? 'friendFamilyMember' : 'familymember',
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
            value: isC100Journey ? 'assistanceGuideDog' : 'assistance',
          },
          {
            name: 'ra_supportCourt',
            label: l => l.therapyAnimal,
            value: isC100Journey ? 'therapyAnimal' : 'animal',
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
            value: isC100Journey ? 'supportCourtOther' : 'other',
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
            value: isC100Journey ? 'supportCourtNoOption' : 'nosupport',
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
