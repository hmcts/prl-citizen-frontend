export class HearingDetailsRequest {
  caseId: string;
  partyName: string;
  eventId: string;

  constructor(caseId: string, partyName: string, eventId: string) {
    this.caseId = caseId;
    this.partyName = partyName;
    this.eventId = eventId;
  }
}
