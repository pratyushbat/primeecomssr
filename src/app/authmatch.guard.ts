import { CanActivateFn } from '@angular/router';

export const authmatchGuard: CanActivateFn = (route, state) => {
  return true;
};
