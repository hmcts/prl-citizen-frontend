const { I } = inject();
const retryCount = 3;

module.exports = {

    pages: {
        "Start application": async () => {
            await I.clickLink('New child arrangements application (C100)');
            await I.clickLink('Your child arrangements application');
            await I.waitForText("What you’ll need to complete your application");
            await I.click('//a[contains(text(),"Continue")]');
        },
        'Where do the children live?': async () => {
            await I.waitForText('Where do the children live?');
            await I.fillFieldWithLabel('Postcode', 'TW31JX');
            await I.clickButton('Continue');
            await I.waitForText('Do you have a written agreement with the other people in the case that you want the court to review?');
            await I.clickFieldWithID('sq_writtenAgreement-2');
            await I.clickButton('Continue');
        },
        'Before you go to court': async () =>{
            await I.waitForText('Before you go to court');
            await I.clickButton('Continue');
        },
        'Other ways to reach an agreement': async(option) => {
            await I.waitForText('Other ways to reach an agreement');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Will you be using a legal representative in these proceedings?' : async (option) => {
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.waitForText('Will you be using a legal representative in these proceedings?');
            await I.checkOption(optionField);
            await I.clickButton('Continue');

        },
        'Do you want your legal representative to complete the application for you?': async(option) => {
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.waitForText('Do you want your legal representative to complete the application for you?');
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Is there any reason that you would need permission from the court to make this application?': async(option) => {
            await I.waitForText('Is there any reason that you would need permission from the court to make this application?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?': async (option) => {
            await I.waitForText('Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Attending a Mediation Information and Assessment Meeting (MIAM)': async () => {
            await I.waitForText('Attending a Mediation Information and Assessment Meeting (MIAM)');
            await I.clickFieldWithID('miam_consent');
            await I.clickButton('Continue');

        },
        'Have you attended a MIAM?': async (option) => {
            await I.waitForText('Have you attended a MIAM?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Do you have a document signed by the mediator?': async (option) => {
            await I.waitForText('Do you have a document signed by the mediator?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Upload your MIAM certificate': async () => {
            await I.waitForText('Upload your MIAM certificate');
            await I.selectFile('Select documents to upload', '../../test/resource/dummy.pdf');
            await I.clickButton('Upload file');
            await I.waitForText('applicant__miam_certificate');
            await I.clickButton('Continue');
        },
        'Your documents': async () => {
            await I.waitForText('Your documents');
            await I.clickButton('Continue');
        },
        'What are you asking the court to do?': async () => {
            await I.waitForText('What are you asking the court to do?');
            await I.clickCheckBoxWithLabel('Decide who the children live with and when');
            await I.clickButton('Continue');
        },
        'Describe what you want the court to do regarding the children in this application': async () => {
            await I.waitForText('Describe what you want the court to do regarding the children in this application');
            await I.fillFieldWithId('too_shortStatement', 'test summary');
            await I.clickButton('Continue');
        },
        'Does your situation qualify for an urgent first hearing?': async (option) => {
            await I.waitForText('Does your situation qualify for an urgent first hearing?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        }, 
        'Are you asking for a without notice hearing?': async (option) => {
            await I.waitForText('Are you asking for a without notice hearing?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Enter the names of the children': async (caseDetails) => {
            await I.waitForText('Enter the names of the children');
            await I.fillFieldWithLabel('First name(s)', caseDetails.child1_firstName);
            await I.fillFieldWithLabel('Last name(s)', caseDetails.child1_lastName);
            await I.clickButton('Continue');
        },
        'Provide details for child': async () => {
            await I.waitForText('Provide details for');
            await I.enterDate('Date of birth', '01', '01', '2020');
            await I.clickRadioOption('Gender', 'Male');
            await I.clickButton('Continue');
        },
        'Which of the decisions you’re asking the court to resolve relate': async () => {
            await I.waitForText('Which of the decisions you’re asking the court to resolve relate');
            await I.clickCheckBoxWithLabel('Decide who the children live with and when');
            await I.clickButton('Continue');
        },
        'Parental responsibility for child': async (responsibilityAs) => {
            await I.waitForText('Parental responsibility for');
            await I.fillFieldWithId('statement', responsibilityAs);
            await I.clickButton('Continue');

        },
        'Further Information': async () => {
            await I.waitForText('Further Information');
            await I.clickRadioOption('Are any of the children known to social services?', 'No');
            await I.clickRadioOption('Are any of the children the subject of a child protection plan?', 'No');
            await I.clickButton('Continue');
        },
        'Do you or any respondents have other children who are not part of this application?': async (option) => {
            await I.waitForText('Do you or any respondents have other children who are not part of this application?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Enter your name': async (caseDetails) => {
            await I.waitForText('Enter your name');
            await I.fillFieldWithId('applicantFirstName', caseDetails.applicant1_firstName);
            await I.fillFieldWithId('applicantLastName', caseDetails.applicant1_lastName);
            await I.clickButton('Continue');
        },
        'Do the other people named in this application (the respondents) know any of your contact details?': async (option) => {
            await I.waitForText('Do the other people named in this application (the respondents) know any of your contact details?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Keeping your contact details private for': async () => {
            await I.waitForText('Keeping your contact details private for');
            await I.clickFieldWithID('start-2');
            await I.clickButton('Continue');

        },
        'The court will not keep your contact details private': async () => {
            await I.waitForText('The court will not keep your contact details private');
            await I.clickButton('Continue');
        },
        'Provide details for applicant': async (caseDetails) => {
            await I.waitForText(`Provide details for ${caseDetails.applicant1_firstName} ${caseDetails.applicant1_lastName}`);
            await I.clickFieldWithID('haveYouChangeName-2');
            await I.clickRadioOption('Gender', 'Male');
            await I.enterDate('Your date of birth', '01', '01', '2000');
            await I.fillFieldWithLabel('Your place of birth', 'test town');
            await I.clickButton('Continue');
        },
        'What is applicant relationship to child': async (caseDetails) => {
            await I.waitForText(`What is ${caseDetails.applicant1_firstName} ${caseDetails.applicant1_lastName}'s relationship to ${caseDetails.child1_firstName} ${caseDetails.child1_lastName}}`);
            const optionField = `//fieldset//label[contains(text(),'Father')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');

        },
        'Address of applicant': async () => {
            await I.waitForText('Address of ');
            await I.fillFieldWithLabel('Current postcode', 'TW31JX');
            await I.clickButton('Continue');
        },
        'Select Address of applicant': async () => {
            await I.waitForText('Select Address of');
            await I.selectOption('Select an address', '2');
            await I.clickButton('Continue');
        },
        'Have you lived at this address for less than 5 years?': async () => {
            await I.waitForText('Have you lived at this address for less than 5 years?');
            await I.clickRadioOption('Have you lived at this address for less than 5 years?', 'No');
            await I.clickButton('Continue');
        },
        'Contact details of applicant': async () => {
            await I.waitForText('Contact details of ');
            await I.clickFieldWithID('canProvideEmail');
            await I.fillFieldWithLabel('Your email address', 'test_applicant1@test.com');
            await I.clickFieldWithID('canProvideTelephoneNumber');
            await I.fillFieldWithLabel('Your telephone phone', '09876543211');

            await I.clickFieldWithID('canLeaveVoiceMail');
            await I.clickButton('Continue');

        },
        'Contact Preferences for applicant': async () => {
            await I.waitForText('Contact Preferences for');
            await I.clickRadioOption('How would you prefer to be contacted?', 'Digital');
            await I.clickButton('Continue');
        },
        'Enter the respondents name': async (caseDetails) => {
            await I.waitForText('Enter the respondent');
            await I.fillFieldWithLabel('First name(s)', caseDetails.respondent1_firstName);
            await I.fillFieldWithLabel('Last name(s)', caseDetails.respondent1_lastName);
            await I.clickButton('Continue');
        },
        'Provide details for respondent': async () => {
            await I.waitForText('Provide details for');
            await I.clickRadioOption('Have they changed their name?', 'No');
            await I.clickRadioOption('Gender', 'Female');
            await I.enterDate('Date of birth', '01', '01', '2001');
            await I.fillFieldWithLabel('Place of birth', 'test town2');
            await I.clickButton('Continue');
        },
        'relationship to respondent': async () => {
            await I.waitForText('relationship to');
            await I.clickFieldWithID('relationshipType');
            await I.clickButton('Continue');
        },
        'Address of respondent': async () => {
            await I.waitForText('Address of ');
            await I.fillFieldWithLabel('Current postcode', 'TW31JX');
            await I.clickButton('Continue');
        },
        'Select Address of respondent': async () => {
            await I.waitForText('Select Address of');
            await I.selectOption('Select an address', '2');
            await I.clickButton('Continue');
        },
        'Have they lived at this address for less than 5 years?': async () => {
            await I.waitForText('Have they lived at this address for less than 5 years?');
            await I.clickRadioOption('Have they lived at this address for less than 5 years?', 'No');
            await I.clickButton('Continue');
        },
        'Contact details of respondent': async () => {
            await I.waitForText('Contact details of');
            await I.fillFieldWithLabel('Email address', 'respondent_test@test.com');
            await I.fillFieldWithLabel('Telephone number', '09876543212');
            await I.clickButton('Continue');
        },
        'Is there anyone else who should know about your application?': async (option) => {
            await I.waitForText('Is there anyone else who should know about your application?');
            const optionField = `//fieldset//label[contains(text(),'Father')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');

        },
        'Who does child currently live with?': async (caseDetails) => {
            await I.waitForText('currently live with?');
            await I.clickCheckBoxWithLabel(caseDetails.respondent1_firstName);
            await I.clickButton('Continue');
        },
        'Have you or the children ever been involved in court proceedings?': async () => {
            await I.waitForText('Have you or the children ever been involved in court proceedings?');
            await I.clickFieldWithID('op_childrenInvolvedCourtCase-2');
            await I.clickFieldWithID('op_courtOrderProtection-2');
            await I.clickButton('Continue');

        },
        'Safety concerns': async() => {
            await I.waitForText('Safety concerns');
            await I.clickButton('Continue');

        },
        'Do you have any concerns for your safety or the safety of the children?': async (option) => {
            await I.waitForText('Do you have any concerns for your safety or the safety of the children?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Are the children lives mainly based outside of England and Wales?': async (option) => {

            await I.waitForText('lives mainly based outside of England and Wales?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Are the children parents (or anyone significant to the children) mainly based outside of England and Wales?': async (option) => {
            await I.waitForText('parents (or anyone significant to the children) mainly based outside of England and Wales?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');

        },
        'Could another person in the application apply for a similar order in a country outside England or Wales?': async (option) => {
            await I.waitForText('Could another person in the application apply for a similar order in a country outside England or Wales?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'Has another country asked (or been asked) for information or help for the children?': async (option) => {

            await I.waitForText('Has another country asked (or been asked) for information or help for the children?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');

        },
        'Would you be able to take part in hearings by video and phone?': async () => {
            await I.waitForText('Would you be able to take part in hearings by video and phone?');
            await I.clickCheckBoxWithLabel('Yes, I can take part in video hearings');
            await I.clickButton('Continue');
        },
        'Do you have any language requirements?': async () => {
            await I.waitForText('Do you have any language requirements?');
            await I.clickCheckBoxWithLabel('No, I do not have any language requirements at this time');
            await I.clickButton('Continue');

        },
        'Do you or the children need special arrangements at court?': async () => {
            await I.waitForText('Do you or the children need special arrangements at court?');
            await I.clickCheckBoxWithLabel('No, I do not have any safety requirements at this time');
            await I.clickButton('Continue');

        },
        'Do you have a physical, mental or learning disability or health condition that means you need support during your case?': async () => {
            await I.waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');
            await I.clickCheckBoxWithLabel('No, I do not need any support at this time');
            await I.clickButton('Continue');
        },
        'Do you need help with paying the fee for this application?': async (option) => {
            await I.waitForText('Do you need help with paying the fee for this application?');
            const optionField = `//fieldset//label[contains(text(),'${option}')]/../input`;
            await I.checkOption(optionField);
            await I.clickButton('Continue');
        },
        'heck your Answers': async () => {
            await I.waitForText('Check your Answers');
            await I.clickCheckBoxWithLabel('I believe that the facts stated in this application are true');
            await I.clickButton('Pay and submit your application');
        },
        'Equality and diversity questions': async () => {
            await I.waitForText('want to answer these questions');
            await I.clickButton('want to answer these questions');
        },
        'Payment card details': async () => {
            await I.waitForElement('#card-no');
            await I.fillFieldWithId('card-no', '4444333322221111');
            await I.fillFieldWithId('expiry-month', '01');
            await I.fillFieldWithId('expiry-year', '2030');
            await I.fillFieldWithId('cardholder-name', 'Automation test user');
            await I.fillFieldWithId('cvc', '123');

            await I.fillFieldWithId('address-line-1', 'test Address line 1');
            await I.fillFieldWithId('address-city', 'test Town or city');
            await I.fillFieldWithId('address-postcode', 'TW31JX');
            await I.fillFieldWithId('email', 'test@test.com');
            await I.clickFieldWithID('submit-card-details');
        },
        'Confirm your payment': async () => {
            await I.clickFieldWithID('confirm');
        },
        'Your application has been submitted': async () => {
            await I.waitForText('Your application has been submitted');
        }
    },
  
  
    async createCaseC100E2E(caseDetails){
        caseDetails.applicant1_firstName = caseDetails.applicant1_firstName ? caseDetails.applicant1_firstName : 'John';
        caseDetails.applicant1_lastName = caseDetails.applicant1_lastName ? caseDetails.applicant1_lastName : 'Doe';

        caseDetails.respondent1_firstName = caseDetails.respondent1_firstName ? caseDetails.respondent1_firstName : 'Mary';
        caseDetails.respondent1_lastName = caseDetails.respondent1_lastName ? caseDetails.respondent1_lastName : 'Richards';

        caseDetails.child1_firstName = caseDetails.child1_firstName ? caseDetails.child1_firstName : 'childfn';
        caseDetails.child1_lastName = caseDetails.child1_lastName ? caseDetails.child1_lastName : 'childln';

        await this.pages['Start application']();
        await this.pages['Where do the children live?']();
        await this.pages['Before you go to court']();
        await this.pages['Other ways to reach an agreement']('No');
        await this.pages['Will you be using a legal representative in these proceedings?']('Yes');
        await this.pages['Do you want your legal representative to complete the application for you?']('No');

        await this.pages['Is there any reason that you would need permission from the court to make this application?']('No');
        await this.pages['Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?']('No');
       
        await this.pages['Attending a Mediation Information and Assessment Meeting (MIAM)']();
        await this.pages['Have you attended a MIAM?']('Yes');
        await this.pages['Do you have a document signed by the mediator?']('Yes');
        await this.pages['Upload your MIAM certificate']();
        await this.pages['Your documents']();
        await this.pages['What are you asking the court to do?']();
        await this.pages['Describe what you want the court to do regarding the children in this application']();
        await this.pages['Does your situation qualify for an urgent first hearing?']('No');
        await this.pages['Are you asking for a without notice hearing?']('Yes');
        await this.pages['Enter the names of the children'](caseDetails);
        await this.pages['Provide details for child']();
        await this.pages['Which of the decisions you’re asking the court to resolve relate']();
        await this.pages['Parental responsibility for child']('father');

        await this.pages['Further Information']();
        await this.pages['Do you or any respondents have other children who are not part of this application?']('No');
        await this.pages['Enter your name'](caseDetails);
        await this.pages['Do the other people named in this application (the respondents) know any of your contact details?']('Yes');
        await this.pages['Keeping your contact details private for'](); 
        await this.pages['The court will not keep your contact details private'](); 
        await this.pages['Provide details for applicant']();
        await this.pages['What is applicant relationship to child']();
        await this.pages['Address of applicant']();
        await this.pages['Select Address of applicant']();
        await this.pages['Have you lived at this address for less than 5 years?']();
        await this.pages['Contact details of applicant']();
        await this.pages['Contact Preferences for applicant']();
        await this.pages['Enter the respondents name']();
        await this.pages['Provide details for respondent']();
        await this.pages['relationship to respondent']();
        await this.pages['Address of respondent']();
        await this.pages['Select Address of respondent']();
        await this.pages['Have they lived at this address for less than 5 years?']();
        await this.pages['Contact details of respondent']();
        await this.pages['Is there anyone else who should know about your application?']('No'); 
        await this.pages['Who does child currently live with?'](caseDetails);
        await this.pages['Have you or the children ever been involved in court proceedings?']();
        await this.pages['Safety concerns']();
        await this.pages['Do you have any concerns for your safety or the safety of the children?']('No');
        await this.pages['Are the children lives mainly based outside of England and Wales?']('No');
        await this.pages['Are the children parents (or anyone significant to the children) mainly based outside of England and Wales?']('No');
        await this.pages['Could another person in the application apply for a similar order in a country outside England or Wales?']('No');
        await this.pages['Has another country asked (or been asked) for information or help for the children?']('No');
        await this.pages['Would you be able to take part in hearings by video and phone?']();
        await this.pages['Do you have any language requirements?']();
        await this.pages['Do you or the children need special arrangements at court?']();
        await this.pages['Do you have a physical, mental or learning disability or health condition that means you need support during your case?']();
        await this.pages['Do you need help with paying the fee for this application?']('No, I do not need help');
        await this.pages['Check your Answers']();
        await this.pages['Equality and diversity questions']();
        await this.pages['Payment card details']();
        await this.pages['Confirm your payment']();
        await this.pages['Your application has been submitted'](); 
     
    }

}
