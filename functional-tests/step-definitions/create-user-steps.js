const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;
const getLogger = require('../../src/helpers/logger');
const logger = getLogger('fetch-users-steps');
const HttpClient = require('../../src/infra/httpClient');
const testDataManager = require('../../src/helpers/testDataManager');

// Set default timeout for all steps (e.g., 10 seconds)
setDefaultTimeout(20 * 1000);

const httpClient = new HttpClient();

When(/I set payload to have valid user data$/, async function () {
    this.payload = await testDataManager.getValidUser(4);
    logger.debug("The payload for creating user is: " + JSON.stringify(this.payload));
});

When(/I set payload to have Missing Password user data$/, async function () {
    this.payload = await testDataManager.getMissingPasswordUser(4);
    logger.debug("The payload for creating user is: " + JSON.stringify(this.payload));
});

When(/I send request to create a new user$/, async function () {
    this.response = await httpClient.post(this.endpoint, this.payload);
    logger.debug("The response after creating user is: " + JSON.stringify(this.response.body));
});

Then(/Response should contain error message "([^"]+)"$/, async function (expectedErrorMsg) {
    logger.debug("The response contains error message as: " + JSON.stringify(this.response.body.error));
    expect(this.response.body).to.have.property('error').that.includes(expectedErrorMsg);

});