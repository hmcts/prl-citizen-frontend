import { Application } from 'express';

import { Routes } from './routes';
import {
  ACCESSIBILITY_STATEMENT,
  CONTACT_US,
  COOKIES_PAGE,
  HOME_URL,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from './steps/urls';

const mockHomeGetController = jest.fn();
jest.mock('./steps/home/get', () => {
  return {
    HomeGetController: jest.fn().mockImplementation(() => {
      return { get: mockHomeGetController };
    }),
  };
});

const mockCookiesGetController = jest.fn();
jest.mock('../main/steps/cookies/get', () => {
  return {
    CookiesGetController: jest.fn().mockImplementation(() => {
      return { get: mockCookiesGetController };
    }),
  };
});

const mockPrivacyPolicyGetController = jest.fn();
jest.mock('../main/steps/privacy-policy/get', () => {
  return {
    PrivacyPolicyGetController: jest.fn().mockImplementation(() => {
      return { get: mockPrivacyPolicyGetController };
    }),
  };
});

const mockTermsAndConditionsGetController = jest.fn();
jest.mock('../main/steps/terms-and-conditions/get', () => {
  return {
    TermsAndConditionsGetController: jest.fn().mockImplementation(() => {
      return { get: mockTermsAndConditionsGetController };
    }),
  };
});

const mockAccessibilityStatementGetController = jest.fn();
jest.mock('../main/steps/accessibility-statement/get', () => {
  return {
    AccessibilityStatementGetController: jest.fn().mockImplementation(() => {
      return { get: mockAccessibilityStatementGetController };
    }),
  };
});

const mockContactUsGetController = jest.fn();
jest.mock('../main/steps/contact-us/get', () => {
  return {
    ContactUsGetController: jest.fn().mockImplementation(() => {
      return { get: mockContactUsGetController };
    }),
  };
});

describe('Routes', () => {
  let appMock;
  beforeEach(() => {
    appMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
    } as unknown as Application;
    new Routes().enableFor(appMock);
  });

  test('should setup routes', () => {
    expect(appMock.get).toHaveBeenCalledWith(HOME_URL, mockHomeGetController);
    expect(appMock.get).toHaveBeenCalledWith(COOKIES_PAGE, mockCookiesGetController);
    expect(appMock.get).toHaveBeenCalledWith(PRIVACY_POLICY, mockPrivacyPolicyGetController);
    expect(appMock.get).toHaveBeenCalledWith(TERMS_AND_CONDITIONS, mockTermsAndConditionsGetController);
    expect(appMock.get).toHaveBeenCalledWith(ACCESSIBILITY_STATEMENT, mockAccessibilityStatementGetController);
    expect(appMock.get).toHaveBeenCalledWith(CONTACT_US, mockContactUsGetController);
  });
});
