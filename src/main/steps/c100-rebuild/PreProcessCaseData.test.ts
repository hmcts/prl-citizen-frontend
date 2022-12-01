import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { MiamNonAttendReason, YesOrNo } from '../../app/case/definition';
import { C100_URL } from '../urls';

import PreProcessCaseData from './PreProcessCaseData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Basic field form > PreProcessCaseData ()', () => {
  const mockForm = {
    fields: {
      otherPersonFirstName: {
        type: 'text',
      },
      otherPersonLastName: {
        type: 'text',
      },
    },
    onlycontinue: {
      text: l => l.onlycontinue,
    },
    saveAndComeLater: {
      text: l => l.saveAndComeLater,
    },
  };

  const formDummyData = {
    otherPersonFirstName: 'Jane',
    otherPersonLastName: 'John',
  };

  const req = mockRequest({
    session: {
      userCase: {
        otherPersonFirstName: '',
        otherPersonLastName: '',
      },
    },
  });

  test('If req.path does not start with C100_URL return case data', async () => {
    req.path = '/dummyPath';

    const PreProcessFunction = PreProcessCaseData.clean(
      mockForm.fields,
      formDummyData,
      req.session.userCase,
      !req.path.startsWith(`${C100_URL}`)
    );

    const PreProcessResponse = {
      otherPersonFirstName: 'Jane',
      otherPersonLastName: 'John',
    };

    expect(PreProcessFunction).toEqual(PreProcessResponse);
  });

  test('If req.path starts with C100_URL return case data', async () => {
    req.path = '/c100-rebuild/dummyPath';

    const PreProcessFunction = PreProcessCaseData.clean(
      mockForm.fields,
      formDummyData,
      req.session.userCase,
      !req.path.startsWith(`${C100_URL}`)
    );

    const PreProcessResponse = {
      otherPersonFirstName: 'Jane',
      otherPersonLastName: 'John',
    };

    expect(PreProcessFunction).toEqual(PreProcessResponse);
  });
});

describe('Checkbox field form > PreProcessCaseData ()', () => {
  const mockCheckBoxForm = {
    fields: {
      miam_nonAttendanceReasons: {
        type: 'checkboxes',
        values: [
          {
            name: 'miam_nonAttendanceReasons',
            value: 'domesticViolence',
          },
          {
            name: 'miam_nonAttendanceReasons',
            value: 'childProtection',
          },
          {
            name: 'miam_nonAttendanceReasons',
            value: 'urgentHearing',
          },
          {
            name: 'miam_nonAttendanceReasons',
            value: 'previousMIAMOrExempt',
          },
        ],
      },
    },
    onlycontinue: {
      text: l => l.onlycontinue,
    },
    saveAndComeLater: {
      text: l => l.saveAndComeLater,
    },
  };

  const mockSubFieldForm = {
    fields: {
      unableForCourtProceedings: {
        type: 'checkboxes',
        values: [
          {
            label: l => l.no,
            value: YesOrNo.NO,
            subFields: {
              courtProceedingProvideDetails: {
                type: 'text',
                label: 'Subfield',
              },
              miam_nonAttendanceReasons: {
                type: 'checkboxes',
                values: [
                  {
                    name: 'miam_nonAttendanceReasons',
                    value: 'urgentHearing',
                  },
                  {
                    name: 'miam_nonAttendanceReasons',
                    value: 'previousMIAMOrExempt',
                  },
                ],
              },
            },
          },
          { label: l => l.yes, value: YesOrNo.YES },
        ],
      },
    },
    submit: {
      text: l => l.continue,
    },
    saveAsDraft: {
      text: l => l.saveAsDraft,
    },
  };

  test('If field type is checkbox', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          miam_nonAttendanceReasons: [],
        },
      },
    });

    const formDummyData = {
      miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT, MiamNonAttendReason.EXEMPT],
    };

    req.path = '/c100-rebuild/dummyPath';

    const PreProcessFunction = PreProcessCaseData.clean(
      mockCheckBoxForm.fields,
      formDummyData,
      req.session.userCase,
      !req.path.startsWith(`${C100_URL}`)
    );

    const PreProcessResponse = {
      miam_nonAttendanceReasons: ['urgentHearing', 'validExemption'],
    };

    expect(PreProcessFunction).toEqual(PreProcessResponse);
  });

  test('If field type is checkbox with subFields', async () => {
    // const subFieldForm = new Form(<FormFields>mockSubFieldForm.fields);

    const req = mockRequest({
      session: {
        userCase: {
          courtProceedingProvideDetails: '',
          unableForCourtProceedings: '',
          miam_nonAttendanceReasons: [],
        },
      },
    });

    const formDummyData = {
      miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT, MiamNonAttendReason.PREV_MIAM],
      courtProceedingProvideDetails: 'testValue',
      unableForCourtProceedings: YesOrNo.NO,
    };

    req.path = '/c100-rebuild/dummyPath';

    const PreProcessFunction = PreProcessCaseData.clean(
      mockSubFieldForm.fields,
      formDummyData,
      req.session.userCase,
      !req.path.startsWith(`${C100_URL}`)
    );

    const PreProcessResponse = {
      miam_nonAttendanceReasons: ['urgentHearing', 'previousMIAMOrExempt'],
      courtProceedingProvideDetails: 'testValue',
      unableForCourtProceedings: 'No',
    };

    expect(PreProcessFunction).toEqual(PreProcessResponse);
  });
});

describe('Checkbox field form > PreProcessCaseData () > Fields not present', () => {
  const mockSubFieldForm = {
    fields: {
      unableForCourtProceedings: {
        type: 'checkboxes',
        values: [
          {
            label: l => l.no,
            value: YesOrNo.NO,
            subFields: {
              courtProceedingProvideDetails: {
                type: 'text',
                label: 'Subfield',
              },
              miam_nonAttendanceReasons: {
                type: 'checkboxes',
                values: [
                  {
                    name: 'miam_nonAttendanceReasons',
                    value: 'urgentHearing',
                  },
                  {
                    name: 'miam_nonAttendanceReasons',
                    value: 'previousMIAMOrExempt',
                  },
                ],
              },
            },
          },
          { label: l => l.yes, value: YesOrNo.YES },
        ],
      },
    },
    submit: {
      text: l => l.continue,
    },
    saveAsDraft: {
      text: l => l.saveAsDraft,
    },
  };

  test('If field type is checkbox but subfields are not present', async () => {
    // const subFieldForm = new Form(<FormFields>mockSubFieldForm.fields);

    const req = mockRequest({
      session: {
        userCase: {
          courtProceedingProvideDetails: '',
          unableForCourtProceedings: '',
          miam_nonAttendanceReasons: [],
        },
      },
    });

    const formDummyData = {
      miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT, MiamNonAttendReason.PREV_MIAM],
      courtProceedingProvideDetails: 'testValue',
      unableForCourtProceedings: YesOrNo.YES,
    };

    req.path = '/c100-rebuild/dummyPath';

    const PreProcessFunction = PreProcessCaseData.clean(
      mockSubFieldForm.fields,
      formDummyData,
      req.session.userCase,
      !req.path.startsWith(`${C100_URL}`)
    );

    const PreProcessResponse = {
      unableForCourtProceedings: 'Yes',
    };

    expect(PreProcessFunction).toEqual(PreProcessResponse);
  });
});
