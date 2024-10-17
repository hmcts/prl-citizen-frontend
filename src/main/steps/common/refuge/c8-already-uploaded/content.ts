import { YesOrNo } from '../../../../app/case/definition';
import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { DOWNLOAD_DOCUMENT } from '../../../urls';
import { CommonContent } from '../../common.content';
import { transformFileName } from '../../documents/download/utils';
import { applyParms } from '../../url-parser';

const en = {
  title: 'Uploading a new C8 form',
  previouslyUploaded: 'You have previously uploaded a C8 form. You can view this below:',
  uploadC8Label: 'Do you want to upload a new C8 form?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    uploadC8Again: {
      required: 'Select if you want to upload a new C8 form',
    },
  },
};

const cy: typeof en = {
  title: 'Uploading a new C8 form (welsh)',
  previouslyUploaded: 'You have previously uploaded a C8 form. You can view this below: (welsh)',
  uploadC8Label: 'Do you want to upload a new C8 form? (welsh)',
  one: 'Yes (welsh)',
  two: 'No (welsh)',
  continue: 'Continue (welsh)',
  errors: {
    uploadC8Again: {
      required: 'Select if you want to upload a new C8 form (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    uploadC8Again: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.uploadC8Label,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.continue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent = (content: CommonContent): PageContent => {
  const translations = languages[content.language];
  const request = content.additionalData!.req;
  const caseData = request.session.userCase;
  const c8Document = caseData.c8_refuge_document;

  const partyType = getCasePartyType(caseData, request.session.user.id);
  const url = applyParms(DOWNLOAD_DOCUMENT, {
    partyType,
    documentId: c8Document.document_url.substring(c8Document.document_url.lastIndexOf('/') + 1),
    documentName: transformFileName(c8Document.document_filename),
  });

  return {
    ...translations,
    form,
    c8Document: {
      href: url,
      fileName: c8Document.document_filename,
    },
  };
};
