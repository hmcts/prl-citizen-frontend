import autobind from 'autobind-decorator';
import { Response } from 'express';

import {
  C100OrderInterface,
  C100OrderTypeInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  OtherProceedings,
  YesNoEmpty,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../app/form/Form';
import { getNextStepUrl } from '../../../../steps';

import { getFormFields, getOrderSessionDataShape } from './content';

@autobind
export default class AddOrderDetailsPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const orderType = req.query.orderType as C100OrderTypes;
    const orderTypeCaseKey = C100OrderTypeKeyMapper[orderType];
    const form = new Form(getFormFields().fields as FormFields);
    const { addOrder, onlycontinue, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      otherProceedings: {
        ...((req.session?.userCase?.otherProceedings ?? {}) as OtherProceedings),
        order: {
          ...((req.session.userCase?.otherProceedings?.order ?? {}) as C100OrderTypeInterface),
          [orderTypeCaseKey]: this.transformFormData(formData),
        },
      },
    };

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    if (addOrder) {
      req.session.userCase.otherProceedings!.order![orderTypeCaseKey] = [
        ...req.session.userCase.otherProceedings!.order![orderTypeCaseKey],
        getOrderSessionDataShape(),
      ];
      this.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      this.redirect(req, res);
    }
  }

  protected redirect(req: AppRequest<AnyObject>, res: Response, nextUrl?: string): void {
    let target;

    if (req.session.errors?.length) {
      target = req.url;
    } else {
      target = nextUrl || getNextStepUrl(req, req.session.userCase);
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(target);
    });
  }

  private transformFormData(formData): C100OrderInterface[] {
    return Object.entries(formData).reduce((transformedData: C100OrderInterface[], [fieldName, value]) => {
      const [fieldId, fieldIndex] = fieldName.split('-');
      const index = Number(fieldIndex) - 1;

      if (!transformedData[index]) {
        transformedData[index] = getOrderSessionDataShape();
      }

      if (fieldId === 'orderCopy' && value !== YesNoEmpty.YES) {
        delete transformedData[index]['orderDocument'];
      }

      transformedData[index][fieldId] = value;

      return transformedData;
    }, []);
  }
}
