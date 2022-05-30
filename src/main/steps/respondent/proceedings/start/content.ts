import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';


const en = {
section: 'Current or previous proceedings',
title: 'Have you or the children ever been involved in court proceedings?',
one: 'Yes',
two: 'No',
three: "I don't know",
summaryText: 'Contacts for help',
continue: 'Continue',
errors: {
detailsKnown: {
required: 'Enter your details known',
}
},
};

const cy: typeof en = {
section: 'Current or previous proceedings',
title: 'Have you or the children ever been involved in court proceedings?',
one: 'Yes',
two: 'No',
three: "I don't know",
summaryText: 'Contacts for help',
continue: 'Continue',
errors: {
detailsKnown: {
required: 'Enter your details known',
}
},
};

const languages = {
en,
cy,
};

export const form: FormContent = {
fields: {
detailsKnown: {
type: 'radios',
classes: 'govuk-radios',
label: l => l.label,
section: l => l.section,
values: [
{
label: l => l.one,
value: 'Yes',
},
{
label: l => l.two,
value: 'No',
},
{
label: l => l.three,
value: 'I',
},
],
validator: isFieldFilledIn,
},
},
submit: {
text: l => l.continue,
},
};

export const generateContent: TranslationFn = content => {
const translations = languages[content.language];
return {
...translations,
form,
};
};
