// Вставлять в .trip-main
import { destinations } from '../mocks/destinations.js';
import { humanizeTaskDueDate} from '../utils/utils.js';
import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
function createHeaderInfoTemplate(points) {
  const totalBasePrice = points.map((point) => point.basePrice);
  const totalPrice = totalBasePrice.reduce((total, value) =>
    total + (Number(value) || 0), 0);
  const totalPointDestinations = points.map((point) => point.destination);
  const totalDestinations = totalPointDestinations.map((destination) => destinations?.find((dest) => dest.id === destination));
  const totalNamesDestinations = totalDestinations.map((destination) => destination.name).join('-');
  const startTimeTrip = points[0].dateFrom;
  const endTimeTrip = points[points.length - 1].dateTo;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${totalNamesDestinations}</h1>

        <p class="trip-info__dates">${humanizeTaskDueDate(startTimeTrip, DATE_FORMAT['number-month'])} -
        ${humanizeTaskDueDate(endTimeTrip, DATE_FORMAT['number-month'])}</p>
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

  constructor (points) {
    super();
    this.#points = points;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points);
  }
}
