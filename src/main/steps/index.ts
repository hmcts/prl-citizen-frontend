import * as fs from 'fs';

import { NextFunction, Response } from 'express';
import QueryString from 'query-string';

// eslint-disable-next-line import/no-unresolved
import { Case } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { applicantCaseSequence } from './applicant/applicantCaseSequence';
import { C100Sequence } from './c100-rebuild/c100sequence';
import { parseUrl } from './common/url-parser';
import { Step } from './constants';
import { citizenSequence } from './prl-cases/citizenSequence';
import { respondentCaseSequence } from './respondent/respondentcaseSequence';
import { responseCaseSequence } from './tasklistresponse/responseCaseSequence';
// eslint-disable-next-line import/no-unresolved
import { C100_URL, CITIZEN_HOME_URL, PRL_CASE_URL, PageLink } from './urls';

const stepForms: Record<string, Form> = {};

[citizenSequence].forEach((sequence: Step[], i: number) => {
  const dir = __dirname + (i === 0 ? '/edge-case' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content.ts`;
    if (fs.existsSync(stepContentFile)) {
      const content = require(stepContentFile);

      if (content.form) {
        stepForms[step.url] = new Form(content.form.fields);
      }
    }
  }
});

export const getNextStepUrl = (req: AppRequest, data: Partial<Case>): string => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((req.body as any).saveAsDraft) {
    return CITIZEN_HOME_URL;
  }
  const { path, queryString: queryStr } = getPathAndQueryString(req);
  const nextStep = [
    ...citizenSequence,
    ...respondentCaseSequence,
    ...applicantCaseSequence,
    ...responseCaseSequence,
    ...C100Sequence,
  ].find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data, req) : CITIZEN_HOME_URL;
  const { path: urlPath, queryString: urlQueryStr } = getPathAndQueryStringFromUrl(url);
  let queryString = '';
  let finalQueryString = {
    ...QueryString.parse(queryStr),
    ...QueryString.parse(urlQueryStr),
  } as Record<string, string>;

  if (nextStep?.sanitizeQueryString) {
    finalQueryString = nextStep?.sanitizeQueryString(path, urlPath, { ...finalQueryString });
  }

  if (Object.values(finalQueryString).length) {
    queryString = `?${QueryString.stringify(finalQueryString)}`;
  }

  return `${urlPath}${queryString}`;
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const path = req.route.path;
  const [, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};

const getStepFiles = (stepDir: string) => {
  const stepContentFile = `${stepDir}/content.ts`;
  const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
  const stepViewFile = `${stepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : `${stepDir}/../../common/template.njk`;

  return { content, view };
};

type RouteGuard = {
  get?: (req: AppRequest, res: Response, next: NextFunction) => Promise<void>;
  post?: (req: AppRequest, res: Response, next: NextFunction) => Promise<void>;
};

export type StepWithContent = Step & {
  stepDir: string;
  generateContent: TranslationFn;
  form: FormContent;
  view: string;
  routeGuard?: RouteGuard;
};
const getStepsWithContent = (sequence: Step[], subDir = ''): StepWithContent[] => {
  const dir = __dirname;

  const results: StepWithContent[] = [];

  if (sequence?.length) {
    for (const step of sequence) {
      const { url } = parseUrl(step.url);
      const subdirurl = url.startsWith(subDir) ? url : `${subDir}${url}`;
      const stepDir = `${dir}${subdirurl}`;
      const { content, view } = getStepFiles(stepDir);
      results.push({ stepDir, ...step, ...content, view });
    }
  }

  return results;
};

export const stepsWithContentEdgecase = getStepsWithContent(citizenSequence, PRL_CASE_URL);
export const stepsWithContentRespondent = getStepsWithContent(respondentCaseSequence);
export const stepsWithContentApplicant = getStepsWithContent(applicantCaseSequence);
export const stepsWithContentC7response = getStepsWithContent(responseCaseSequence);
export const c100CaseSequence = getStepsWithContent(C100Sequence, C100_URL);

export const stepsWithContent = [
  ...stepsWithContentEdgecase,
  ...stepsWithContentRespondent,
  ...stepsWithContentApplicant,
  ...stepsWithContentC7response,
  ...c100CaseSequence,
];

const getPathAndQueryStringFromUrl = (url: PageLink): { path: string; queryString: string } => {
  const [path, searchParams] = url.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};
