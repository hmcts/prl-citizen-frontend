export const transformFileName = (fileName: string): string => {
  return fileName.replace(/\s+/g, '_--_');
};

export const deTransformFileName = (fileName: string): string => {
  return fileName.replace(/_--_+/g, ' ');
};
export const enum DOCUMENT_LANGUAGE {
  ENGLISH = 'en',
  WELSH = 'cy',
}
