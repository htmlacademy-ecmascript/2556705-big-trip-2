import { humanizePointDueDate } from '../utils/utils.js';
import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
function createHeaderInfoTemplate(points, destinations, offers) {
  // ! Вычисляем basePrice для всех точек маршрута
  const basePrice = points.map((point) => point.basePrice);
  const totalBasePrice = basePrice.reduce((total, value) =>
    total + (Number(value) || 0), 0);
  // ! Вычисляем offersPrice для всех точек маршрута
  // 1) Массив, сосоящий из массивов, содержащих id предложений
  const bigArrayPointsOffers = points.map((point) => point.offers);
  // 2) Массив из значений всех id offers
  const totalOffers = [];
  bigArrayPointsOffers.forEach((pointOffers) => {
    pointOffers.forEach((pointOffer) => totalOffers.push(pointOffer));
  });
  // 3) Массив, сосоящий из массивов offers, каждый из которых принадлежит offers
  const offersInOffers = offers.map((currentOffer) => currentOffer.offers);
  // 4) Создаем масссив, который будет содержать все offersPrice
  const offersPrice = [];
  totalOffers.forEach((offerId) => {
    offersInOffers.forEach((offersInOffer) => {
      offersInOffer.forEach((offerInOffer) => {
        if(offerInOffer.id === offerId) {
          offersPrice.push(offerInOffer.price);
        }
      });
    });
  });
  // 5) Вычисляем offersPrice для всех точек маршрута
  const totalOffersPrice = offersPrice.reduce((total, value) => total + (Number(value) || 0), 0);
  const totalPrice = totalOffersPrice + totalBasePrice;
  const totalPointDestinations = points.map((point) => point.destination);
  const totalDestinations = totalPointDestinations.map((destination) => destinations?.find((dest) => dest.id === destination));
  const totalNamesDestinations = totalDestinations.map((destination) => destination?.name);
  const manyDestinations = [];
  totalNamesDestinations.forEach((destination, i, array) => {
    if(i === 0 || i === array.length - 1) {
      manyDestinations.push(destination);
    }
  });
  const startTimeTrip = points[0]?.dateFrom;
  const endTimeTrip = points[points.length - 1]?.dateTo;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${(totalDestinations.length <= 3) ?
      totalNamesDestinations.join('-') :
      manyDestinations.join('...')}</h1>
        <p class="trip-info__dates">${humanizePointDueDate(startTimeTrip, DATE_FORMAT['date-month'])} -
        ${humanizePointDueDate(endTimeTrip, DATE_FORMAT['date-month'])}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">
        ${totalPrice}
        </span>
      </p>
    </section>`
  );
}

export default class HeaderInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
