import { humanizePointDueDate } from '../utils/utils.js';
import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
function createHeaderInfoTemplate(points, destinations) {
  const totalBasePrice = points.map((point) => point.basePrice);
  const totalPrice = totalBasePrice.reduce((total, value) =>
    total + (Number(value) || 0), 0);
  const totalPointDestinations = points.map((point) => point.destination);
  const totalDestinations = totalPointDestinations.map((destination) => destinations?.find((dest) => dest.id === destination));
  const totalNamesDestinations = totalDestinations.map((destination) => destination?.name);
  const lowDestinations = [];
  totalNamesDestinations.forEach((destination, i, array) => {
    if(i === 0 || i === array.length - 1) {
      lowDestinations.push(destination);
    }
  });
  const startTimeTrip = points[0]?.dateFrom;
  const endTimeTrip = points[points.length - 1]?.dateTo;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${(totalDestinations.length <= 3) ?
      totalNamesDestinations.join('-') :
      lowDestinations.join('-')}</h1>
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

  constructor(points, destinations) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points, this.#destinations);
  }
}
