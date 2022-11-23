// import s from 'connect-redis';
import * as fs from 'fs';

import { NextFunction } from 'express';
import QueryString from 'query-string';

import { Case } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { applicantCaseSequence } from './applicant/applicantCaseSequence';
import { parseUrl } from './common/url-parser';
import { Step } from './constants';
import { citizenSequence } from './prl-cases/citizenSequence';
import { respondentCaseSequence } from './respondent/respondentcaseSequence';
import { responseCaseSequence } from './tasklistresponse/responseCaseSequence';
import { CITIZEN_HOME_URL, PRL_CASE_URL, PageLink } from './urls';

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

// const getNextIncompleteStep = (
//   data: CaseWithId,
//   step: Step,
//   sequence: Step[],
//   removeExcluded = false,
//   checkedSteps: Step[] = []
// ): string => {
//   const stepForm = stepForms[step.url];
//   // if this step has a form
//   if (stepForm !== undefined) {
//     if (!stepForm.isComplete(data)) {
//       return removeExcluded && checkedSteps.length && step.excludeFromContinueApplication
//         ? checkedSteps[checkedSteps.length - 1].url
//         : step.url;
//     } else {
//       const nextStepUrl = step.getNextStep(data);
//       const nextStep = sequence.find(s => s.url === nextStepUrl);

//       return nextStep
//         ? getNextIncompleteStep(data, nextStep, sequence, removeExcluded, checkedSteps.concat(step))
//         : CITIZEN_HOME_URL;
//     }
//   }

//   // if the page has no form then ask it where to go
//   return step.getNextStep(data);
// };

// export const getNextIncompleteStepUrl = (req: AppRequest): string => {
//   const { queryString } = getPathAndQueryString(req);
//   const sequence = getUserSequence();
//   const url = getNextIncompleteStep(req.session.userCase, sequence[0], sequence, true);

//   return `${url}${queryString}`;
// };

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
  ].find(s => s.url === path);

  //const url = nextStep ? nextStep.getNextStep(data) : CITIZEN_HOME_URL;
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

// const getUserSequence = () => {
//   return edgecaseSequence;
// };

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
  for (const step of sequence) {
    const { url } = parseUrl(step.url);
    const stepDir = `${dir}${url.startsWith(subDir) ? url : `${subDir}${url}`}`;
    const { content, view } = getStepFiles(stepDir);
    results.push({ stepDir, ...step, ...content, view });
  }
  return results;
};

export const stepsWithContentEdgecase = getStepsWithContent(citizenSequence, PRL_CASE_URL);
export const stepsWithContentRespondent = getStepsWithContent(respondentCaseSequence);
export const stepsWithContentApplicant = getStepsWithContent(applicantCaseSequence);
export const stepsWithContentC7response = getStepsWithContent(responseCaseSequence);

export const stepsWithContent = [
  ...stepsWithContentEdgecase,
  ...stepsWithContentRespondent,
  ...stepsWithContentApplicant,
  ...stepsWithContentC7response,
];

const getPathAndQueryStringFromUrl = (url: PageLink): { path: string; queryString: string } => {
  const [path, searchParams] = url.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};
