import {FilterType} from '../const';
import dayjs from 'dayjs';

function isPointInFuture (point) {
  return dayjs(point.dateFrom).diff(dayjs(new Date())) > 0;
}

function isPointInPast (point) {
  return dayjs(point.dateTo).diff(dayjs(new Date())) < 0;
}

function isPointInPresent (point) {
  return dayjs(point.dateFrom).diff(dayjs(new Date())) < 0 && dayjs(point.dateTo).diff(dayjs(new Date())) > 0;
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point)),
};

export {filter};
