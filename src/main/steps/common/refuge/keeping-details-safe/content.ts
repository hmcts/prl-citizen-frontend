import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { C100_URL } from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';

const en = {
  title: 'Keeping {name} details safe',
  understandSafety:
    'We understand how important it is to feel safe, and know that {name} details will be kept private.',
  detailsKeptConfidential:
    '{name} details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.',
  helpKeepDetailsPrivate:
    'To help us to keep {name} details safe, do not include {details} in any other communications during the case.',
  continue: 'Continue',
  cancel: 'Cancel',
  plural: "'s",
  your: 'your',
  capitalYour: 'Your',
  details: 'their details',
  them: 'them',
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
  plural: "'s",
  your: 'your',
  capitalYour: 'Your',
  details: 'their details',
  them: 'them',
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
  const c100Person = getPeople(content.userCase!).find(
    person => person.id === content.additionalData?.req.params.applicantId
  )!;
  const C100rebuildJourney = content.additionalData?.req?.originalUrl?.startsWith(C100_URL);

  if (C100rebuildJourney) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });
  }

  return {
    ...translations,
    title: interpolate(translations.title, {
      name: C100rebuildJourney
        ? `${c100Person.firstName} ${c100Person.lastName}${translations.plural}`
        : translations.your,
    }),
    understandSafety: interpolate(translations.understandSafety, {
      name: C100rebuildJourney
        ? `${c100Person.firstName} ${c100Person.lastName}${translations.plural}`
        : translations.your,
    }),
    detailsKeptConfidential: interpolate(translations.detailsKeptConfidential, {
      name: C100rebuildJourney
        ? `${c100Person.firstName} ${c100Person.lastName}${translations.plural}`
        : translations.capitalYour,
    }),
    helpKeepDetailsPrivate: interpolate(translations.helpKeepDetailsPrivate, {
      name: C100rebuildJourney
        ? `${c100Person.firstName} ${c100Person.lastName}${translations.plural}`
        : translations.your,
      details: C100rebuildJourney ? translations.details : translations.them,
    }),
    form,
  };
};
