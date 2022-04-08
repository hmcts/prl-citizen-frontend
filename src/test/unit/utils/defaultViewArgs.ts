import { generatePageContent } from '../../../main/steps/common/common.content';

export const defaultViewArgs = {
  ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
  htmlLang: 'en',
  isAmendableStates: false,
  sessionErrors: [],
  isDraft: true,
  userCase: expect.any(Object),

  // serviceName: expect.any(String),
  // sessionErrors: expect.any(Array),
  // // getNextIncompleteStepUrl: expect.any(Function),
  // isDraft: expect.any(Boolean),
  // userCase: expect.any(Object),
  // language: expect.any(String),
  // htmlLang: expect.any(String),
  // userEmail: expect.any(String),
  //contactEmail: expect.any(String),
};
