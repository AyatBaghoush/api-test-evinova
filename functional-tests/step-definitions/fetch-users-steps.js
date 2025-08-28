const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;
const getLogger = require('../../src/helpers/logger');
const logger = getLogger('fetch-users-steps');
const HttpClient = require('../../src/infra/httpClient');


// Set default timeout for all steps (e.g., 10 seconds)
setDefaultTimeout(10 * 1000);

const httpClient = new HttpClient();

When(/^I retrieve the list of users$/, async function () {
  this.response = await httpClient.get(this.endpoint, this.queryParams);
});

Then(/Response should contain list of users$/, async function () {
logger.debug("The response contains user list as: " + JSON.stringify(this.response.body.data));
 expect(this.response.body).to.have.property('data').that.is.an('array').that.is.not.empty;

});
       