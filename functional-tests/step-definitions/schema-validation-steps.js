const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;
const getLogger = require('../../src/helpers/logger');
const logger = getLogger('schema-validation-steps');
const validator = require('../../src/helpers/schemaValidator');

Then('Response should match JSON schema {string}', async function (schemaFile) { 
  let schemaPath = "../../src/test-data/schemas/" + schemaFile;
  let schema;
  try {
     schema = require(schemaPath);
  } catch (error) {
    logger.error(`Schema file ${schemaFile} not found or invalid.`);
  }

  // Register schema
  validator.registerSchema('userList', schema);
  expect(() => validator.validate('userList', this.response.body)).to.not.throw();
});