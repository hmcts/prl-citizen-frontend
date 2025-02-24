import { YesOrNo } from '../../../../app/case/definition';
import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getPeople } from '../../../c100-rebuild/child-details/live-with/utils';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { C100_URL, DOWNLOAD_DOCUMENT } from '../../../urls';
import { CommonContent } from '../../common.content';
import { transformFileName } from '../../documents/download/utils';
import { interpolate } from '../../string-parser';
import { applyParms } from '../../url-parser';
import { getC8DocumentForC100 } from '../utils';
export * from './routeGuard';

const en = {
  title: 'Upload a new C8 form',
  previouslyUploaded: 'You have previously uploaded a C8 form.',
  c100PreviouslyUploaded: 'A C8 form has already been uploaded for {name}',
  canView: 'You can view the uploaded document',
  viewDoc: 'here (opens in a new tab)',
  uploadC8Label: 'Do you still want to upload a new C8 form?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  bannerHeading: 'Important',
  errors: {
    reUploadRefugeDocument: {
      required: 'Select if you want to upload a new C8 form',
    },
  },
};

const cy: typeof en = {
  title: 'Uwchlwytho ffurflen C8 newydd',
  previouslyUploaded: 'Rydych eisoes wedi uwchlwytho ffurflen C8.',
  c100PreviouslyUploaded: 'Mae ffurflen C8 eisoes wedi’i huwchlwytho ar gyfer {name}',
  canView: 'Gallwch weld hon',
  viewDoc: 'yma (yn agor mewn tab newydd)',
  uploadC8Label: 'Ydych chi dal eisiau uwchlwytho ffurflen C8 newydd?',
  one: 'Ydw',
  two: 'Nac ydw',
  continue: 'Parhau',
  bannerHeading: 'Pwysig',
  errors: {
    reUploadRefugeDocument: {
      required: 'Dewiswch a ydych chi eisiau uwchlwytho ffurflen C8 newydd',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    reUploadRefugeDocument: {
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
};

export const generateContent = (content: CommonContent): PageContent => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session?.userCase;
  let c8Document = caseData.refugeDocument;
  const C100rebuildJourney = request.originalUrl?.startsWith(C100_URL);
  const id = request.params.id;

  const c100Person = getPeople(caseData).find(person => person.id === id);

  delete form.saveAndComeLater;
  if (C100rebuildJourney) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });

    c8Document = getC8DocumentForC100(id, caseData, c100Person!);
  }

  const partyType = getCasePartyType(caseData, request.session?.user.id);
  const url = applyParms(DOWNLOAD_DOCUMENT, {
    partyType,
    documentId: c8Document?.document_url.substring(c8Document.document_url.lastIndexOf('/') + 1),
    documentName: transformFileName(c8Document?.document_filename),
  });

  return {
    ...translations,
    previouslyUploaded: C100rebuildJourney
      ? interpolate(translations.c100PreviouslyUploaded, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.previouslyUploaded,
    form,
    c8Document: {
      href: url,
      fileName: c8Document.document_filename,
    },
  };
};
