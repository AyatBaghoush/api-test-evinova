import { check } from 'k6';

  export function responseTimeIs(response, time =50) {
    return check(response, {
    [`response time < ${time}`]: (r) => r.timings.duration < time,
  });
}