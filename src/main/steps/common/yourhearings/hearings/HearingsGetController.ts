import autobind from 'autobind-decorator';
import { Response } from 'express';

//import { CosApiClient } from '../../../../app/case/CosApiClient';
// import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
// import { GetController, TranslationFn } from '../../../../app/controller/GetController';
// import { ordinalNumberMapCy, ordinalNumberMapEn } from '../../../../steps/constants';
// import { Language, generatePageContent } from '../../../common/common.content';
import { APPLICANT_YOURHEARINGS_HEARINGS, RESPONDENT_ORDERS_FROM_THE_COURT, RESPONDENT_YOURHEARINGS_HEARINGS } from '../../../urls';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { PartyType } from '../../../../app/case/definition';

@autobind
export class HearingsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
    req.session.userCase.nextHearing = [];
    req.session.userCase.futureHearings = [];
    req.session.userCase.completedHearings = [];
    console.log(req.session.userCase.hearingCollection);
    if (req.session.userCase.hearingCollection!.length >= 1) {
      for (const hearing of req.session.userCase?.hearingCollection!) {
        if (hearing.hearingDaySchedule && hearing.hearingDaySchedule!.length >= 1) {
          if (hearing.hmcStatus === 'COMPLETED') {
            req.session.userCase.completedHearings?.push(hearing);
          } else {
            if (new Date() <= new Date(hearing.hearingDaySchedule![0].hearingEndDateTime!)) {
              req.session.userCase.futureHearings?.push(hearing);
            }
          }
        }
      }
    }
    console.log(req.session.userCase.futureHearings);
    if (req.session.userCase?.futureHearings!.length >= 1) {
      for (const hearing of req.session.userCase?.futureHearings!) {
        let day = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDate();
        let month = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getMonth();
        let year = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getFullYear();
        hearing.hearingRequestDateTime = day + ' ' + getMonthName(month) + ' ' + year;
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          day = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getDate();
          month = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getMonth();
          year = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getFullYear();
          hearing.hearingRequestDateTime =
            hearing.hearingRequestDateTime + ' - ' + day + ' ' + getMonthName(month) + ' ' + year;
        }
        hearing.lastResponseReceivedDateTime = hearing.hearingDaySchedule?.length + ' days';
        hearing.hearingType = 'Remote';
        for (const schedule of hearing.hearingDaySchedule!) {
          const day = new Date(schedule.hearingStartDateTime!).getDate();
          const month = new Date(schedule.hearingStartDateTime!).getMonth();
          const year = new Date(schedule.hearingStartDateTime!).getFullYear();
          const weekDay = new Date(schedule.hearingStartDateTime!).getDay();
          schedule.hearingEndDateTime = getProperTime(new Date(schedule.hearingStartDateTime!));
          schedule.hearingStartDateTime = getDayName(weekDay) + ', ' + day + ' ' + getMonthName(month) + ' ' + year;
          schedule.listAssistSessionId = 'hours';
        }
      }
      const next = req.session.userCase.futureHearings.shift();
      req.session.userCase.nextHearing.push(next!);
    }
    if (req.session.userCase?.completedHearings!.length >= 1) {
      for (const hearing of req.session.userCase?.completedHearings!) {
        let day = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDate();
        let month = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getMonth();
        let year = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getFullYear();
        let weekDay = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDay();
        hearing.hearingRequestDateTime = getDayName(weekDay) + ', ' + day + ' ' + getMonthName(month) + ' ' + year;
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          day = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getDate();
          month = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getMonth();
          year = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getFullYear();
          weekDay = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getDay();
          hearing.hearingRequestDateTime =
            hearing.hearingRequestDateTime +
            ' - ' +
            getDayName(weekDay) +
            ', ' +
            day +
            ' ' +
            getMonthName(month) +
            ' ' +
            year;
        }
        hearing.lastResponseReceivedDateTime = hearing.hearingDaySchedule?.length + ' days';
        hearing.hearingType = 'Remote';
      }
    }
    req.session.userCase.hearingOrders = [];
    for (const doc of req.session.userCase?.orderCollection || []) {
      const uid = doc.value.orderDocument.document_url.substring(
        doc.value.orderDocument.document_url.lastIndexOf('/') + 1
      );
      req.session.userCase.hearingOrders?.push({
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocument.document_filename,
      });
    }
    console.log(req.session.userCase?.orderCollection);
    console.log(req.session.userCase.hearingOrders);
    let redirectUrl;
    if(partyType === PartyType.APPLICANT){
      if(req.session.userCase.caseTypeOfApplication === 'C100'){
        redirectUrl = APPLICANT_YOURHEARINGS_HEARINGS;
      }
      else{
        redirectUrl = APPLICANT_YOURHEARINGS_HEARINGS;
      }   
    }
    else{
      redirectUrl = RESPONDENT_YOURHEARINGS_HEARINGS;
    }

    req.session.save(() => res.redirect(redirectUrl));
    console.log("I am in common hearings get controller");
  }
}

export function getMonthName(month: number): string {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
}

export function getDayName(day: number): string {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}
export function getProperTime(date: Date): string {
  let dateString;
  if (date.getHours() > 12) {
    dateString = date.getHours() - 12 + ':' + date.getMinutes() + 'pm';
  } else if (date.getHours() === 12) {
    dateString = 12 + ':' + date.getMinutes() + 'pm';
  } else {
    dateString = date.getHours() + ':' + date.getMinutes() + 'am';
  }
  return dateString;
}

// @autobind
// export default class HearingsGetController {
//   private parent;
//   constructor(protected readonly view: string, protected readonly content: TranslationFn) {
//     this.parent = new GetController(view, content);
//   }
//   public async get(req: AppRequest, res: Response): Promise<void> {
//     if (res.locals.isError || res.headersSent) {
//       return;
//     }

//     const language = this.parent.getPreferredLanguage(req) as Language;

//     const ordinalNumberMap = language === 'cy' ? ordinalNumberMapCy : ordinalNumberMapEn;

//     const content = generatePageContent({
//       language,
//       pageContent: this.content,
//       userCase: req.session?.userCase,
//     });
//     if (!req.session.errors) {
//       req.session.errors = [];
//     }
//     const sessionErrors = req.session?.errors || [];
//     let formaction: YesOrNo | undefined;

//     //make a call to the cosclient to get the hearings
//     const citizenUser = req.session.user;
//     const cosApiClient = new CosApiClient(citizenUser.accessToken, 'https://return-url');
//     const caseHearings = await cosApiClient.getAllHearingsForCitizenCase(req.session.user, req.session.userCase.id);
//     console.log('retrieved caseHEARINGdata for case : ' + JSON.stringify(caseHearings));
//     const userCase = req.session.userCase;

//     res.render(this.view, {
//       ...content,
//       sessionErrors,
//       htmlLang: language,
//       formaction,
//       userIdamId: req.session?.user?.id,
//       ordinalNumberMap,
//       userCase,
//     });
//   }
// }
