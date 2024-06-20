import { updateFormFields,form as c100Form, generateFormFields, languages  } from '../../../../../steps/common/safety-concerns/party/report-abuse/content';
import { CaseWithId } from '../../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbuse } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { getDataShape } from '../../util';
import { generateContent as commonContent } from '../content';
export * from './routeGuard';


export const form = c100Form
export const getFormFields = (caseData: Partial<CaseWithId>, abuseType: C1AAbuseTypes): FormContent => {
  const sessionData: C1ASafteyConcernsAbuse = caseData?.c1A_safteyConcerns?.applicant?.[abuseType];

  return updateFormFields(form, generateFormFields(sessionData ?? getDataShape().abuse).fields);
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPageTitle = (abuseType: C1AAbuseTypes, translations: Record<string, any>) => {
  return translations[`${abuseType}PageTitle`];
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const abuseType: C1AAbuseTypes = content.additionalData!.req.params.abuseType;
  const sessionData: C1ASafteyConcernsAbuse = content.userCase?.c1A_safteyConcerns?.applicant?.[abuseType];
  const { fields } = generateFormFields(sessionData ?? getDataShape().abuse);

  return {
    ...translations,
    ...commonContent(content),
    title: getPageTitle(abuseType, translations),
    form: updateFormFields(form, fields),
  };
};
