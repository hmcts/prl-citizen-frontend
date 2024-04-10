import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your answers',
  title: ' ',
  sectionTitles: {
    aboutYou: ' ',
  },
  keys: {
    partiesServed: 'who was served?',
    partiesServedDate: 'When were they served?',
  },
  statementOfTruth: 'Statement of truth',
  filesUploaded: 'Files uploaded',
  submit: 'Submit',
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consent: 'I believe that the facts stated in this application are true',
  errors: {},
};

const cy = {
  section: 'Gwirio eich atebion',
  title: ' ',
  sectionTitles: {
    aboutYou: ' ',
  },
  keys: {
    partiesServed: 'Ar bwy y cyflwynwyd?',
    partiesServedDate: 'Pryd cawson nhw eu cyflwyno?',
  },
  statementOfTruth: 'Datganiad gwirionedd',
  filesUploaded: 'Ffeiliau sydd wedi’u llwytho',
  submit: 'Cyflwyno',
  confirmation:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  consent: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
  errors: {},
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    commonContent.additionalData = {
      req: {
        session: {
          userCase: {
            ...mockUserCase,
            partiesServed: '',
            patieservedDate: '',
          },
          user: {
            id: '1234',
          },
        },
      },
    };
    commonContent.userCase = commonContent.additionalData.req.session.userCase;
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Check your answers');
    expect(generatedContent.keys.partiesServedDate).toEqual('When were they served?');
    expect(generatedContent.keys.partiesServed).toEqual('who was served?');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});

/* eslint-enable @typescript-eslint/ban-types */
