require('dotenv').config({ path: './src/config/.env' });
const request = require('supertest');
const getLogger = require('../../src/helpers/logger');
const logger = getLogger('HttpClient');

class HttpClient {
  constructor() {
    this.baseUrl = process.env.BASE_URL || 'https://reqres.in/api' ;
    if (!this.baseUrl) {
        logger.error('BASE_URL is not defined in your .env file');
    }
    if (!process.env.DEFAULT_HEADERS)
    {
        logger.warn('DEFAULT_HEADERS is not defined in your .env file. Using empty headers.');
    }
    else {
      this.defaultHeaders =  {"x-api-key":"reqres-free-v1","Accept":"*/*"};
    }

    
  }

  _mergeHeaders(headers = {}) {
    return { ...this.defaultHeaders, ...headers };
  }

  _buildEndpoint(endpoint, pathParams = {}, queryParams = {}) {
    // Replace path parameters
    let finalEndpoint = endpoint;
    for (const [key, value] of Object.entries(pathParams)) {
        finalEndpoint = finalEndpoint.replace(`:${key}`, encodeURIComponent(value));
    }
    // Append query parameters
    const queryString = new URLSearchParams(queryParams).toString();
    if (queryString) {
        finalEndpoint += `?${queryString}`;
    }
    return finalEndpoint;
  }


  async get(endpoint, { pathParams = {}, queryParams = {}, headers = {} } = {}) {
    logger.debug(`GET Request to ${endpoint} with pathParams: ${JSON.stringify(pathParams)}, queryParams: ${JSON.stringify(queryParams)}`);
    const finalEndpoint = this._buildEndpoint(endpoint, pathParams, queryParams);
    return request(this.baseUrl)
      .get(finalEndpoint)
      .query(queryParams)
      .set(this._mergeHeaders(headers));
  }

  async post(endpoint, {body = {}, pathParams = {}, queryParams = {}, headers = {} } = {}) {
    logger.debug(`POST Request to ${endpoint} with pathParams: ${JSON.stringify(pathParams)}, queryParams: ${JSON.stringify(queryParams)}, body: ${JSON.stringify(body)}`);
    const finalEndpoint = this._buildEndpoint(endpoint, pathParams);
    return request(this.baseUrl)
      .post(finalEndpoint)
      .query(queryParams)
      .send(body)
      .set(this._mergeHeaders(headers));
  }

  async put(endpoint, {body = {}, pathParams = {}, queryParams = {},  headers = {} } = {}) {
    logger.debug(`PUT Request to ${endpoint} with pathParams: ${JSON.stringify(pathParams)}, queryParams: ${JSON.stringify(queryParams)}, body: ${JSON.stringify(body)}`);
    const finalEndpoint = this._buildEndpoint(endpoint, pathParams);
    return request(this.baseUrl)
      .put(finalEndpoint)
      .query(queryParams)
      .send(body)
      .set(this._mergeHeaders(headers));
  }

  async patch(endpoint, { pathParams = {}, queryParams = {}, body = {}, headers = {} } = {}) {
    logger.debug(`PATCH Request to ${endpoint} with pathParams: ${JSON.stringify(pathParams)}, queryParams: ${JSON.stringify(queryParams)}, body: ${JSON.stringify(body)}`);
    const finalEndpoint = this._buildEndpoint(endpoint, pathParams);
    return request(this.baseUrl)
      .patch(finalEndpoint)
      .query(queryParams)
      .send(body)
      .set(this._mergeHeaders(headers));
  }

  async delete(endpoint, { pathParams = {}, queryParams = {}, headers = {} } = {}) {
    logger.debug(`DELETE Request to ${endpoint} with pathParams: ${JSON.stringify(pathParams)}, queryParams: ${JSON.stringify(queryParams)}, body: ${JSON.stringify(body)}`);
    const finalEndpoint = this._buildEndpoint(endpoint, pathParams);
    return request(this.baseUrl)
      .delete(finalEndpoint)
      .query(queryParams)
      .set(this._mergeHeaders(headers));
  }

}

module.exports = HttpClient;
