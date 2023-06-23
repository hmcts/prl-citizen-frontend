import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
// import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
// import { GetController, TranslationFn } from '../../../../app/controller/GetController';
// import { ordinalNumberMapCy, ordinalNumberMapEn } from '../../../../steps/constants';
// import { Language, generatePageContent } from '../../../common/common.content';
import { RESPONDENT_YOURHEARINGS_HEARINGS } from '../../../urls';

@autobind
export class HearingsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const citizenUser = req.session.user;
      const caseId = req.session.userCase.id;
      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');

      const hearings = await client.getAllHearingsForCitizenCase(citizenUser, caseId);
      // console.log("I am 1");
      console.log(JSON.stringify(hearings));
      // req.session.userCase.hearingCollection = hearings.caseHearings;
      req.session.userCase.hearingCollection = [
        {
          hearingID: 2000005761,
          hearingRequestDateTime: '2023-06-19T14:14:22.608675',
          hearingType: 'ABA5-FOF',
          hmcStatus: 'AWAITING_ACTUALS',
          lastResponseReceivedDateTime: '2023-06-19T14:43:10',
          requestVersion: 1,
          hearingListingStatus: 'FIXED',
          listAssistCaseStatus: 'LISTED',
          hearingDaySchedule: [
            {
              hearingStartDateTime: '2023-06-20T09:00:00',
              hearingEndDateTime: '2023-06-20T10:00:00',
              listAssistSessionId: 'null',
              hearingVenueId: '234946',
              hearingVenueName: 'null',
              hearingVenueLocationCode: 'null',
              hearingVenueAddress: 'null',
              hearingRoomId: 'Swansea CJC Courtroom 03',
              hearingJudgeId: '',
              hearingJudgeName: 'null',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: 'b87ba2eb-7a03-4596-a071-5969c93a61cb',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: 'c7a15ca6-c0e1-4a09-aff1-d7096fdd38ac',
                  hearingSubChannel: 'null',
                },
              ],
            },
          ],
          hearingGroupRequestId: 'null',
          hearingIsLinkedFlag: false,
        },
        {
          hearingID: 2000005761,
          hearingRequestDateTime: '2023-06-19T14:14:22.608675',
          hearingType: 'ABA5-FOF',
          hmcStatus: 'AWAITING_ACTUALS',
          lastResponseReceivedDateTime: '2023-06-19T14:43:10',
          requestVersion: 1,
          hearingListingStatus: 'FIXED',
          listAssistCaseStatus: 'LISTED',
          hearingDaySchedule: [
            {
              hearingStartDateTime: '2023-06-20T09:00:00',
              hearingEndDateTime: '2023-06-20T10:00:00',
              listAssistSessionId: 'null',
              hearingVenueId: '234946',
              hearingVenueName: 'null',
              hearingVenueLocationCode: 'null',
              hearingVenueAddress: 'null',
              hearingRoomId: 'Swansea CJC Courtroom 03',
              hearingJudgeId: '',
              hearingJudgeName: 'null',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: 'b87ba2eb-7a03-4596-a071-5969c93a61cb',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: 'c7a15ca6-c0e1-4a09-aff1-d7096fdd38ac',
                  hearingSubChannel: 'null',
                },
              ],
            },
          ],
          hearingGroupRequestId: 'null',
          hearingIsLinkedFlag: false,
        },
      ];

      console.log('$$$$$$$   ', req.session.userCase.hearingCollection);
      // console.log("I am 2");
      req.session.save(() => res.redirect(RESPONDENT_YOURHEARINGS_HEARINGS));
      // res.redirect(RESPONDENT_YOURHEARINGS_HEARINGS);
    } catch (err) {
      throw new Error('Case Data could not be retrieved.');
    }
  }
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
