import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { generateContent } from './content';
@autobind
export class RespondentTaskListGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async load(req: AppRequest, res: Response): Promise<void> {
    const citizenUser = req.session.user;
    const caseId = req.session.userCase.id;
    const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
    const hearings = await client.getAllHearingsForCitizenCase(citizenUser, caseId);
    req.session.userCase.hearingCollection = hearings.caseHearings;
    console.log(citizenUser.id);
    // let previousHearings;
    // let futureHearings;
    // let futCount =0,prevCount=0;
    // if(hearings.caseHearings.length >= 1){
    //   for (let hearing of hearings.caseHearings){
    //     if(hearing.hearingDaySchedule.length >= 1){
    //       for(let schedule of hearing.hearingDaySchedule){
    //         if(new Date(schedule.hearingStartDateTime)>= new Date()){
    //           prevCount++;
    //           schedule.add(hearing.hearingID);
    //           schedule.add(prevCount);
    //           previousHearings.push(schedule);
    //         }
    //         else{
    //           futCount++;
    //           schedule.add(hearing.hearingID);
    //           schedule.add(futCount);
    //           futureHearings.push(schedule);
    //         }
    //       }
    //     }
    //   }
    // }
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navfromRespondToApplication: false,
    };

    req.session.save(() => {
      super.get(req, res);
    });
  }
}
