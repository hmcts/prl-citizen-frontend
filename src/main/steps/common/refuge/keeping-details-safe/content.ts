import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

const en = {
  title: 'Keeping your details safe',
  understandSafety: 'We understand how important it is to feel safe, and know that your details will be kept private.',
  detailsKeptConfidential:
    'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.',
  helpKeepDetailsPrivate:
    'To help us to keep your details safe, do not include them in any other communications during the case.',
  continue: 'Continue',
  cancel: 'Cancel',
};

const cy: typeof en = {
  title: 'Keeping your details safe (welsh)',
  understandSafety:
    'We understand how important it is to feel safe, and know that your details will be kept private. (welsh)',
  detailsKeptConfidential:
    'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else. (welsh)',
  helpKeepDetailsPrivate:
    'To help us to keep your details safe, do not include them in any other communications during the case. (welsh)',
  continue: 'Continue',
  cancel: 'Canslo',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent = (content: CommonContent): PageContent => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
