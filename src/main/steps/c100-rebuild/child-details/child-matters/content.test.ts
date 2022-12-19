import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { ChildrenDetails, PartyType } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Which of the decisions you’re asking the court to resolve relate to',
  bodyHint: 'Select all that apply',
  childArrangementsOrder: {
    whoChildLiveWith: 'Decide who the children live with and when',
    childTimeSpent: 'Decide how much time the children spend with each person',
  },
  stepsList: {
    changeChildrenNameSurname: "Changing the children's names or surname",
    allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children',
    takingChildOnHoliday: 'Taking the children on holiday',
    relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUk: `Relocating the children outside of England and Wales
     (including Scotland and Northern Ireland)`,
  },
  issueOrderList: {
    specificHoliday: 'A specific holiday or arrangement',
    whatSchoolChildrenWillGoTo: 'What school the children will go to',
    religiousIssue: 'A religious issue',
    changeChildrenNameSurnameA: "Changing the children's names or surname",
    medicalTreatment: 'Medical treatment',
    relocateChildrenDifferentUkAreaA: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUkA:
      'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
    returningChildrenToYourCare: 'Returning the children to your care',
  },
  errors: {
    needsResolution: {
      required: 'Select at least a decision',
    },
  },
};

const cy = {
  title: 'Pa un o’r penderfyniadau rydych chi’n gofyn i’r llys eu datrys sy’n ymwneud â',
  orderAppliedFor: 'Gorchmynion y gwnaed cais amdanynt',
  bodyHint: "Dewiswch bob un sy'n berthnasol",
  childArrangementsOrder: {
    whoChildLiveWith: "Dewiswch bob un sy'n berthnasol",
    childTimeSpent: 'Penderfynu faint o amser y bydd y plant yn ei dreulio gyda phob unigolyn',
  },
  stepsList: {
    changeChildrenNameSurname: "Newid enwau neu gyfenwau'r plant",
    allowMedicalTreatment: "Caniatáu i'r plant gael triniaeth feddygol",
    takingChildOnHoliday: "Mynd â'r plant ar wyliau",
    relocateChildrenDifferentUkArea: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
    relocateChildrenOutsideUk: 'Adleoli’r plant y tu allan i Gymru a Lloegr(gan gynnwys Yr Alban a Gogledd Iwerddon)',
  },
  issueOrderList: {
    specificHoliday: 'Gwyliau neu drefniant penodol',
    whatSchoolChildrenWillGoTo: 'I ba ysgol y bydd y plant yn mynd iddi',
    religiousIssue: ' Mater crefyddol',
    changeChildrenNameSurnameA: "Newid enwau neu gyfenwau'r plant",
    medicalTreatment: 'Triniaeth feddygol',
    relocateChildrenDifferentUkAreaA: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
    relocateChildrenOutsideUkA: 'Adleoli’r plant y tu allan i Gymru a Lloegr(gan gynnwys Yr Alban a Gogledd Iwerddon)',
    returningChildrenToYourCare: "Dychwelyd y plant i'ch gofal",
  },
  errors: {
    needsResolution: {
      required: 'Dylech o leiaf ddewis penderfyniad',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > child-matters', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  let dummySessionData;
  let dummyTranslations;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
    dummySessionData = commonContent.userCase ?? {};
    dummyTranslations = '';
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    const { errors } = generateFormFields(
      (getDataShape(PartyType.CHILDREN) as ChildrenDetails).childMatters,
      dummySessionData,
      dummyTranslations
    );
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} Bob Silly`,
        errors: {
          ...en.errors,
          ...errors.en,
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    const { errors } = generateFormFields(
      (getDataShape(PartyType.CHILDREN) as ChildrenDetails).childMatters,
      dummySessionData,
      dummyTranslations
    );
    languageAssertions(
      'cy',
      {
        ...cy,
        title: `${cy.title} Bob Silly`,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain child matters form fields', () => {
    const { needsResolution } = fields as Record<string, FormFields>;

    expect(needsResolution.type).toBe('checkboxes');
    expect((needsResolution.hint as Function)(generatedContent)).toBe(`${en.bodyHint}`);
    (needsResolution.validator as Function)('whoChildLiveWith');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('whoChildLiveWith');

    expect((needsResolution.hint as Function)(generatedContent)).toBe(`${en.bodyHint}`);
    (needsResolution.validator as Function)('stepsList');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('stepsList');

    expect((needsResolution.hint as Function)(generatedContent)).toBe(`${en.bodyHint}`);
    (needsResolution.validator as Function)('issueOrderList');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('issueOrderList');

    // expect(childArrangementsOrder.whoChildLiveWith.name).toBe('needsResolution');
    // expect(whoChildLiveWith.value).toBe('whoChildLiveWith');
    // expect((whoChildLiveWith.label as Function)(generatedContent)).toBe(en.whoChildLiveWithLabel);

    // expect(childTimeSpent.name).toBe('needsResolution');
    // expect(childTimeSpent.value).toBe('childTimeSpent');
    // expect((childTimeSpent.label as Function)(generatedContent)).toBe(en.childTimeSpentLabel);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
