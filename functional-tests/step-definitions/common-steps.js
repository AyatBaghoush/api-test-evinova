const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;
const getLogger = require('../../src/helpers/logger');
const logger = getLogger('common-steps');
const endpoints = require('../../src/test-data/users.endpoints.json');

// Set default timeout for all steps (e.g., 10 seconds)
setDefaultTimeout(20 * 1000);


Given(/^The "([^"]+)" service is available$/, async function (endpointName) {
  this.endpoint = endpoints[endpointName];

  if (!this.endpoint) {
    logger.error(`Endpoint for "${endpointName}" not found`);
    throw new Error(`Missing endpoint: ${endpointName}`);
  }
  logger.debug(`The requested endpoint is: ${this.endpoint}`);
});

Then(/^I should receive a response code (\d+)$/, async function (expectedStatusCode) {
    logger.debug(`Response received with status: ${this.response.status}`);
  expect(this.response.status).to.equal(expectedStatusCode);  
});