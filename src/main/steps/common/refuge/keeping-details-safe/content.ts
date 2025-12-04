import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { C100_URL } from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';

const en = {
  c100: {
    title: "Keeping {name}'s details safe",
    pageTitle: "Keeping applicant's details safe",
    understandSafety:
      "We understand how important it is to feel safe, and know that {name}'s details will be kept private.",
    detailsKeptConfidential:
      "{name}'s details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.",
    helpKeepDetailsPrivate:
      "To help us to keep {name}'s details safe, do not include their details in any other communications during the case.",
  },
  applicantRespondent: {
    title: 'Keeping your details safe',
    pageTitle: "Keeping other person's details safe",
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
    title: 'Cadw manylion {name} yn ddiogel',
    pageTitle: "Keeping applicant's details safe",
    understandSafety:
      'Rydym yn deall pa mor bwysig yw hi i deimlo’n ddiogel, a gwybod y bydd manylion {name} yn cael eu cadw’n breifat.',
    detailsKeptConfidential:
      'Bydd manylion {name} yn cael eu cadw’n gyfrinachol a dim ond y llys yn ogystal â Cafcass neu Cafcass Cymru fydd yn eu defnyddio. Ni fyddant yn cael eu rhannu ag unrhyw un arall.',
    helpKeepDetailsPrivate:
      'Er mwyn ein helpu ni i gadw manylion {name} yn ddiogel, peidiwch â chynnwys eu manylion mewn unrhyw gyfathrebiadau eraill yn ystod yr achos.',
  },
  applicantRespondent: {
    title: 'Cadw eich manylion yn ddiogel',
    pageTitle: "Keeping other person's details safe",
    understandSafety:
      'Rydym yn deall pa mor bwysig yw hi i deimlo’n ddiogel, a gwybod y bydd eich manylion yn cael eu cadw’n breifat.',
    detailsKeptConfidential:
      'Bydd eich manylion yn cael eu cadw’n gyfrinachol a dim ond y llys yn ogystal â Cafcass neu Cafcass Cymru fydd yn eu defnyddio. Ni fyddant yn cael eu rhannu ag unrhyw un arall.',
    helpKeepDetailsPrivate:
      "Er mwyn ein helpu ni i gadw eich manylion yn ddiogel, peidiwch â'u cynnwys mewn unrhyw gyfathrebiadau eraill yn ystod yr achos.",
  },
  continue: 'Parhau',
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
  const c100Person = getPeople(content.userCase!).find(person => person.id === content.additionalData?.req.params.id);
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
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.title,
    pageTitle: C100rebuildJourney
      ? interpolate(translations.c100.pageTitle, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.pageTitle,
    understandSafety: C100rebuildJourney
      ? interpolate(translations.c100.understandSafety, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.understandSafety,
    detailsKeptConfidential: C100rebuildJourney
      ? interpolate(translations.c100.detailsKeptConfidential, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.detailsKeptConfidential,
    helpKeepDetailsPrivate: C100rebuildJourney
      ? interpolate(translations.c100.helpKeepDetailsPrivate, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.helpKeepDetailsPrivate,
    form,
  };
};
