export interface PcqParameters {
  serviceId: string;
  actor: string;
  pcqId: string;
  partyId: string;
  returnUrl: string;
  language: string;
}

export interface StatusResponse {
  status: 'UP' | 'DOWN' | undefined;
}
