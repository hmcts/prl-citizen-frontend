import { CaseWithId } from '../../../../app/case/case';

const tailId = (url?: string): string | undefined => (url ? url.substring(url.lastIndexOf('/') + 1) : undefined);

/**
 * Returns true if `documentId` appears in any of the listed userCase fields.
 * Prevents IDOR: a user can only delete documents attached to their own case.
 */
export const isDocumentOwnedByUser = (
  userCase: Partial<CaseWithId> | undefined,
  documentId: string | undefined,
  fields: string[]
): boolean => {
  if (!userCase || !documentId) {
    return false;
  }
  return fields.some(field => {
    const value = (userCase as Record<string, unknown>)[field];
    if (!value) {
      return false;
    }
    const list = Array.isArray(value) ? value : [value];
    return list.some(
      (doc: Record<string, unknown> & { value?: { citizenDocument?: { document_url?: string } } }) =>
        doc?.id === documentId ||
        (doc as { document_id?: string })?.document_id === documentId ||
        tailId((doc as { url?: string })?.url) === documentId ||
        tailId((doc as { document_url?: string })?.document_url) === documentId ||
        tailId(doc?.value?.citizenDocument?.document_url) === documentId
    );
  });
};
