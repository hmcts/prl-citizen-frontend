const I = actor();
const retryCount = 3;
module.exports = {

async clickCARespondent() {
    await I.retry(retryCount).waitForText('C100 applications where you are an respondent');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/16661841571620'])");
    I.wait('1');
},

async RespondToAllegationOfHarm() {
    await I.retry(retryCount).click('#respond_to_allegations_of_harm_and_violence');
    I.wait('2');
},

async RespondToAllegationOfHarm1() {
    await I.retry(retryCount).waitForText('Do the children live outside of England or Wales?');
    await I.retry(retryCount).click('#start');
    await I.retry(retryCount).fillField('#iFactorsStartProvideDetails', 'England');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
},

async RespondToAllegationOfHarm2() {
        await I.retry(retryCount).waitForText("Do the children's parents or anyone significant to the children live outside of England or Wales?");
        await I.retry(retryCount).click('#start');
        await I.retry(retryCount).fillField('#parents', 'Grandparents');
        await I.retry(retryCount).click('Continue');
        I.wait('2');
},

async RespondToAllegationOfHarm3() {
        await I.retry(retryCount).waitForText('Could another person in the application apply for a similar order in a country outside England or Wa');
        await I.retry(retryCount).click('#jurisdiction');
        await I.retry(retryCount).fillField('Provide details', 'Canada');
        await I.retry(retryCount).click('Continue');
        I.wait('2');
},
            
async RespondToAllegationOfHarm4() {
                await I.retry(retryCount).waitForText('Has another country asked (or been asked) for information or help for the children?');
                await I.retry(retryCount).click('#request');
                await I.retry(retryCount).fillField('Provide details', 'Canada');
                await I.retry(retryCount).click('Continue');
                I.wait('2');
                  
},
                  
async RespondToAllegationSummary() {
                    await I.retry(retryCount).waitForText('Check your answers');
                    await I.retry(retryCount).click('Save and continue');
                    I.wait('2');
                
},
                
                  
async RespondToAllegationOfHarmHappyPath() {
                    await this.clickCARespondent();
                    await this.RespondToAllegationOfHarm();
                    await this.RespondToAllegationOfHarm2();
                    await this.RespondToAllegationOfHarm3();
                    await this.RespondToAllegationOfHarm4();
                    await this.RespondToAllegationSummary();
}
};
