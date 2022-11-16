// /* eslint-disable @typescript-eslint/no-explicit-any */
// import autobind from 'autobind-decorator';
// import { Response } from 'express';

// import { ChildrenDetails, PartyType } from '../../../../app/case/definition';
// import { AppRequest } from '../../../../app/controller/AppRequest';
// import { AnyObject, PostController } from '../../../../app/controller/PostController';
// import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
// import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../people/util';

// import { getFormFields } from './content';

// @autobind
// export default class ParentalResponsibilityPostController extends PostController<AnyObject> {
//   constructor(protected readonly fields: FormFields | FormFieldsFn) {
//     super(fields);
//   }

//   public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
//     const childId = req.params.childId as ChildrenDetails['id'];
//     const form = new Form(getFormFields().fields as FormFields);
//     const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
//     const { _csrf, ...formData } = form.getParsedBody(formFields);

//     req.session.userCase.cd_children = updatePartyDetails(req.session.userCase.cd_children, {
//       ...(getPartyDetails(req.session.userCase.cd_children!, childId) as ChildrenDetails),
//       parentialResponsibility: transformPartyDetails(
//         PartyType.CHILDREN,
//         PartyDetailsVariant.PARENTAL_RESPONSIBILITY,
//         formData
//       ) as ChildrenDetails['parentialResponsibility'],
//     }) as ChildrenDetails[];

//     if (onlycontinue) {
//       req.session.errors = form.getErrors(formData);
//       return super.redirect(req, res);
//     } else if (saveAndComeLater) {
//       super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
//     }
//   }
// }
