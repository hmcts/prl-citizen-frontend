import { StatusCodes } from 'http-status-codes';

const en = {
  [StatusCodes.BAD_REQUEST]: {
    title: 'Bad request',
  },
  [StatusCodes.NOT_FOUND]: {
    title: 'Page not found',
    line1: 'If you typed the web address into the URL bar, check that it is correct.',
    line2: 'If you pasted the web address, check you copied the entire address.',
    line3:
      'If you followed a link, there may be a problem with the service or the link has timed out. You should ask for a new link.',
    line4: 'If you need support for the online Family Private Law service, contact your social worker or adoption agency.',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    title: 'Sorry, there is a problem with the online Family Private Law service',
    info: 'Please try again later. We have saved your answers.',
  },
};

const cy: typeof en = {
  [StatusCodes.BAD_REQUEST]: {
    title: 'Cais gwael',
  },
  [StatusCodes.NOT_FOUND]: {
    title: 'Ni ellir dod o hyd i’r dudalen',
    line1: 'Os bu ichi deipio cyfeiriad y wefan i’r bar URL, gwiriwch ei fod yn gywir.',
    line2: 'Os bu ichi ludo cyfeiriad y wefan, gwiriwch eich bod wedi copïo’r cyfeiriad cyfan.',
    line3:
      'Os bu ichi ddilyn dolen, efallai bod problem gyda’r gwasanaeth neu fod y ddolen wedi dyddio.  Dylech ofyn am gael dolen newydd.',
    line4:
      'Os ydych angen cymorth gyda’r gwasanaeth mabwysiadu ar-lein, cysylltwch â’ch gweithiwr cymdeithasol neu asiantaeth fabwysiadu.',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    title: 'Yn anffodus, rydym yn cael problemau technegol',
    info: 'Rhowch gynnig arall arni ymhen ychydig funudau',
  },
};

export const errorContent = { en, cy };
