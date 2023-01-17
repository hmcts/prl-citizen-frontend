Feature('Smoke tests @smoke-tests');
Scenario('sign in as citizen', async ({ CitizenLoginPage, CreateApplication }) => {
    await CitizenLoginPage.loginAsCitizenUserNamePassWord();
    await CreateApplication.createNewC100Application();
});
