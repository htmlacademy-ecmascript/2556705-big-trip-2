// Вставлять в .trip-events__list
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DATE_FORMAT, POINT_TYPES } from '../const.js';
import { humanizeTaskDueDate} from '../utils/utils.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitle = (title) => title.split(' ').join('_');

function createPointEditOffersTemplate(typeOffers, pointOffers, pointId) {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${typeOffers.map((typeOffer) => (
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}" type="checkbox" data-offer-id=${typeOffer.id} name="event-offer-${formatOfferTitle(typeOffer.title)}" ${pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}">
            <span class="event__offer-title">${typeOffer.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${typeOffer.price}</span>
          </label>
        </div>`
        )).join('')}
      </div>
    </section>`
  );
}

function createPointEditTypesTemplate(type, pointId) {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
        <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((pointType) => (
              `<div class="event__type-item">
                <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
                </div>`
            )).join('')}
        </fieldset>
      </div>
    </div>`
  );
}

function createPointEditDestinationsTemplate(destinations, name, type, pointId) {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${pointId}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
      <datalist id="destination-list-${pointId}">
        ${destinations.map((destination) => `<option value='${destination.name}'></option>`).join('')}
      </datalist>
    </div>`
  );
}

function createPointEditTimeTemplate(dateTo, dateFrom, pointId) {
  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, DATE_FORMAT['full-date'])}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, DATE_FORMAT['full-date'])}">
    </div>`
  );
}

function createPointEditPriceTemplate(basePrice, pointId) {
  return (
    `<div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${pointId}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value=${basePrice}>
    </div>`
  );
}

function createPointEditButtonsTemplate(pointId) {
  return (
    `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${pointId ? 'Delete' : 'Cancel'}</button>
    ${pointId ? (
      `<button class='event__rollup-btn' type='button'>
      <span class='visually-hidden'>Open event </span>
      </button>`
    ) : ''}`
  );
}

function createPointEditTemplate(point, destinations, offers) {
  const typeOffers = offers.find((off) => off.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const { dateFrom, dateTo, basePrice, type } = point;
  const { name } = pointDestination || {};
  const { description } = pointDestination || {};
  const pointId = point.id || 0;
  const offersTemplate = createPointEditOffersTemplate(typeOffers, pointOffers, pointId);
  const typesTemplate = createPointEditTypesTemplate(type, pointId);
  const destinationsTemplate = createPointEditDestinationsTemplate(destinations, name, type, pointId);
  const timeTemplate = createPointEditTimeTemplate(dateTo, dateFrom, pointId);
  const priceTemplate = createPointEditPriceTemplate(basePrice, pointId);
  const buttonsTemplate = createPointEditButtonsTemplate(pointId);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <section class="event__details">
          ${(offersTemplate) ? offersTemplate : ''}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">${name}</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
        <header class="event__header">
          ${typesTemplate}
          ${(destinationsTemplate) ? destinationsTemplate : ''}
          ${timeTemplate}
          ${priceTemplate}
          ${buttonsTemplate}
        </header>
      </form>
    </li>`
  );
}
export default class PointEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;
  #datepickerTo = null;
  #datepickerFrom = null;

  constructor(point, destinations, offers, onFormSubmit, onFormClose, onDeleteClick) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;
    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers);
  }

  reset (point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  removeElement = () => {
    super.removeElement();
    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  // ! Handlers
  _restoreHandlers = () => {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.#setDatepickers();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose(PointEditView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({...this._state, offers: checkedBoxes.map((element) => element.dataset.offerId)});
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({...this._state, type: evt.target.value});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({...this._state, destination: selectedDestinationId});
  };

  #priceChangeHandler = (evt) => {
    this._setState({...this._state, basePrice: evt.target.value});
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({...this._state, dateFrom: userDate});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({...this._state, dateTo: userDate});
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'locale': {'firstDayOfWeek': 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        onChange: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        onChange: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      }
    );
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}


