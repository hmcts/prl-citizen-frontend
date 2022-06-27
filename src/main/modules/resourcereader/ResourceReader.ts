/**
 *  @Resouce_Reader
 *
 *    used for reading the local resources and Loading
 */
export class ResourceReader {
  private ContentTranslation = {};

  getFileContents(): any {
    return this.ContentTranslation;
  }

  Loader(filePath: string): void {
    filePath = '../../resources/' + filePath + '/translation.json';
    this.ContentTranslation = require(filePath);
  }
}
