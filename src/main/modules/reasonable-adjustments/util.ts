import _ from 'lodash';

import { RAFlagDetail, RAFlagValue, RAFlags } from './interface';

export class ReasonableAdjustementsUtility {
  transformFlags(existingRAFlags: RAFlags): RAFlags {
    const flags = { ...existingRAFlags };

    if (flags?.details.length) {
      return {
        ...flags,
        details: flags.details.map((flagDetail: RAFlagDetail) => {
          return {
            ...flagDetail,
            value: Object.entries(flagDetail.value).reduce((_flag: Partial<RAFlagValue>, [key, value]) => {
              if (!_.isNull(value)) {
                _flag[key] = value;
              }

              if (key === 'path' && value.length) {
                _flag.path = _flag.path!.map(path => {
                  const pathName = path?.value ?? '';
                  delete path?.value;

                  return {
                    ...path,
                    name: pathName,
                  };
                });
              }

              return _flag;
            }, {}) as RAFlagValue,
          };
        }),
      };
    }

    return flags;
  }
}

export const RAUtility = new ReasonableAdjustementsUtility();
