/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { PaymentError } from '../../app/case/definition';
import { CaseApi as C100Api } from '../case/C100CaseApi';
import { CaseApi } from '../case/CaseApi';
import { Case, CaseWithId } from '../case/case';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    logger: LoggerInstance;
    api: CaseApi;
    C100Api: C100Api;
  };
  body: T;
}

export interface AppSession extends Session {
  enableCaseTrainTrack: boolean;
  testingSupport: boolean;
  paymentError: PaymentError;
  user: UserDetails;
  userCase: CaseWithId;
  userCaseList: CaseWithId[];
  eligibility: Eligibility;
  lang: string | undefined;
  errors: FormError[] | undefined;
  addresses: [];
  returnUrl?: string;
  accessCodeLoginIn: boolean;
  c100RebuildLdFlag: boolean;
  applicationSettings?: Record<string, any>;
  enableC100CaseProgressionTrainTrack: boolean;
}
export interface UserDetails {
  accessToken: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
}

export interface Eligibility {
  under18Eligible?: string;
  marriedEligible?: string;
  livedUKEligible?: string;
  under21Eligible?: string;
}
