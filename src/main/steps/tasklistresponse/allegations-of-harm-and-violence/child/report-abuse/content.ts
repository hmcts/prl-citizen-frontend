import { C1AAbuseTypes, C1ASafteyConcernsAbuse, Child1 } from '../../../../../app/case/definition';
import { form as c100Form, generateFormFields, languages, updateFormFields } from '../../../../common/safety-concerns/child/report-abuse/content'
import { CaseWithId } from '../../../../../app/case/case';
import { FormContent } from '../../../../../app/form/Form';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getDataShape } from '../../../../../steps/common/safety-concerns/util';
import { generateContent as commonContent } from '../content'
export * from './routeGuard';

export const form = c100Form

export const getFormFields = (caseData: Partial<CaseWithId>, abuseType: C1AAbuseTypes): FormContent => {
  const sessionData: C1ASafteyConcernsAbuse = caseData?.c1A_safteyConcerns?.child?.[abuseType];
  const sessionChildrenData = caseData?.children ?? [];
  //const sessionChildrenID = content.userCase?.children?.map(i=>i.id) ?? [];
  let data1: Child1[];
  data1=(sessionChildrenData.map(i => {return{
    id: i.id,
  value: i.value.firstName+i.value.lastName,}}))
  return updateFormFields(
    form,
    generateFormFields(sessionData ?? getDataShape().abuse, data1).fields
  );
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPageTitle = (abuseType: C1AAbuseTypes, translations: Record<string, any>) => {
  return translations[`${abuseType}PageTitle`];
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const abuseType: C1AAbuseTypes = content.additionalData!.req.params.abuseType;
  const sessionData: C1ASafteyConcernsAbuse = content.userCase?.c1A_safteyConcerns?.child?.[abuseType];
  const sessionChildrenData = content.userCase?.children ?? [];
  //const sessionChildrenID = content.userCase?.children?.map(i=>i.id) ?? [];
  let data1: Child1[];
  data1=(sessionChildrenData.map(i => {return{
    id: i.id,
  value: i.value.firstName+i.value.lastName,}}))
  const { fields } = generateFormFields(sessionData ?? getDataShape().abuse, data1);

  return {
    ...translations,
    ...commonContent(content),
    title: getPageTitle(abuseType, translations),
    form: updateFormFields(form, fields),
  };
};
