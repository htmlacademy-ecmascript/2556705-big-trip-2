import { humanizePointDueDate, getTotalTripPrice } from '../utils/utils.js';
import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createHeaderInfoTemplate(points, destinations, offers) {
  const totalPrice = getTotalTripPrice(points, offers);
  const totalPointDestinations = points.map((point) => point.destination);
  const totalDestinations = totalPointDestinations.map((destination) => destinations?.find((dest) => dest.id === destination));
  const totalNamesDestinations = totalDestinations.map((destination) => destination?.name);
  const overageDestinations = [];
  totalNamesDestinations.forEach((destination, i, array) => {
    if (i === 0 || i === array.length - 1) {
      overageDestinations.push(destination);
    }
  });
  const startTimeTrip = points[0]?.dateFrom;
  const endTimeTrip = points[points.length - 1]?.dateTo;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${(totalDestinations.length <= 3) ?
      totalNamesDestinations.join('-') :
      overageDestinations.join('...')}</h1>
        <p class="trip-info__dates">${humanizePointDueDate(startTimeTrip, DateFormat['date-month'])} -
        ${humanizePointDueDate(endTimeTrip, DateFormat['date-month'])}</p>
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
