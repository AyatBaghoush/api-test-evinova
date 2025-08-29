
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';
const { statusIs } = require('../checks/status.js');
const { responseTimeIs } = require('../checks/responseTime.js');
const { responseHasData } = require('../checks/responseHasData.js');
const defaultOptions = require('../options/default.js');
const defaultThresholds = require('../thresholds/default.js');
// Custom metrics
const responseTimeTrend = new Trend('response_time');
const requestCounter = new Counter('request_count');
const successRate = new Rate('success_rate');

export const options = {
  ...defaultOptions,
  thresholds: defaultThresholds,
};

export default function () {

  const url = 'https://reqres.in/api/users';
    const params = {
    headers: {
        'Accept': '*/*',
        'x-api-key': 'reqres-free-v1' // Replace with your actual token if needed
    },
    params: {
        page: 2,
        per_page: 6
    }
    };

  const res = http.get(url, params);

 // Record metrics
  responseTimeTrend.add(res.timings.duration);
  requestCounter.add(1);
  successRate.add(res.status === 200);

  // Perform checks
  statusIs(res, 200);
  responseTimeIs(res, 50);
  responseHasData(res);

  // Simulate user think time

  sleep(1); // simulate user think time
}

export function handleSummary(data) {
  return {
    './load-report/k6-report.html': htmlReport(data), // Generate HTML report
    './load-report/k6-summary.json': JSON.stringify(data, null, 2), // This file will be used by the HTML reporter
  };
}
