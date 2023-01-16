export const typeofcaseuser = (lang: string, casetype: string | undefined): string => {
  if (lang === 'en') {
    return casetype === 'C100' ? 'C100' : 'FL401';
  } else {
    return casetype === 'C100 - welsh' ? 'C100 - welsh' : 'FL401 - welsh';
  }
};
