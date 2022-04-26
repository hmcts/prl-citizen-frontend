import { AppRequest } from '../../../main/app/controller/AppRequest';

export const mockRequest = ({
  headers = {},
  body = {},
  session = {},
  cookies = {},
  userCase = {},
  appLocals = {},
  query = {},
} = {}): AppRequest =>
  ({
    headers: { 'accept-language': 'en', ...headers },
    body,
    locals: {
      api: {
        triggerEvent: jest.fn(),
        addPayment: jest.fn(),
        getCaseById: jest.fn(),
      },
      logger: {
        info: jest.fn(),
        error: jest.fn(),
      },
    },
    query: { ...query },
    session: {
      user: {
        id: '123456',
        accessToken: 'mock-user-access-token',
        name: 'test',
        givenName: 'First name',
        familyName: 'Last name',
        email: 'test@example.com',
      },
      userCase: {
        id: '1234',
        ...userCase,
      },
      save: jest.fn(done => done()),
      destroy: jest.fn(done => done()),
      ...session,
    },
    app: {
      locals: {
        steps: [
          {
            getNextStep: () => '',
            form: { fields: {} },
          },
        ],
        ...appLocals,
      },
    },
    cookies,
    path: '/request',
    url: '/request',
    originalUrl: '/request',
    logout: jest.fn(),
  } as unknown as AppRequest);
