import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { PageContent } from '../../../app/controller/GetController';
import * as Urls from '../../../steps/urls';

interface GovUkNunjucksSummary {
  key: {
    text?: string;
    html?: string;
    classes?: string;
  };
  value: {
    text?: string;
    html?: string;
  };
  actions?: {
    items?: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
  classes?: string;
}

interface SummaryListRow {
  key?: string;
  keyHtml?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  classes?: string;
}

interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}), ...(item.keyHtml ? { html: item.keyHtml } : {}) },
      value: { ...(item.value ? { text: item.value } : {}), ...(item.valueHtml ? { html: item.valueHtml } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl, //
                  text: content.change as string,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

/* eslint-disable import/namespace */
export const ApplicantSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  console.log('usercase in check your answer -->', userCase);
  const sectionTitle = sectionTitles.applicantDetails;
  console.log('Address in util userCase --->', userCase);

  const UserContactPreferences = function () {
    let perference = '';
    if (userCase['contactPreferenceType'] === 'NAMED_PERSON') {
      perference = 'The person named on this application';
    } else if (userCase['contactPreferenceType'] === 'ACCOUNT_OWNER') {
      perference = 'The account owner';
    } else if (userCase['contactPreferenceType'] === 'BOTH_RECEIVE') {
      perference = 'Both the account owner and the person named on this application';
    } else {
      perference = '';
    }
    return perference;
  };

  const SummaryData = [
    {
      key: keys.fullName,
      value: userCase['applicantFirstName'] + ' ' + userCase['applicantLastName'],
      changeUrl: Urls['FULL_NAME'],
    },
    {
      key: keys.dateOfBirth,
      value: getFormattedDate(userCase['applicantDateOfBirth'], content.language),
      changeUrl: Urls['DATE_OF_BIRTH'],
    },
    {
      key: keys.address,
      changeUrl: Urls['MANUAL_ADDRESS'],
    },
    {
      key: keys.recievingEmail,
      value: UserContactPreferences(),
      changeUrl: Urls['CONTACT_PREFERENCES'],
    },
    {
      key: keys.namedPersonEmail,
      value: userCase['applicantEmailAddress'],
      changeUrl: Urls['EMAIL_ADDRESS'],
    },
    {
      key: keys.namedPersonTel,
      value: userCase['applicantHomeNumber'],
      changeUrl: Urls['CONTACT_DETAILS'],
    },
    {
      key: keys.namedPersonMob,
      value: userCase['applicantPhoneNumber'],
      changeUrl: Urls['CONTACT_DETAILS'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: sectionTitle,
    rows: getSectionSummaryList(SummaryData, content),
  };
};


/* eslint-disable import/namespace */
export const UserRole = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const isNamedApplicant =
    userCase['namedApplicant'] === YesOrNo.YES ? 'Yes' : 'No - I am sending an application for someone else.';

  const SummaryData = [
    {
      key: keys['user-role'],
      value: isNamedApplicant,
      changeUrl: Urls['USER_ROLE'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: 'Determine User’s Role',
    rows: getSectionSummaryList(SummaryData, content),
  };
};

