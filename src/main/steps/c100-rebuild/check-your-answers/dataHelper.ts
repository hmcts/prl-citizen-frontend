/* eslint-disable @typescript-eslint/no-explicit-any */

type KeysType = {
  whoChildLiveWith?: string;
  childTimeSpents?: string;
  stopOtherPeopleDoingSomething?: string;
  resolveSpecificIssue?: string;
};

export const CourtOrderParserHelper = (
  keys: KeysType,
  courtOrder?: string[],
  stopOtherPeopleDoingSomethingSubField?: string[],
  resolveSpecificIssueSubField?: string[]
): string => {
  let html = '';
  courtOrder?.forEach(order => {
    if (order === 'whoChildLiveWith') {
      html += keys['whoChildLiveWith'] + '<br><br>';
    } else if (order === 'childTimeSpent') {
      html += keys['childTimeSpent'] + '<br><br>';
    } else if (order === 'stopOtherPeopleDoingSomething') {
      html += keys['stopOtherPeopleDoingSomething'] + '<br><ul class="govuk-list govuk-list--bullet">';
      if (stopOtherPeopleDoingSomethingSubField?.some(key => key === 'changeChildrenNameSurname')) {
        html += '<li>' + keys['changeChildrenNameSurname'] + '</li>';
      }
      if (stopOtherPeopleDoingSomethingSubField?.some(key => key === 'allowMedicalTreatment')) {
        html += '<li>' + keys['allowMedicalTreatment'] + '</li>';
      }
      if (stopOtherPeopleDoingSomethingSubField?.some(key => key === 'takingChildOnHoliday')) {
        html += '<li>' + keys['takingChildOnHoliday'] + '</li>';
      }
      if (stopOtherPeopleDoingSomethingSubField?.some(key => key === 'relocateChildrenDifferentUkArea')) {
        html += '<li>' + keys['relocateChildrenDifferentUkArea'] + '</li>';
      }
      if (stopOtherPeopleDoingSomethingSubField?.some(key => key === 'relocateChildrenOutsideUk')) {
        html += '<li>' + keys['relocateChildrenOutsideUk'] + '</li>';
      }
      html += '</ul>';
    } else if (order === 'resolveSpecificIssue') {
      html += keys['resolveSpecificIssue'] + '<br>' + '<br><ul class="govuk-list govuk-list--bullet">';

      if (resolveSpecificIssueSubField?.some(key => key === 'specificHoliday')) {
        html += '<li>' + keys['specificHoliday'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'whatSchoolChildrenWillGoTo')) {
        html += '<li>' + keys['whatSchoolChildrenWillGoTo'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'religiousIssue')) {
        html += '<li>' + keys['religiousIssue'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'changeChildrenNameSurnameA')) {
        html += '<li>' + keys['changeChildrenNameSurnameA'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'medicalTreatment')) {
        html += '<li>' + keys['medicalTreatment'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'relocateChildrenDifferentUkAreaA')) {
        html += '<li>' + keys['relocateChildrenDifferentUkAreaA'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'relocateChildrenOutsideUkA')) {
        html += '<li>' + keys['relocateChildrenOutsideUkA'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'relocateChildrenOutsideUkA')) {
        html += '<li>' + keys['relocateChildrenOutsideUkA'] + '</li>';
      }
      if (resolveSpecificIssueSubField?.some(key => key === 'returningChildrenToYourCare')) {
        html += '<li>' + keys['returningChildrenToYourCare'] + '</li>';
      }
      html += '</ul>';
    } else {
      html += '';
    }
  });
  console.log(html, resolveSpecificIssueSubField, courtOrder);

  return html;
};
