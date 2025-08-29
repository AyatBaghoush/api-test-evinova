import { check } from 'k6';

  export function statusIs(response, code =200) {
    return check(response, {
    [`status is ${code}`]: (r) => r.status === code
  });
}
