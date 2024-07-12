const I = actor();
const retryCount = 3;

module.exports = {

    async clickCheckBoxWithLabel(label) {
        const locator = `//label[contains(text(),"${label}")]/../input`;
        await I.waitForElement(locator);
        await I.click(locator);
    },

    async clickRadioOption(fieldName, value) {
        const locator = `//*[contains(text(),"${fieldName}")]/..//label[contains(text(),"${value}")]/../input`;
        await I.waitForElement(locator);
        await I.click(locator);

    },

    async selectOptionWithLabel(name, pos) {
        const locator = `//label[contains(text(),"${name}")]/../select`;
        await I.waitForElement(locator);
        const optionVal = await I.grabText(`//label[contains(text(),"${name}")]/../select//option[${pos}]`)
        await I.selectOption(locator, optionVal);

    },

    async clickLink(linkText) {
        const locator = `//body//a[contains(text(),"${linkText}")]`;
        await I.waitForElement(locator);
        await I.click(locator);

    },

    async clickButton(label) {
        const locator = `//body//button[contains(text(),"${label}")]`;
        await I.waitForElement(locator);
        await I.click(locator);

    },

    async clickFieldWithID(id) {
        const locator = `#${id}`;
        await I.waitForElement(locator);
        await I.click(locator);

    },

    async fillFieldWithLabel(name, value) {
        const locator = `//label[contains(text(),"${name}")]/../input`;
        await I.waitForElement(locator);
        await I.fillField(locator, value);

    },

    async fillFieldWithId(id, value) {
        const locator = `#${id}`;
        await I.waitForElement(locator);
        await I.fillField(locator, value);

    },

    async enterDate(dateField, day, month, year) {
        const dayField = `//*[contains(text(),"${dateField}")]/..//label[contains(text(),'Day')]/../input`;
        const monthField = `//*[contains(text(),"${dateField}")]/..//label[contains(text(),'Month')]/../input`;
        const yearField = `//*[contains(text(),"${dateField}")]/..//label[contains(text(),'Year')]/../input`;

        await I.fillField(dayField, day);
        await I.fillField(monthField, month);
        await I.fillField(yearField, year);

    },

    async selectFile(fieldName, filePath){
        const locator = `//label[contains(text(),"${fieldName}")]/../input`;
        await I.waitForElement(locator);
        await I.attachFile(locator, filePath)
    }

}


