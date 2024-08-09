import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, CitizenInternationalElements, PartyDetails, State } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import {
  getC7ApplicationResponseStatus,
  getCheckAllegationOfHarmStatus,
  getFinalApplicationStatus,
  getInternationalFactorsStatus,
  getYourWitnessStatementStatus,
} from './utils';

describe('getCheckAllegationOfHarmStatus', () => {
  test('should return correct status when c1a document present', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
      c1ADocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
    };
    expect(getCheckAllegationOfHarmStatus(data, 'en')).toBe('readyToView');
  });

  test('should return correct status when c1a document not present', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    expect(getCheckAllegationOfHarmStatus(data, 'en')).toBe('notAvailableYet');
  });

  test('should return correct status when isAllegationOfHarmViewed is yes', () => {
    const data = {
      id: '1234',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      c1ADocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    };
    expect(getCheckAllegationOfHarmStatus(data, 'en')).toBe('readyToView');
  });
});

describe('getC7ApplicationResponseStatus', () => {
  test('should return readyToView when response has c7ResponseSubmitted as yes', () => {
    const data = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              c7ResponseSubmitted: 'Yes',
            },
          },
        },
      ],
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'Yes',
          },
        },
      ],
    };

    expect(
      getC7ApplicationResponseStatus(data as unknown as PartyDetails, { id: '1234' } as unknown as UserDetails)
    ).toBe('readyToView');
  });

  test('should return inProgress when some response items present', () => {
    const data = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              keepDetailsPrivate: {},
              miam: {},
              safetyConcerns: {},
              legalRepresentation: {},
              supportYouNeed: {},
            },
          },
        },
      ],
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'Yes',
          },
        },
      ],
    };

    expect(
      getC7ApplicationResponseStatus(data as unknown as PartyDetails, { id: '1234' } as unknown as UserDetails)
    ).toBe('inProgress');
  });

  test('should return todo when no response items present', () => {
    const data = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {},
          },
        },
      ],
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'Yes',
          },
        },
      ],
    };

    expect(
      getC7ApplicationResponseStatus(data as unknown as PartyDetails, { id: '1234' } as unknown as UserDetails)
    ).toBe('toDo');
  });
});

describe('getInternationalFactorsStatus', () => {
  test('should return completed when all internationalFactors completed as no', () => {
    const data = {
      childrenLiveOutsideOfEnWl: 'No',
      parentsAnyOneLiveOutsideEnWl: 'No',
      anotherPersonOrderOutsideEnWl: 'No',
      anotherCountryAskedInformation: 'No',
    } as CitizenInternationalElements;

    expect(getInternationalFactorsStatus(data)).toBe('completed');
  });

  test('should return completed when all internationalFactors completed as yes', () => {
    const data = {
      childrenLiveOutsideOfEnWl: 'Yes',
      childrenLiveOutsideOfEnWlDetails: 'text',
      parentsAnyOneLiveOutsideEnWl: 'Yes',
      parentsAnyOneLiveOutsideEnWlDetails: 'text',
      anotherPersonOrderOutsideEnWl: 'Yes',
      anotherPersonOrderOutsideEnWlDetails: 'text',
      anotherCountryAskedInformation: 'Yes',
      anotherCountryAskedInformationDetaails: 'text',
    } as CitizenInternationalElements;

    expect(getInternationalFactorsStatus(data)).toBe('completed');
  });

  test('should return inProgress when some internationalFactors completed', () => {
    const data = {
      childrenLiveOutsideOfEnWl: 'No',
      parentsAnyOneLiveOutsideEnWl: 'No',
    } as CitizenInternationalElements;

    expect(getInternationalFactorsStatus(data)).toBe('inProgress');
  });

  test('should return todo when no internationalFactors completed', () => {
    const data = {} as CitizenInternationalElements;

    expect(getInternationalFactorsStatus(data)).toBe('toDo');
  });
});

describe('getFinalApplicationStatus', () => {
  test('should return correct status when finalDocument document present', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
      finalDocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
    };
    expect(getFinalApplicationStatus(data, 'en')).toBe('readyToView');
  });

  test('should return correct status when finalDocument document not present', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    expect(getFinalApplicationStatus(data, 'en')).toBe('notAvailableYet');
  });

  test('should return correct status when isApplicationViewed is yes', () => {
    const data = {
      id: '1234',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      finalDocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              citizenFlags: {
                isApplicationViewed: 'Yes',
              },
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    };
    expect(getFinalApplicationStatus(data, 'en')).toBe('readyToView');
  });
});

describe('getYourWitnessStatementStatus', () => {
  test('should return correct state tag when witness statements present', () => {
    const data = {
      citizenUploadedDocumentList: [
        {
          id: '1234',
          value: {
            parentDocumentType: 'Witness statement',
            documentType: 'Your witness statements',
            partyName: 'MOCK_PARTY_NAME',
            isApplicant: 'Yes',
            uploadedBy: '1234',
            dateCreated: '1/1/2020',
            documentDetails: {
              documentName: 'MOCK_NAME',
              documentUploadedDate: '1/1/2020',
            },
            citizenDocument: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_filename: 'MOCK_DOCUMENT_FILENAME',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            },
            documentRequestedByCourt: 'No',
          },
        },
      ],
    };

    expect(getYourWitnessStatementStatus(data as Partial<CaseWithId>)).toBe('download');
  });

  test('should return correct state tag when witness statements not present', () => {
    const data = {
      citizenUploadedDocumentList: [
        {
          id: '1234',
          value: {
            parentDocumentType: 'Witness statement',
            documentType: 'Your position statements',
            partyName: 'MOCK_PARTY_NAME',
            isApplicant: 'Yes',
            uploadedBy: '1234',
            dateCreated: '1/1/2020',
            documentDetails: {
              documentName: 'MOCK_NAME',
              documentUploadedDate: '1/1/2020',
            },
            citizenDocument: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_filename: 'MOCK_DOCUMENT_FILENAME',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            },
            documentRequestedByCourt: 'No',
          },
        },
      ],
    };

    expect(getYourWitnessStatementStatus(data as Partial<CaseWithId>)).toBe('notAvailableYet');
  });
});
