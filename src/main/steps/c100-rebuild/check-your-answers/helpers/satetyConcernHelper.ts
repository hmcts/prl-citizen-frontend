// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SafetyConcernsHelper = (userCase, keys, sessionKey) => {
  const subFieldKey = 'c1A_safteyConcerns' as string;
  if (userCase.hasOwnProperty(sessionKey)) {
    const storage = [] as any[];
    userCase[sessionKey].forEach(key => {
      if (userCase.hasOwnProperty(subFieldKey)) {
        const FoundElement = userCase[subFieldKey]?.['child'][key];
        storage.push(FoundElement);
      }
    });
    console.log({ storage });
    return '';
  }
  return '';
};
