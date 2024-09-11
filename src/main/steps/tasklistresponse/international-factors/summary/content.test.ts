import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Check your answers',
  sectionTitles: {
    respondentAdditionalInformation: 'International elements',
  },
  keys: {
    start: "Are the children's lives mainly based outside of England and Wales?",
    iFactorsStartProvideDetails: 'Provide details',
    parents:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
    iFactorsParentsProvideDetails: 'Provide details',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    iFactorsJurisdictionProvideDetails: 'Provide details',
    request: 'Has another country asked (or been asked) for information or help for the children?',
    iFactorsRequestProvideDetails: 'Provide details',
  },
  errors: {},
};

const cy: typeof en = {
  title: 'Gwirio eich atebion',
  sectionTitles: {
    respondentAdditionalInformation: 'Elfennau rhyngwladol',
  },
  keys: {
    start: 'Ydy bywyd y plant yn cael ei dreulio’n bennaf y tu allan i Gymru a Lloegr?',
    iFactorsStartProvideDetails: 'Rhowch fanylion',
    parents:
      "A yw rhieni'r plant (neu unrhyw un o bwys i'r plant) wedi'u lleoli y tu allan i Gymru a Lloegr yn bennaf?",
    iFactorsParentsProvideDetails: 'Rhowch fanylion',
    request: "A oes gwlad arall wedi gofyn (neu wedi cael cais) am wybodaeth neu gymorth i'r plant?",
    iFactorsJurisdictionProvideDetails: 'Rhowch fanylion',
    jurisdiction:
      'A allai rhywun arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?',
    iFactorsRequestProvideDetails: 'Rhowch fanylion',
  },
  errors: {},
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    commonContent.userCase = {
      ...mockUserCase,
      start: YesOrNo.NO,
      parents: YesOrNo.NO,
      jurisdiction: YesOrNo.NO,
      request: YesOrNo.NO,
    };
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Check your answers');
    expect(generatedContent.sectionTitles.respondentAdditionalInformation).toEqual('International elements');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
