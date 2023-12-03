import mapValues from 'lodash.mapvalues';

export const KEY_EXPIRATION_TIME = 60 * 60 * 24 * 5;

export const USER_EXPIRATION_TIME = 60 * 60 * 24 * 30;

export const stringifyObject = (object: Record<string, unknown>) =>
  mapValues(object, (value) =>
    Array.isArray(value) ? JSON.stringify(value) : String(value),
  );
