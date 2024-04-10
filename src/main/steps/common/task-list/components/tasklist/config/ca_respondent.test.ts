import { Respondent } from '../../../../../../app/case/definition';
import { SectionContent } from '../../../definitions';

import { CA_RESPONDENT } from './ca_respondent';

describe('ca_respondent', () => {
  const data = {
    id: '12',
    caseTypeOfApplication: 'C100',
    respondents: [{} as Respondent],
  };

  test('ca respondent tasklist should have 6 sections', () => {
    expect(CA_RESPONDENT).toHaveLength(6);
  });

  test('about you section should contain correct ids and tasks', () => {
    const aboutYouTasks = CA_RESPONDENT[0].tasks(data, {} as SectionContent);

    expect(CA_RESPONDENT[0].id).toBe('aboutYou');
    expect(aboutYouTasks).toHaveLength(3);
    expect(aboutYouTasks[0].id).toBe('keepYourDetailsPrivate');
    expect(aboutYouTasks[1].id).toBe('editYouContactDetails');
    expect(aboutYouTasks[2].id).toBe('yourSupport');
  });

  test('the application section should contain correct ids and tasks', () => {
    const theApplicationTasks = CA_RESPONDENT[1].tasks(data, {} as SectionContent);

    expect(CA_RESPONDENT[1].id).toBe('theApplication');
    expect(theApplicationTasks).toHaveLength(2);
    expect(theApplicationTasks[0].id).toBe('checkTheApplication');
    expect(theApplicationTasks[1].id).toBe('checkAllegationsOfHarmAndViolence');
  });

  test('your response section should contain correct ids and tasks', () => {
    const yourResponseTasks = CA_RESPONDENT[2].tasks(data, {} as SectionContent);

    expect(CA_RESPONDENT[2].id).toBe('yourResponse');
    expect(yourResponseTasks).toHaveLength(3);
    expect(yourResponseTasks[0].id).toBe('respondToTheApplication');
    expect(yourResponseTasks[1].id).toBe('respondToAOHAndViolence');
    expect(yourResponseTasks[2].id).toBe('requestToCourtAboutYourCase');
  });

  test('your hearing section should contain correct ids and tasks', () => {
    const yourHearingTasks = CA_RESPONDENT[3].tasks(data, {} as SectionContent);

    expect(CA_RESPONDENT[3].id).toBe('yourHearing');
    expect(yourHearingTasks).toHaveLength(1);
    expect(yourHearingTasks[0].id).toBe('viewHearingDetails');
  });

  test('your documents section should contain correct ids and tasks', () => {
    const yourDocumentsTasks = CA_RESPONDENT[4].tasks(data, {} as SectionContent);

    expect(CA_RESPONDENT[4].id).toBe('yourDocuments');
    expect(yourDocumentsTasks).toHaveLength(2);
    expect(yourDocumentsTasks[0].id).toBe('viewAllDocuments');
    expect(yourDocumentsTasks[1].id).toBe('uploadDocuments');
  });

  test('your orders section should contain correct ids and tasks', () => {
    const yourOrdersTasks = CA_RESPONDENT[5].tasks(data, {} as SectionContent);

    expect(CA_RESPONDENT[5].id).toBe('ordersFromTheCourt');
    expect(yourOrdersTasks).toHaveLength(1);
    expect(yourOrdersTasks[0].id).toBe('viewOrders');
  });
});
