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

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
});
