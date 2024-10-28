import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { C100Applicant, C100RebuildPartyDetails, PartyType } from '../../../app/case/definition';
import { People } from '../../c100-rebuild/people/util';

import { deleteC100RefugeDoc, deleteDocument, getC8DocumentForC100, updateApplicantOtherPersonDetails } from './utils';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('C8 refuge > utils', () => {
  describe('deleteDocument', () => {
    let req;
    let res;

    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });

    test('should delete document with no errors', async () => {
      req.params = { removeFileId: '1234' };
      req.session.userCase.refugeDocument = {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      };
      deleteDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res, '1234');

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-document');
      expect(req.session.userCase.refugeDocument).toBe(undefined);
      expect(req.session.errors).toStrictEqual([]);
    });

    test('should delete document with no errors for c100 applicant', async () => {
      req.params = { id: '7483640e-0817-4ddc-b709-6723f7925474', removeFileId: '1234' };
      req.originalUrl = '/c100-rebuild';
      req.session.userCase.appl_allApplicants = [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];
      deleteDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res, '1234', '7483640e-0817-4ddc-b709-6723f7925474');

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(
        '/c100-rebuild/refuge/upload-refuge-document/7483640e-0817-4ddc-b709-6723f7925474'
      );
      expect(req.session.userCase.appl_allApplicants[0].refugeConfidentialityC8Form).toBe(undefined);
      expect(req.session.errors).toStrictEqual([]);
    });

    test('should delete document with no errors for c100 other person', async () => {
      req.params = { id: '6b792169-84df-4e9a-8299-c2c77c9b7e58', removeFileId: '1234' };
      req.originalUrl = '/c100-rebuild';
      req.session.userCase.oprs_otherPersons = [
        {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          firstName: 'Test',
          lastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];
      deleteDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res, '1234', '6b792169-84df-4e9a-8299-c2c77c9b7e58');

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(
        '/c100-rebuild/refuge/upload-refuge-document/6b792169-84df-4e9a-8299-c2c77c9b7e58'
      );
      expect(req.session.userCase.oprs_otherPersons[0].refugeConfidentialityC8Form).toBe(undefined);
      expect(req.session.errors).toStrictEqual([]);
    });

    test('should catch error when deleting document', async () => {
      req.params = { removeFileId: '1234' };
      req.session.userCase.refugeDocument = {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      };
      deleteDocumentMock.mockRejectedValue('Failure');

      await deleteDocument(req, res, '1234');

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-document');
      expect(req.session.userCase.refugeDocument).toStrictEqual({
        document_binary_url: 'binary/test2/1234',
        document_creation_date: '1/1/2024',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_url: 'test2/1234',
      });
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'deleteError',
          propertyName: 'c8RefugeDocument',
        },
      ]);
    });
  });

  describe('deleteC100RefugeDoc', () => {
    let req;

    beforeEach(() => {
      req = mockRequest();
    });

    test('should delete document for c100 applicant', () => {
      req.session.userCase.appl_allApplicants = [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];
      deleteC100RefugeDoc(req, req.session.userCase, '7483640e-0817-4ddc-b709-6723f7925474');
      expect(req.session.userCase.appl_allApplicants[0].refugeConfidentialityC8Form).toBe(undefined);
    });

    test('should delete document for c100 other person', () => {
      req.session.userCase.oprs_otherPersons = [
        {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          firstName: 'Test',
          lastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];
      deleteC100RefugeDoc(req, req.session.userCase, '6b792169-84df-4e9a-8299-c2c77c9b7e58');
      expect(req.session.userCase.oprs_otherPersons[0].refugeConfidentialityC8Form).toBe(undefined);
    });
  });

  describe('getC8DocumentForC100', () => {
    let req;

    beforeEach(() => {
      req = mockRequest();
    });

    test('should get c8 document for applicant', () => {
      req.session.userCase.appl_allApplicants = [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];

      expect(
        getC8DocumentForC100('7483640e-0817-4ddc-b709-6723f7925474', req.session.userCase, {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'dummy',
          lastName: 'Test',
          partyType: PartyType.APPLICANT,
        })
      ).toStrictEqual({
        document_url: 'MOCK_URL',
        document_binary_url: 'MOCK_BINARY_URL',
        document_filename: 'MOCK_FILENAME',
      });
    });

    test('should get c8 document for other person', () => {
      req.session.userCase.oprs_otherPersons = [
        {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          firstName: 'Test',
          lastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];

      expect(
        getC8DocumentForC100('6b792169-84df-4e9a-8299-c2c77c9b7e58', req.session.userCase, {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          firstName: 'dummy',
          lastName: 'Test',
          partyType: PartyType.OTHER_PERSON,
        })
      ).toStrictEqual({
        document_url: 'MOCK_URL',
        document_binary_url: 'MOCK_BINARY_URL',
        document_filename: 'MOCK_FILENAME',
      });
    });
  });

  describe('updateApplicantOtherPersonDetails', () => {
    let req;

    beforeEach(() => {
      req = mockRequest();
    });

    test('should update applicant details', () => {
      req.session.userCase.appl_allApplicants = [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];

      expect(
        updateApplicantOtherPersonDetails(
          req.session.userCase,
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',
            liveInRefuge: 'No',
          } as unknown as C100Applicant,
          [
            {
              id: '7483640e-0817-4ddc-b709-6723f7925474',
              applicantFirstName: 'dummy',
              applicantLastName: 'Test',
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
            {
              id: '7483640e-0817-4ddc-b709-6723f7925475',
              applicantFirstName: 'dummy',
              applicantLastName: 'Test',
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
          ] as unknown as People[],
          true
        )
      ).toStrictEqual({
        appl_allApplicants: [
          {
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            liveInRefuge: 'No',
          },
          {
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',
            id: '7483640e-0817-4ddc-b709-6723f7925475',
            liveInRefuge: 'Yes',
            refugeConfidentialityC8Form: {
              document_binary_url: 'MOCK_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_url: 'MOCK_URL',
            },
          },
        ],
        id: '1234',
      });
    });

    test('should update other person details details', () => {
      req.session.userCase.oprs_otherPersons = [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'dummy',
          lastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ];

      expect(
        updateApplicantOtherPersonDetails(
          req.session.userCase,
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            firstName: 'dummy',
            lastName: 'Test',
            liveInRefuge: 'No',
          } as unknown as C100RebuildPartyDetails,
          [
            {
              id: '7483640e-0817-4ddc-b709-6723f7925474',
              firstName: 'dummy',
              lastName: 'Test',
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
            {
              id: '7483640e-0817-4ddc-b709-6723f7925475',
              firstName: 'dummy',
              lastName: 'Test',
              liveInRefuge: 'Yes',
              refugeConfidentialityC8Form: {
                document_url: 'MOCK_URL',
                document_binary_url: 'MOCK_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
              },
            },
          ] as unknown as People[],
          false
        )
      ).toStrictEqual({
        oprs_otherPersons: [
          {
            firstName: 'dummy',
            lastName: 'Test',
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            liveInRefuge: 'No',
          },
          {
            firstName: 'dummy',
            lastName: 'Test',
            id: '7483640e-0817-4ddc-b709-6723f7925475',
            liveInRefuge: 'Yes',
            refugeConfidentialityC8Form: {
              document_binary_url: 'MOCK_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_url: 'MOCK_URL',
            },
          },
        ],
        id: '1234',
      });
    });
  });
});
