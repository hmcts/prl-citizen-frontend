import _ from 'lodash';

import { CaseType } from '../../app/case/definition';

import { RADataTransformContext, RAFlagDetail, RAFlagValue, RAFlags, RASupportCaseEvent } from './definitions';

export class ReasonableAdjustementsUtility {
  private preprocessFlags(flag: RAFlagValue, context: RADataTransformContext): RAFlagValue {
    return Object.entries(flag).reduce((_flag: Partial<RAFlagValue>, [key, value]) => {
      if (!_.isNull(value)) {
        _flag[key] = value;
      }

      if (key === 'path' && value.length) {
        _flag.path = _flag.path!.map(_path => {
          const { value: pathValue, name, ...rest } = _path;
          const transformedPath = {
            ...rest,
          };

          if (context === RADataTransformContext.EXTERNAL) {
            Object.assign(transformedPath, {
              name: pathValue ?? '',
            });
          }

          if (context === RADataTransformContext.INTERNAL) {
            Object.assign(transformedPath, {
              value: name ?? pathValue ?? '',
            });
          }

          return transformedPath;
        });
      }
      return _flag;
    }, {}) as RAFlagValue;
  }

  preprocessData(flags: RAFlags['details'], context: RADataTransformContext): RAFlags['details'] {
    return flags?.length
      ? (flags.map((flagDetail: RAFlagDetail) => {
          const { value, ...rest } = flagDetail;

          return {
            ...rest,
            value: this.preprocessFlags(value, context),
          };
        }) as RAFlags['details'])
      : [];
  }

  getUpdateFlagsEventID(caseType: CaseType, context: string): RASupportCaseEvent {
    let eventId;

    switch (caseType) {
      case CaseType.C100:
        eventId =
          context === 'manage' ? RASupportCaseEvent.RA_CA_MANAGE_SUPPORT : RASupportCaseEvent.RA_CA_REQUEST_SUPPORT;
        break;
      case CaseType.FL401:
        eventId =
          context === 'manage' ? RASupportCaseEvent.RA_DA_MANAGE_SUPPORT : RASupportCaseEvent.RA_DA_REQUEST_SUPPORT;
        break;
    }

    return eventId;
  }
}

export const RAUtility = new ReasonableAdjustementsUtility();
