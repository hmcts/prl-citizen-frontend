// import { CaseWithId } from '../../../../app/case/case';
// import { YesOrNo } from '../../../../app/case/definition';
// import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../steps/common/common.content';
// import {
//   INTERNATIONAL_FACTORS_JURISDICTION,
//   INTERNATIONAL_FACTORS_PARENTS,
//   INTERNATIONAL_FACTORS_REQUEST,
//   INTERNATIONAL_FACTORS_START,
// } from '../../../../steps/urls';
// import { summaryList } from '../../../common/summary/utils';

import { generateContent } from './content';

//jest.mock('../../../app/form/validation');

// const enContent = {
//   section: ' ',
//   title: 'Check your answers',
//   title2: 'International element',
//   sectionTitles: {
//     respondentAdditionalInformation: 'Additional information',
//   },
//   keys: {
//     start: 'Do the children live outside of England or Wales?',
//     iFactorsStartProvideDetails: 'Provide details',
//     parents: "Do the children's parents or anyone significant to the children live outside of England or Wales?",
//     iFactorsParentsProvideDetails: 'Provide details',
//     jurisdiction:
//       'Could another person in the application apply for a similar order in a country outside England or Wales?',
//     iFactorsJurisdictionProvideDetails: 'Provide details',
//     request: 'Has another country asked (or been asked) for information or help for the children?',
//     iFactorsRequestProvideDetails: 'Provide details',
//   },
//   dependencies: {
//     iFactorsStartProvideDetails: {
//       dependantOn: 'start',
//       value: 'Yes',
//       display: true,
//     },
//     iFactorsParentsProvideDetails: {
//       dependantOn: 'parents',
//       value: 'Yes',
//       display: true,
//     },
//     iFactorsJurisdictionProvideDetails: {
//       dependantOn: 'jurisdiction',
//       value: 'Yes',
//       display: true,
//     },
//     iFactorsRequestProvideDetails: {
//       dependantOn: 'request',
//       value: 'Yes',
//       display: true,
//     },
//   },
//   errors: {},
// };

// const cyContent = {
//   section: ' ',
//   title: 'Check your answers',
//   title2: 'International element',
//   sectionTitles: {
//     respondentAdditionalInformation: 'Additional information',
//   },
//   keys: {
//     start: 'Do the children live outside of England or Wales?',
//     iFactorsStartProvideDetails: 'Provide details',
//     parents: "Do the children's parents or anyone significant to the children live outside of England or Wales?",
//     iFactorsParentsProvideDetails: 'Provide details',
//     jurisdiction:
//       'Could another person in the application apply for a similar order in a country outside England or Wales?',
//     iFactorsJurisdictionProvideDetails: 'Provide details',
//     request: 'Has another country asked (or been asked) for information or help for the children?',
//     iFactorsRequestProvideDetails: 'Provide details',
//   },
//   dependencies: {
//     iFactorsStartProvideDetails: {
//       dependantOn: 'start',
//       value: 'Yes',
//       display: true,
//     },
//     iFactorsParentsProvideDetails: {
//       dependantOn: 'parents',
//       value: 'Yes',
//       display: true,
//     },
//     iFactorsJurisdictionProvideDetails: {
//       dependantOn: 'jurisdiction',
//       value: 'Yes',
//       display: true,
//     },
//     iFactorsRequestProvideDetails: {
//       dependantOn: 'request',
//       value: 'Yes',
//       display: true,
//     },
//   },
//   errors: {},
// };

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('tasklistresponse > international-factors > summary', () => {
  const commonContent = {
    language: 'en',
    userCase: {
    }
  } as CommonContent;



  test('should contain submit button', () => {
    //const generatedContent = generateContent(commonContent);
    //const form = generatedContent.form as FormContent;
    let result = (generatePageContent({ language: 'en' }));
    expect(result.continue).toBe('Save and continue');
  });


});

