import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { Case } from '../../../../app/case/case';
import {
  ProceedingsOrderInterface,
  ProceedingsOrderTypeKeyMapper,
  ProceedingsOrderTypes,
  YesNoEmpty,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { setDynamicFormContext } from '../../../c100-rebuild/people/util';

import { getFormFields, getOrderSessionDataShape } from './content';

@autobind
export default class AddOrderDetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const orderType = req.params.orderType as ProceedingsOrderTypes;
    const orderTypeCaseKey = ProceedingsOrderTypeKeyMapper[orderType];
    const form = new Form(
      getFormFields(req.session.userCase, orderType, _.get(req, 'session.applicationSettings.dynamicForm.context'))
        .fields as FormFields
    );
    const { addOrder, onlyContinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const newData: Partial<Case> = {
      otherProceedings: {
        ...(req.session?.userCase?.otherProceedings ?? {}),
        order: {
          ...(req.session.userCase?.otherProceedings?.order ?? {}),
          [orderTypeCaseKey]: this.transformFormData(
            formData,
            req.session?.userCase?.otherProceedings?.order?.[orderTypeCaseKey]
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
      const orders = req.session.userCase.otherProceedings!.order![orderTypeCaseKey];
      req.session.userCase.otherProceedings!.order![orderTypeCaseKey] = [
        ...orders,
        {
          ...getOrderSessionDataShape(),
          id: String(orders.length + 1),
        },
      ];
      setDynamicFormContext(req, 'add');
      super.redirect(req, res, req.originalUrl);
    } else if (onlyContinue) {
      super.redirect(req, res);
    }
  }

  private transformFormData(formData, orginialData: ProceedingsOrderInterface[]): ProceedingsOrderInterface[] {
    return Object.entries(formData).reduce((transformedData: ProceedingsOrderInterface[], [fieldName, value]) => {
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
