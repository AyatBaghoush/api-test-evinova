import { check } from 'k6';

  export function responseHasData(response) {
    return check(response, {
    [`response data size `]: (r) => JSON.parse(r.body).data.length > 0
  });
}