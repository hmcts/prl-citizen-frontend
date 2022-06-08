// eslint-disable-next-line no-undef
const { Helper } = codeceptjs;

const fields = {
  eventList: 'select[id="next-step"]',
  submit: 'button[type="submit"]'
};

class GeneralHelper extends Helper {
  async addNewDocument(field) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.click('Add new', { css: `#${field}>div>button` });
    await Puppeteer.attachFile(`input[id="${field}_value"]`, '../resource/dummy.pdf');
  }

  async attachDocument(field) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.attachFile(`input[id="${field}"]`, '../resource/dummy.pdf');
  }

  async amOnHistoryPageWithSuccessNotification() {
    const { Puppeteer } = this.helpers;
    await Puppeteer.waitForText('History');
    await Puppeteer.waitForElement('i.icon-tick');
  }

  async selectPostCodeLookupAddress(locator, postcode) {
    const searchResponseTime = 3;
    const { Puppeteer } = this.helpers;
    const postcodeInputLocator = `//input[@id="${locator}_postcodeInput"]`;
    const addressListLocator = `select[id="${locator}_addressList"]`;

    await Puppeteer.waitForElement(postcodeInputLocator);
    await Puppeteer.fillField(postcodeInputLocator, postcode);
    await Puppeteer.click('Find address');
    await Puppeteer.waitForElement(addressListLocator);
    await Puppeteer.wait(searchResponseTime);
    await Puppeteer.selectOption(addressListLocator, '1: Object');
  }

  async submitEvent() {
    const { Puppeteer } = this.helpers;
    try {
      await Puppeteer.waitForText('Check your answers', '30');
      await Puppeteer.click('Save and continue');
    } catch {
      await Puppeteer.click('Continue');
      await Puppeteer.waitForText('Check your answers', '30');
      await Puppeteer.click('Save and continue');
    }
  }

  async triggerEvent(eventName) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.waitForElement(fields.eventList);
    await Puppeteer.selectOption(fields.eventList, eventName);
    await Puppeteer.click(fields.submit);
  }

  async waitForPage(header, headerText) {
    const { Puppeteer } = this.helpers;

    try {
      // eslint-disable-next-line no-undefined
      if (headerText === undefined) {
        await Puppeteer.waitForElement(header, '90');
      } else {
        await Puppeteer.waitForText(headerText, '90', header);
      }
    } catch (error) {
      throw error;
    }
  }
  async seeDocuments(title, documentName) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.see(title);
    await Puppeteer.see(documentName);
  }
}

module.exports = GeneralHelper;
