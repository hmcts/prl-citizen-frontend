export class CaseActivationNotAllowedError extends Error {
  constructor() {
    super('The case is not ready for citizen activation');
  }
}
