/**
 *  @Resouce_Reader
 *
 *    used for reading the local resources and Loading
 */
export class ResourceReader {
  private ContentTranslation = {};

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFileContents(): any {
    return this.ContentTranslation;
  }

  Loader(filePath: string): void {
    filePath = '../../resources/' + filePath + '/translation.json';
    this.ContentTranslation = require(filePath);
  }
}
