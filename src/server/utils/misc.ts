import mapValues from 'lodash.mapvalues';

export const stringifyObject = (object: Record<string, unknown>) =>
  mapValues(object, (value) =>
    Array.isArray(value) ? JSON.stringify(value) : String(value),
  );
