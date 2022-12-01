import { AppRequest } from '../../../main/app/controller/AppRequest';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockRequest: any = ({
  headers = {},
  body = {},
  session = {},
  cookies = {},
  userCase = {},
  appLocals = {},
  query = {},
  params = {},
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
      C100Api: {
        caseApi: jest.fn(),
        createCase: jest.fn(),
        updateCase: jest.fn(),
        deleteDocument: jest.fn(),
        uploadDocument: jest.fn(),
        retrieveCase: jest.fn(),
      },
      logger: {
        info: jest.fn(),
        error: jest.fn(),
      },
    },
    query: { ...query },
    params: { ...params },
    session: {
      user: {
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
    route: {
      path: '/request',
    },
  } as unknown as AppRequest);
