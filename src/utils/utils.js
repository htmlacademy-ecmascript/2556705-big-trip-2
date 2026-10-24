import dayjs from 'dayjs';
import {
  HOURS_IN_DAY,
  SECONDS_IN_MINUTES,
  MILLISECONDS_IN_MINUTES,
} from '../const';

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

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice ;
}

function isOffersInPoint (point, offers) {
  const typeOffers = offers?.find((off) => off.type === point.type).offers || 'taxi';
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  return pointOffers !== null;
}

export {humanizeTaskDueDate, getDuration, getRandomArrayElement, sortPointDay, sortPointPrice, isOffersInPoint};

