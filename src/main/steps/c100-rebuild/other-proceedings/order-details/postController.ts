import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  YesNoEmpty,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

import { getFormFields, getOrderSessionDataShape } from './content';

@autobind
export default class AddOrderDetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const orderType = req.params.orderType as C100OrderTypes;
    const orderTypeCaseKey = C100OrderTypeKeyMapper[orderType];
    const form = new Form(getFormFields(req.session.userCase, orderType).fields as FormFields);
    const { addOrder, onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const newData: Partial<Case> = {
      op_otherProceedings: {
        ...(req.session?.userCase?.op_otherProceedings ?? {}),
        order: {
          ...(req.session.userCase?.op_otherProceedings?.order ?? {}),
          [orderTypeCaseKey]: this.transformFormData(
            formData,
            req.session?.userCase?.op_otherProceedings?.order?.[orderTypeCaseKey]
          ),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...newData,
    };

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    if (addOrder) {
      const orders = req.session.userCase.op_otherProceedings!.order![orderTypeCaseKey];
      req.session.userCase.op_otherProceedings!.order![orderTypeCaseKey] = [
        ...orders,
        {
          ...getOrderSessionDataShape(),
          id: String(orders.length + 1),
        },
      ];
      super.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { ...newData });
    }
  }

  private transformFormData(formData, orginialData: C100OrderInterface[]): C100OrderInterface[] {
    return Object.entries(formData).reduce((transformedData: C100OrderInterface[], [fieldName, value]) => {
      const [fieldId, fieldIndex] = fieldName.split('-');
      const index = Number(fieldIndex) - 1;

      if (!transformedData[index]) {
        transformedData[index] = getOrderSessionDataShape();
        transformedData[index].id = fieldIndex;
      }

      if (fieldId === 'orderCopy' && value !== YesNoEmpty.YES) {
        delete transformedData[index]['orderDocument'];
      }

      transformedData[index][fieldId] = value;

      return transformedData;
    }, orginialData ?? []);
  }
}
