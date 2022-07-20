import { TranslationFn } from "app/controller/GetController";
import { FormContent } from "app/form/Form";
import { CommonContent } from "steps/common/common.content";
import { summaryList } from "steps/common/summary/utils";





const fieldType = {
    respondentAttendingToCourt : 'String',
    noHearingDetails : 'String',
    respondentLangRequirements : 'String',
    respondentLangDetails : 'String',
    respondentSpecialArrangements : 'String',
    respondentSpecialArrangementsDetails : 'String',
    respondentReasonableAdjustments : 'String',
    respondentDocsSupport : 'String',
    respondentDocsDetails : 'String',
    respondentLargePrintDetails : 'String',
    respondentOtherDetails : 'String',
    respondentHelpCommunication : 'String',
    respondentSignLanguageDetails : 'String',
    respondentDescribeOtherNeed : 'String',
    respondentCourtHearing : 'String',
    respondentCommSupportOther : 'String',
    respondentCourtComfort : 'String',
    respondentOtherProvideDetails : 'String',
    respondentTravellingToCourt : 'String',
    respondentTravellingOtherDetails : 'String',
};

export const enContent = {
    section : ' ',
    title : 'Check your answers ',
    title2 : ' Your hearing needs and requirments',
    sectionTitles: {
        aboutYou: 'About you',
    },
    keys : {
        respondentAttendingToCourt : 'Would you be able to take part in hearings by video and phone?',
        noHearingDetails : 'Please provide the details',
        respondentLangRequirements : 'Do you have any language requirements?',
        respondentLangDetails : 'Please provide language details',
        respondentSpecialArrangements : 'Do you or the children need special safety arrangements at court?',
        respondentSpecialArrangementsDetails : 'Please describe your need in detail',
        respondentReasonableAdjustments : 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
        respondentDocsSupport : 'I need documents in an alternative format',
        respondentDocsDetails : 'Please provide the docs details',
        respondentLargePrintDetails : 'Please provide the large print details',
        respondentOtherDetails : 'Please provide the other details',
        respondentHelpCommunication : 'I need help communicating and understanding',
        respondentSignLanguageDetails : 'Please provide sign language details',
        respondentDescribeOtherNeed : 'Please provide the details',
        respondentCourtHearing : 'I would need to bring support with me to a court hearing',
        respondentCommSupportOther : 'Please provide the details',
        respondentCourtComfort : 'I need something to make me feel comfortable during a court hearing',
        respondentOtherProvideDetails : 'Please describe your need in detail',
        respondentTravellingToCourt : 'I need help travelling to, or moving around court buildings',
        respondentTravellingOtherDetails : 'Please describe your need in detail',

    },
    dependencies : {
        noHearingDetails : {
            dependentOn : 'respondentAttendingToCourt',
            value : ' No, I cannot take part in either video or phone hearings ',
            display : true,
        },
        respondentLangDetails : {
            dependentOn : 'respondentLangRequirements ',
            value : ' i need an in interpreter in a certain language',
            display : true,
        },
        respondentSpecialArrangementsDetails : {
            dependentOn : ' respondentSpecialArrangements ',
            value : ' Other ',
            display : true,
        },
        respondentDocsDetails : {
            dependentOn : ' respondentDocsSupport',
            value : ' Documents in a specfied colour',
            display : true,
        },
        respondentLargePrintDetails : {
            dependentOn : ' respondentDocsSupport',
            value : ' Documents in large print',
            display : true,
        },
        respondentOtherDetails : {
            dependentOn : 'respondentDocsSupport',
            value : ' Other',
            display : true,
        },
        respondentSignLanguageDetails : {
            dependentOn : ' respondentHelpCommunication',
            value : ' British sign language interpreter',
            display : true,
        },
        respondentDescribeOtherNeed : {
            dependentOn : ' respondentHelpCommunication',
            value : ' Other',
            display : true,
        },
        respondentCommSupportOther : {
            dependentOn : ' respondentCourtHearing',
            value : ' Other',
            display : true,
        },
        respondentOtherProvideDetails : {
            dependentOn : ' respondentCourtComfort',
            value : ' Other',
            display : true,
        },
        respondentTravellingOtherDetails : {
            dependentOn : ' respondentTravellingToCourt',
            value : ' Other ',
            display : true,
        },
    },
    errors:{},
};


const en = (content: CommonContent) => {

    const userCase = content.userCase!;

    return {
        ...enContent,
        language: content.language,
        section: [summaryList(cyContent, userCase, urls, enContent.sectionTitles.aboutYou, fieldType, content.language)],
    };
};

const cyContent : typeof enContent = {
    section : ' ',
    title : 'Check your answers ',
    title2 : ' Your hearing needs and requirments',
    sectionTitles: {
        aboutYou: 'About you',
    },
    keys : {
        respondentAttendingToCourt : 'Would you be able to take part in hearings by video and phone?',
        noHearingDetails : 'Please provide the details',
        respondentLangRequirements : 'Do you have any language requirements?',
        respondentLangDetails : 'Please provide language details',
        respondentSpecialArrangements : 'Do you or the children need special safety arrangements at court?',
        respondentSpecialArrangementsDetails : 'Please describe your need in detail',
        respondentReasonableAdjustments : 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
        respondentDocsSupport : 'I need documents in an alternative format',
        respondentDocsDetails : 'Please provide the docs details',
        respondentLargePrintDetails : 'Please provide the large print details',
        respondentOtherDetails : 'Please provide the other details',
        respondentHelpCommunication : 'I need help communicating and understanding',
        respondentSignLanguageDetails : 'Please provide sign language details',
        respondentDescribeOtherNeed : 'Please provide the details',
        respondentCourtHearing : 'I would need to bring support with me to a court hearing',
        respondentCommSupportOther : 'Please provide the details',
        respondentCourtComfort : 'I need something to make me feel comfortable during a court hearing',
        respondentOtherProvideDetails : 'Please describe your need in detail',
        respondentTravellingToCourt : 'I need help travelling to, or moving around court buildings',
        respondentTravellingOtherDetails : 'Please describe your need in detail',

    },
    dependencies : {
        noHearingDetails : {
            dependentOn : 'respondentAttendingToCourt',
            value : ' No, I cannot take part in either video or phone hearings ',
            display : true,
        },
        respondentLangDetails : {
            dependentOn : 'respondentLangRequirements ',
            value : ' i need an in interpreter in a certain language',
            display : true,
        },
        respondentSpecialArrangementsDetails : {
            dependentOn : ' respondentSpecialArrangements ',
            value : ' Other ',
            display : true,
        },
        respondentDocsDetails : {
            dependentOn : ' respondentDocsSupport',
            value : ' Documents in a specfied colour',
            display : true,
        },
        respondentLargePrintDetails : {
            dependentOn : ' respondentDocsSupport',
            value : ' Documents in large print',
            display : true,
        },
        respondentOtherDetails : {
            dependentOn : 'respondentDocsSupport',
            value : ' Other',
            display : true,
        },
        respondentSignLanguageDetails : {
            dependentOn : ' respondentHelpCommunication',
            value : ' British sign language interpreter',
            display : true,
        },
        respondentDescribeOtherNeed : {
            dependentOn : ' respondentHelpCommunication',
            value : ' Other',
            display : true,
        },
        respondentCommSupportOther : {
            dependentOn : ' respondentCourtHearing',
            value : ' Other',
            display : true,
        },
        respondentOtherProvideDetails : {
            dependentOn : ' respondentCourtComfort',
            value : ' Other',
            display : true,
        },
        respondentTravellingOtherDetails : {
            dependentOn : ' respondentTravellingToCourt',
            value : ' Other ',
            display : true,
        },
    },
    errors:{},
};

const urls = {
    respondentAttendingToCourt : 'attending-the-court',
    noHearingDetails : 'attending-the-court',
    respondentLangRequirements : 'language-requirements',
    respondentLangDetails : 'language-requirements',
    respondentSpecialArrangements : 'special-arrangements',
    respondentSpecialArrangementsDetails : 'special-arrangements',
    respondentReasonableAdjustments : 'reasonable-adjustments',
    respondentDocsSupport : 'documents-support',
    respondentDocsDetails : 'documents-support',
    respondentLargePrintDetails : 'documents-support',
    respondentOtherDetails : 'documents-support',
    respondentHelpCommunication : 'communication-help',
    respondentSignLanguageDetails : 'communication-help',
    respondentDescribeOtherNeed : 'communication-help',
    respondentCourtHearing : 'court-hearing-support',
    respondentCommSupportOther : 'court-hearing-support',
    respondentCourtComfort : 'court-hearing-comfort',
    respondentOtherProvideDetails : 'court-hearing-comfort',
    respondentTravellingToCourt : 'travelling-to-court',
    respondentTravellingOtherDetails : 'travelling-to-court',
};

const cy: typeof en = ( content: CommonContent) => {

    const userCase = content.userCase!;
    return{
        ...cyContent,
        language: content.language,
        section : [summaryList(cyContent, userCase, urls, cyContent.sectionTitles.aboutYou, fieldType, content.language)],
    };
};

export const form: FormContent = {
    fields: {},
    submit: {
        text: l => l.continue,
    },

};

const languages = {
    en,
    cy,
};

export const generateContent: TranslationFn = content => {
    const translations = languages[content.language](content);
    return{
        ...translations,
        form,
    };
};




