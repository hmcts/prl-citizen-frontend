const I = actor();
const retryCount = 3;

module.exports = {
    async selectCase(){
    I.wait('2');
    const linkSelector = locate('ul li a').withText('Case list');
    await I.click(linkSelector);
   },

   async assignTaskToSelf(){
    await this.selectCase();
   },
   
};
