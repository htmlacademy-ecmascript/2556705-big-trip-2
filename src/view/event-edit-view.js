// Вставлять в .trip-events__list
import {createElement} from '../render.js';
import { POINT_TYPES } from '../const.js';
import {formDate} from '../util/util.js';
const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
const formatOfferTitle = (title) => title.split(' ').join('_');

function createEventEditTemplate(point, destinations, offers) {
  const typeOffers = offers.find((off) => off.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const {dateFrom, dateTo, basePrice, type} = point;
  const {name, description, pictures} = pointDestination || {};
  const pointId = point.id || 0;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
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
          </div>

            <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${pointId}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
            <datalist id="destination-list-${pointId}">
              ${destinations.map((destination) => `<option value='${destination.name}'></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${formDate(dateFrom, 'complex')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${formDate(dateFrom, 'complex')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${pointId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
    ${point.id ? (
      `<button class='event__rollup-btn' type='button'>
              <span class='visually-hidden>Open event </span>
            </button>`
    ) : ''}
        </header>
        <section class="event__details">
        ${typeOffers.length ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
    ${typeOffers.map((typeOffer) => (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferTitle(typeOffer.title)}-${pointId}" type="checkbox" name="event-offer-${formatOfferTitle(typeOffer.title)}" ${pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
            <span class="event__offer-title">${typeOffer.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${typeOffer.price}</span>
          </label>
        </div>`
    )).join('')}

            </div>
          </section>`
      : ''}
        </section>
      </form>
    </li>`
  );
}

export default class EventEditView {
  constructor(point, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEventEditTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
