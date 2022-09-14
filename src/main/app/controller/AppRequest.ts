import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { CaseApi } from '../case/CaseApi';
import { Case, CaseWithId } from '../case/case';
import { YesOrNo } from '../case/definition';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    logger: LoggerInstance;
    api: CaseApi;
  };
  body: T;
}

export interface AppSession extends Session {
  paymentError: boolean;
  user: UserDetails;
  userCase: CaseWithId;
  eligibility: Eligibility;
  lang: string | undefined;
  errors: FormError[] | undefined;
  addresses: [];
  returnUrl?: string;
  accessCodeLoginIn: boolean;
  settings: ApplicationSettings;
}

export type childernDetails = {
  id: undefined | string;
  firstname: string | unknown;
  lastname: string | unknown;
  personalDetails?: {
    DateoBirth: string;
    isDateOfBirthKnown: YesOrNo;
    ApproximateDateOfBirth: string;
    Sex: string | unknown;
  };
  childMatter?: {
    isDecisionTaken: string | unknown;
  };
  parentialResponsibility?: {
    statement: string | unknown;
  };
};

export interface ApplicationSettings {
  toggleChild: number;
  childTemporaryFormData: {
    TempFirstName: string | unknown;
    TempLastName: string | unknown;
  };
  ListOfChild: childernDetails[];
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
