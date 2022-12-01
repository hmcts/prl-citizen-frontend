import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Safety Concerns',
  title: "The children's safety",
  firstParagraph:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  subHeading: 'What you told us',
  bulletPoints: [
    'You have suffered or are at risk of suffering domestic violence or abuse',
    'The children have not suffered or are not at risk of suffering domestic violence or abuse',
  ],
  paragraphs: [
    "If children see or hear someone else being treated badly, it can harm them. We'd like to ask a few questions about the children's safety.",
    'Your answers will help the court consider any risks to you or the children. This information forms part of your court application and will be dealt with sensitively.',
    'You may find some of the following questions difficult or upsetting to answer. Please complete them as best you can.',
  ],
  signsOfChildAbuseHyperlinkLabel: 'Find out about the signs of child abuse',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Pryderon diogelwch',
  title: 'Diogelwch y plant',
  firstParagraph:
    "Mae’r llys angen gwybod os oes unrhyw un o'r bobl eraill yn y cais hwn, neu unrhyw un sy'n gysylltiedig â nhw sydd â chysylltiad â'r plant, yn peri risg i ddiogelwch y plant.",
  subHeading: 'Beth ddywedoch chi wrthon ni',
  bulletPoints: [
    'Rydych wedi dioddef neu mewn perygl o ddioddef trais domestig neu gamdriniaeth',
    "Nid yw'r plant wedi dioddef neu nid ydynt mewn perygl o ddioddef trais domestig neu gamdriniaeth",
  ],
  paragraphs: [
    "Os yw plant yn gweld neu'n clywed rhywun arall yn cael ei drin yn wael, gall gael effaith arnynt  Hoffem ofyn ambell gwestiwn am ddiogelwch y plant.",
    "Bydd eich atebion yn helpu'r llys i ystyried unrhyw risgiau i chi neu'r plant.  Mae'r wybodaeth hon yn rhan o'ch cais llys a bydd yn cael ei thrafod yn gwbl sensitif.",
    "Efallai y byddwch chi'n ystyried rhai o'r cwestiynau canlynol yn anodd i’w hateb neu eu bod yn peri gofid i chi.  Atebwch nhw y gorau y gallwch chi.",
  ],
  signsOfChildAbuseHyperlinkLabel: 'Adnabod arwyddion o gam-drin plant',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
};

/* eslint-disable @typescript-eslint/ban-types */
describe("The children's safety content", () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
