/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const nameAndGenderParser = (personalDetails, keys, HTML) => {
  let changeNameInformation = '';
  const hasNameChanged = personalDetails['hasNameChanged'];
  if (hasNameChanged === 'dontKnow') {
    changeNameInformation += keys['dontKnow'];
  } else {
    changeNameInformation += hasNameChanged;
  }
  if (hasNameChanged === 'yes') {
    const changedName = personalDetails['previousFullName'];
    changeNameInformation += HTML.RULER;
    changeNameInformation += HTML.H4;
    changeNameInformation += keys['details'];
    changeNameInformation += HTML.H4_CLOSE;
    changeNameInformation += HTML.BOTTOM_PADDING_3;
    changeNameInformation += changedName;
    changeNameInformation += HTML.BOTTOM_PADDING_CLOSE;
  }
  let childGender = '';
  childGender += personalDetails['gender'];
  if (personalDetails['otherGenderDetails'] !== '') {
    childGender +=
      HTML.BREAK +
      HTML.RULER +
      keys['otherGender'] +
      HTML.H4 +
      keys['details'] +
      HTML.H4_CLOSE +
      HTML.BREAK +
      personalDetails['otherGenderDetails'];
  }

  return { changeNameInformation, childGender };
};
