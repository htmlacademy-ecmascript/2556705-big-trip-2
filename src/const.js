export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const HOURS_IN_DAY = 24;
export const SECONDS_IN_MINUTES = 60;
export const MILLISECONDS_IN_MINUTES = 60000;
export const DATE_FORMAT = {
  'classic-date': 'YYYY-MM-DD',
  'full-date': 'DD/MM/YY hh:mm',
  'hours-minutes': 'hh:mm',
  'number': 'DD',
  'month': 'MMM',
  'number-month': 'DD MMM',
};

export const DEFAULT_POINT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
