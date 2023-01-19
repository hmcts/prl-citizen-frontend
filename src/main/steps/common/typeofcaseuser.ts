export const typeofcaseuser = (lang: string, casetype: string | undefined, isApplicant: boolean): string => {
  if (isApplicant) {
    if (lang === 'en') {
      return casetype === 'C100' ? 'C100-applicant' : 'FL401-applicant';
    } else {
      return casetype === 'C100 - welsh' ? 'C100-applicant-welsh' : 'FL401-applicant-welsh';
    }
  } else {
    if (lang === 'en') {
      return casetype === 'C100' ? 'C100-respondent' : 'FL401-respondent';
    } else {
      return casetype === 'C100 - welsh' ? 'C100-respondent-welsh' : 'FL401-respondent-welsh';
    }
  }
};
