import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {
  HOURS_IN_DAY,
  SECONDS_IN_MINUTES,
  MILLISECONDS_IN_MINUTES,
} from '../const';

dayjs.extend(minMax);

function humanizeTaskDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(start, end) {
  const difference = dayjs(end).diff(start) / MILLISECONDS_IN_MINUTES;

  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format('mm[M]');

    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format('HH[H] mm[M]');
    default:
      return dayjs(difference).format('DD[D] HH[H] mm[M]');
  }
}

export {humanizeTaskDueDate, getDuration};

