export const POINT_TYPES = ['taxi', 'drive', 'bus', 'train', 'ship', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MINUTES_IN_HOUR = 60;
export const DEFAULT_TEXT_FROM_SERVER = 'Loading...';
export const AUTHORIZATION = 'Basic 322ffdgffdsfvedhtrwtrwtr';
export const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

export const DateFormat = {
  'classic-date': 'YYYY-MM-DD',
  'full-date': 'DD/MM/YY hh:mm',
  'hours-minutes': 'hh:mm',
  'full-hours-minutes': 'HH:mm',
  'date-month': 'DD MMM',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const NoPointsTextType = {
  everything: 'Click New Event to create your first point',
  present: 'There are no present events now',
  future: 'There are no future events now',
  past: 'There are no past events now',
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
  INIT: 'INIT',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
