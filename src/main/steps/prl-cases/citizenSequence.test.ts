import { AppRequest } from '../../app/controller/AppRequest';

import { citizenSequence } from './citizenSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(citizenSequence).toHaveLength(10);

    expect(citizenSequence[0].url).toBe('/dashboard');
    expect(citizenSequence[0].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[0].getNextStep({})).toBe('/dashboard');

    expect(citizenSequence[1].url).toBe('/pin-activation/enter-pin');
    expect(citizenSequence[1].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[1].getNextStep({})).toBe('/pin-activation/case-activated');

    expect(citizenSequence[2].url).toBe('/pin-activation/case-activated');
    expect(citizenSequence[2].showInSection).toBe('aboutEdgeCase');
    expect(
      citizenSequence[2].getNextStep({}, {
        session: { user: { id: '1234' }, userCase: { caseTypeOfApplication: 'C100' } },
      } as unknown as AppRequest)
    ).toBe('/task-list/applicant');

    expect(citizenSequence[3].url).toBe('/cookies');
    expect(citizenSequence[3].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[3].getNextStep({})).toBe('/cookies');

    expect(citizenSequence[4].url).toBe('/privacy-policy');
    expect(citizenSequence[4].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[4].getNextStep({})).toBe('/privacy-policy');

    expect(citizenSequence[5].url).toBe('/terms-and-conditions');
    expect(citizenSequence[5].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[5].getNextStep({})).toBe('/terms-and-conditions');

    expect(citizenSequence[6].url).toBe('/accessibility-statement');
    expect(citizenSequence[6].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[6].getNextStep({})).toBe('/accessibility-statement');

    expect(citizenSequence[7].url).toBe('/testing-support');
    expect(citizenSequence[7].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[7].getNextStep({})).toBe('/testing-support');

    expect(citizenSequence[8].url).toBe('/testing-support/create-Draft');
    expect(citizenSequence[8].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[8].getNextStep({})).toBe('/testing-support/create-Draft');

    expect(citizenSequence[9].url).toBe('/testing-support/delete-Draft');
    expect(citizenSequence[9].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[9].getNextStep({})).toBe('/testing-support/delete-Draft');
  });
});
