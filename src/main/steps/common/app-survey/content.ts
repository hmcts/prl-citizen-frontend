console.info('** FOR SONAR **');

const en = {
  inPageSurveyContent:
    'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="{inPageSurveyUrl}" target="{target}">feedback (opens in a new tab)</a> will help us to improve it.',
  exitPageSurveyTitle: "We'd like to hear your thoughts",
  exitPageSurveyContent:
    'Complete this short, 5-minute survey to help improve our services for you and others.<div><a class="govuk-notification-banner__link" href="{exitPageSurveyUrl}" target="_blank">Please leave your feedback here(opens in a new tab)</a>.</div>',
};

const cy: typeof en = {
  inPageSurveyContent:
    'Mae hwn yn wasanaeth newydd - bydd eich <a class="govuk-link" aria-label="Dolen i roi adborth. Bydd yn agor mewn tab newydd. Bydd angen ichi ddod yn ôl at y tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r hyn rydych wedi’i wneud yn barod." href="{inPageSurveyUrl}" target="{target}">adborth (mae\'n agor mewn tab newydd)</a> yn ein helpu ni i’w wella.',
  exitPageSurveyTitle: 'Hoffwn gael adborth gennych',
  exitPageSurveyContent:
    'Cwblhewch yr arolwg byr hwn fydd ond yn cymryd 5 munud o’ch amser i’n helpu i wella ein gwasanaethau i chi ac eraill.<div><a class="govuk-notification-banner__link" href="{exitPageSurveyUrl}" target="_blank">Rhowch eich adborth yma(agor mewn tab newydd)</a>.</div>',
};

export const appSurveyContents = {
  en,
  cy,
};
