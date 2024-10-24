import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { C100_URL } from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';

const en = {
  c100: {
    title: "Keeping {name}'s details safe",
    understandSafety:
      "We understand how important it is to feel safe, and know that {name}'s details will be kept private.",
    detailsKeptConfidential:
      "{name}'s details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.",
    helpKeepDetailsPrivate:
      "To help us to keep {name}'s details safe, do not include their details in any other communications during the case.",
  },
  applicantRespondent: {
    title: 'Keeping your details safe',
    understandSafety:
      'We understand how important it is to feel safe, and know that your details will be kept private.',
    detailsKeptConfidential:
      'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.',
    helpKeepDetailsPrivate:
      'To help us to keep your details safe, do not include them in any other communications during the case.',
  },
  continue: 'Continue',
  cancel: 'Cancel',
};

const cy: typeof en = {
  c100: {
    title: "Keeping {name}'s details safe (welsh)",
    understandSafety:
      "We understand how important it is to feel safe, and know that {name}'s details will be kept private. (welsh)",
    detailsKeptConfidential:
      "{name}'s details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else. (welsh)",
    helpKeepDetailsPrivate:
      "To help us to keep {name}'s details safe, do not include their details in any other communications during the case. (welsh)",
  },
  applicantRespondent: {
    title: 'Keeping your details safe (welsh)',
    understandSafety:
      'We understand how important it is to feel safe, and know that your details will be kept private. (welsh)',
    detailsKeptConfidential:
      'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else. (welsh)',
    helpKeepDetailsPrivate:
      'To help us to keep your details safe, do not include them in any other communications during the case. (welsh)',
  },
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
  const c100Person = getPeople(content.userCase!).find(person => person.id === content.additionalData?.req.params.id)!;
  const C100rebuildJourney = content.additionalData?.req?.originalUrl?.startsWith(C100_URL);

  delete form.saveAndComeLater;
  if (C100rebuildJourney) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });
  }

  return {
    ...translations,
    title: C100rebuildJourney
      ? interpolate(translations.c100.title, {
          name: `${c100Person.firstName} ${c100Person.lastName}`,
        })
      : translations.applicantRespondent.title,
    understandSafety: C100rebuildJourney
      ? interpolate(translations.c100.understandSafety, {
          name: `${c100Person.firstName} ${c100Person.lastName}`,
        })
      : translations.applicantRespondent.understandSafety,
    detailsKeptConfidential: C100rebuildJourney
      ? interpolate(translations.c100.detailsKeptConfidential, {
          name: `${c100Person.firstName} ${c100Person.lastName}`,
        })
      : translations.applicantRespondent.detailsKeptConfidential,
    helpKeepDetailsPrivate: C100rebuildJourney
      ? interpolate(translations.c100.helpKeepDetailsPrivate, {
          name: `${c100Person.firstName} ${c100Person.lastName}`,
        })
      : translations.applicantRespondent.helpKeepDetailsPrivate,
    form,
  };
};
