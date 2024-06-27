import { CaseWithId } from '../../../app/case/case';
import { PartyDetails, YesOrNo } from '../../../app/case/definition';

import { mapResponseToAOH, prepareRespondToAOHRequest } from './respondToAOHMapper';

describe('tasklistresponse > respond-to-allegations-of-harm > respondToAOHMapper', () => {
  test('prepareRespondToAOHRequest should prepare data correctly', () => {
    expect(
      prepareRespondToAOHRequest({
        aoh_wishToRespond: 'Yes' as YesOrNo,
        aoh_responseToAllegations: 'test data',
      } as CaseWithId)
    ).toStrictEqual({
      responseToAllegationsOfHarmYesOrNoResponse: 'Yes',
      respondentResponseToAllegationOfHarm: 'test data',
    });
  });

  test('mapResponseToAOH should map data correctly', () => {
    expect(
      mapResponseToAOH({
        response: {
          responseToAllegationsOfHarmYesOrNoResponse: 'Yes' as YesOrNo,
          respondentResponseToAllegationOfHarm: 'test data',
        },
      } as unknown as PartyDetails)
    ).toStrictEqual({ aoh_wishToRespond: 'Yes', aoh_responseToAllegations: 'test data' });
  });
});
