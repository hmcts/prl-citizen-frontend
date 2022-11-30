import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { Gender, YesNoEmpty } from '../../../app/case/definition';

import { getApplicantDetails, transformFormData, updateApplicantDetails } from './util';

describe('transformFormData', () => {
  const formData = {
    haveYouChangeName: null,
    applPreviousName: 'string',
    dateOfBirth: {
      year: '',
      month: '',
      day: '',
    },
    gender: Gender.FEMALE,
    otherGenderDetails: 'string',
    applicantPlaceOfBirth: 'string',
  };

  const formData2 = {
    haveYouChangeName: 'Yes',
    applPreviousName: 'string',
    dateOfBirth: {
      year: '',
      month: '',
      day: '',
    },
    gender: Gender.FEMALE,
    otherGenderDetails: 'string',
    applicantPlaceOfBirth: 'string',
  };

  const formData3 = {
    haveYouChangeName: 'Yes',
    applPreviousName: 'string',
    dateOfBirth: {
      year: '',
      month: '',
      day: '',
    },
    gender: Gender.OTHER,
    otherGenderDetails: 'string',
    applicantPlaceOfBirth: 'string',
  };
  test('should transform Data', async () => {
    expect(transformFormData('personalDetails', formData)).toEqual({
      haveYouChangeName: '',
      applPreviousName: '',
      dateOfBirth: {
        year: '',
        month: '',
        day: '',
      },
      gender: 'Female',
      otherGenderDetails: '',
      applicantPlaceOfBirth: 'string',
    });
  });

  test('should transform Data > haveYouChangeName', async () => {
    expect(transformFormData('personalDetails', formData2)).toEqual({
      haveYouChangeName: 'Yes',
      applPreviousName: 'string',
      dateOfBirth: {
        year: '',
        month: '',
        day: '',
      },
      gender: 'Female',
      otherGenderDetails: '',
      applicantPlaceOfBirth: 'string',
    });
  });

  test('should transform data > other gender', async () => {
    expect(transformFormData('personalDetails', formData3)).toEqual({
      haveYouChangeName: 'Yes',
      applPreviousName: 'string',
      dateOfBirth: {
        year: '',
        month: '',
        day: '',
      },
      gender: Gender.OTHER,
      otherGenderDetails: 'string',
      applicantPlaceOfBirth: 'string',
    });
  });
});

describe('getApplicantDetails + updateApplicantDetails', () => {
  const mockReq = mockRequest({
    session: {
      userCase: {
        appl_allApplicants: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',

            personalDetails: {
              haveYouChangeName: YesNoEmpty.YES,
              applPreviousName: 'Test1',
              dateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              gender: 'Male',
              applicantPlaceOfBirth: '',
            },
          },
        ],
      },
    },
    params: {
      applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
    },
  });

  const applicantDetails = {
    id: '7483640e-0817-4ddc-b709-6723f7925474',
    applicantFirstName: 'Jane',
    applicantLastName: 'Jones',

    personalDetails: {
      haveYouChangeName: YesNoEmpty.YES,
      applPreviousName: 'Test1',
      dateOfBirth: {
        year: '1987',
        month: '12',
        day: '12',
      },
      gender: Gender.MALE,
      applicantPlaceOfBirth: '',
    },
  };

  test('should getApplicantDetails', async () => {
    expect(getApplicantDetails(mockReq.session.userCase.appl_allApplicants, mockReq.params.applicantId)).toEqual({
      id: '7483640e-0817-4ddc-b709-6723f7925474',
      applicantFirstName: 'dummy',
      applicantLastName: 'Test',

      personalDetails: {
        haveYouChangeName: YesNoEmpty.YES,
        applPreviousName: 'Test1',
        dateOfBirth: {
          year: '1987',
          month: '12',
          day: '12',
        },
        gender: 'Male',
        applicantPlaceOfBirth: '',
      },
    });
  });

  test('should updateApplicantDetails', async () => {
    expect(updateApplicantDetails(mockReq.session.userCase.appl_allApplicants, applicantDetails)).toEqual([
      {
        id: '7483640e-0817-4ddc-b709-6723f7925474',
        applicantFirstName: 'Jane',
        applicantLastName: 'Jones',

        personalDetails: {
          haveYouChangeName: YesNoEmpty.YES,
          applPreviousName: 'Test1',
          dateOfBirth: {
            year: '1987',
            month: '12',
            day: '12',
          },
          gender: 'Male',
          applicantPlaceOfBirth: '',
        },
      },
    ]);
  });
});
