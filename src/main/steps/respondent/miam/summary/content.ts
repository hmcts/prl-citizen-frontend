// import { PageContent } from '../../../../app/controller/GetController';
// import { FormContent, FormFields } from '../../../../app/form/Form';
// import { isFieldFilledIn } from '../../../../app/form/validation';
// import { CommonContent } from 'steps/common/common.content';
// import { Case } from 'app/case/case';
// //import { YesOrNo } from 'app/case/definition';
// import { miam_cost_exemption_content, miam_how_to_arrange_mediation_link, miam_how_to_arrange_mediation_label } from './miam-cost-exemptions';
// import { mapSummaryListContent } from 'steps/common/functions/mapSummaryListContent';


// const en = {
//   section: 'Keeping your contact details private',
//   title: 'Would you be willing to attend a MIAM?',
//   one: 'Yes',
//   two: 'No',
//   explainWhyLabel: 'Explain why',
//   miamCostExemptionsLabel:'Help with MIAM costs and exemptions',
//   miamCostExemptionsInfo:miam_cost_exemption_content,
//   threeHint: 'This is a 8 character code',
//   summaryText: 'Contacts for help',
//   continue: 'Continue',
//   errors: {
//     miamWillingness: {
//       required: 'Enter your details known',
//     },
//     miamNotWillingExplnation: {
//       required: 'Explain why',
//     },
//   },
// };

// const cy: typeof en = {
//   section: 'Application details',
//   title: 'Enter your access details',
//   one: 'Yes',
//   two: 'No',
//   miamCostExemptionsLabel:'Help with MIAM costs and exemptions',
//   miamCostExemptionsInfo:miam_cost_exemption_content,
//   explainWhyLabel: "Explain why",
//   threeHint: 'This is a 8 character code',
//   summaryText: 'Contacts for help',
//   continue: 'Continue',
//   errors: {
//     miamWillingness: {
//       required: 'Enter your details known',
//     },
//     miamNotWillingExplnation: {
//       required: 'Explain why',
//     },
//   },
// };

// const languages = {
//   en,
//   cy,
// };

// export const form: FormContent = {
//     fields: {
//     },
//     submit: {
//       text: l => l.continue,
//     },
//   };


// export const generateContent = (content: CommonContent): PageContent => ({
//   ...languages[content.language],
//   form: { ...form, fields: miamFields(content.userCase!) },
// });


// export const miamFields = (userCase: Partial<Case>): FormFields => ({
//   miamSummary:{
//     type: 'summarylist',
//   },
// });
