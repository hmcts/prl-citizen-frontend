/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MiamHelperDataParser<T> {
  [x: string]: T;
}
const InstanceOfMiamHelper = new MiamHelperDataParser<any>();
type KeysType = {
  whoChildLiveWith?: string;
  childTimeSpents?: string;
  stopOtherPeopleDoingSomething?: string;
  resolveSpecificIssue?: string;
};

interface IMiamScreenData {
  keys: KeysType;
}

InstanceOfMiamHelper.__proto__.MiamScreenParseData = (
  keys: KeysType,
  courtOrder?: string[],
  stopOtherPeopleDoingSomethingSubField?: string[],
  resolveSpecificIssueSubField?: string[]
): IMiamScreenData => {
  return {
    keys,
  };
};

export { InstanceOfMiamHelper };
