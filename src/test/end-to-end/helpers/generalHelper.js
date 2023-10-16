// eslint-disable-next-line no-undef
const { Helper } = codeceptjs;

const fields = {
  eventList: 'select[id="next-step"]',
  submit: 'button[type="submit"]'
};

class GeneralHelper extends Helper {
  async addNewDocument(field) {
    const { Playwright } = this.helpers;
    await Playwright.click('Add new', { css: `#${field}>div>button` });
    await Playwright.attachFile(`input[id="${field}_value"]`, '../resource/dummy.pdf');
  }

  async attachDocument(field) {
    const { Playwright } = this.helpers;
    await Playwright.attachFile(`input[id="${field}"]`, '../resource/dummy.pdf');
  }

  async amOnHistoryPageWithSuccessNotification() {
    const historyResponseTime = 6;
    const { Playwright } = this.helpers;
    await Playwright.wait(historyResponseTime);
    await Playwright.waitForText('History');
    // console.log(await Puppeteer.grabTextFrom('div.alert-message'));
    // await Puppeteer.waitForElement('i.icon-tick');
    await Puppeteer.wait(historyResponseTime);
  }

  async selectFromList(list, value) {
    const { Playwright } = this.helpers;
    await Playwright.waitForElement(list);
    await Playwright.wait('5');
    await Playwright.selectOption(list, value);
  }

  async selectPostCodeLookupAddress(locator, postcode) {
    const searchResponseTime = 3;
    const { Playwright } = this.helpers;
    const postcodeInputLocator = `//input[@id="${locator}_postcodeInput"]`;
    const addressListLocator = `select[id="${locator}_addressList"]`;
    const findAddressBtn = `#${locator}_postcodeLookup > button`;

    await Playwright.wait(searchResponseTime);
    await Playwright.waitForElement(postcodeInputLocator);
    await Playwright.fillField(postcodeInputLocator, postcode);
    await Playwright.click(findAddressBtn);
    await Playwright.wait(searchResponseTime);
    await Playwright.waitForElement(addressListLocator);
    await Playwright.wait(searchResponseTime);
    await Playwright.selectOption(addressListLocator, '1: Object');
  }

  async submitEvent() {
    const { Playwright } = this.helpers;
    const saveResponseTime = 5;
    try {
      await Playwright.waitForText('Check your answers', '30');
      await Playwright.click('Save and continue');
      await Playwright.wait(saveResponseTime);
    } catch {
      await Playwright.click('Continue');
      await Playwright.waitForText('Check your answers', '30');
      await Playwright.click('Save and continue');
      await Playwright.wait(saveResponseTime);
    }
  }

  async triggerEvent(eventName) {
    const { Playwright } = this.helpers;
    await Playwright.waitForElement(fields.eventList);
    await Playwright.selectOption(fields.eventList, eventName);
    await Playwright.click(fields.submit);
  }

  async waitForPage(header, headerText) {
    const { Playwright } = this.helpers;

    try {
      // eslint-disable-next-line no-undefined
      if (headerText === undefined) {
        await Playwright.waitForElement(header, '90');
      } else {
        await Playwright.waitForText(headerText, '90', header);
      }
    } catch (error) {
      throw error;
    }
  }
  async seeDocuments(title, documentName) {
    const { Playwright } = this.helpers;
    await Playwright.see(title);
    await Playwright.see(documentName);
  }
}

module.exports = GeneralHelper;
