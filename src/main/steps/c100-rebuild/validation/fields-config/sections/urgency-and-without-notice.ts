
export const UrgenceyAndWithoutNoticeFieldsConfig = {
  section: 'urgenceyAndWithoutNotice',
  fields: [
    {
      fieldName: 'hu_urgentHearingReasons',
      fieldType: 'string',
    },
    {
      fieldName: 'hu_reasonOfUrgentHearing',
      fieldType: 'array',
      mandatory_if: {
        fieldName: 'hu_urgentHearingReasons',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hu_otherRiskDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hu_urgentHearingReasons',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hu_timeOfHearingDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hu_urgentHearingReasons',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hu_hearingWithNext48HrsDetails',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hu_urgentHearingReasons',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hu_hearingWithNext48HrsMsg',
      fieldType: 'string',
      mandatory_if: {
        and: [
          {
            fieldName: 'hu_urgentHearingReasons',
            value: 'Yes',
          },
          {
            fieldName: 'hu_hearingWithNext48HrsDetails',
            value: 'Yes',
          },
        ],
      },
    },
    {
      fieldName: 'hwn_hearingPart1',
      fieldType: 'string',
    },
    {
      fieldName: 'hwn_reasonsForApplicationWithoutNotice',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hwn_hearingPart1',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hwn_doYouNeedAWithoutNoticeHearing',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hwn_hearingPart1',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
      fieldType: 'string',
      mandatory_if: {
        and: [
          {
            fieldName: 'hwn_hearingPart1',
            value: 'Yes',
          },
          {
            fieldName: 'hwn_doYouNeedAWithoutNoticeHearing',
            value: 'Yes',
          },
        ],
      },
    },
    {
      fieldName: 'hwn_doYouRequireAHearingWithReducedNotice',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'hwn_hearingPart1',
        value: 'Yes',
      },
    },
    {
      fieldName: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
      fieldType: 'string',
      mandatory_if: {
        and: [
          {
            fieldName: 'hwn_hearingPart1',
            value: 'Yes',
          },
          {
            fieldName: 'hwn_doYouRequireAHearingWithReducedNotice',
            value: 'Yes',
          },
        ],
      },
    },
  ],
};
