// Вставлять в .trip-events
import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';
function createSortTemplate(currentSortType) {
  const sortTypes = Object.values(SortType).map((sortType) => sortType);
  sortTypes.forEach((sortType) => console.log(sortType === currentSortType));
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.map((sortType) => (
      `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" data-sort-type="${sortType}" ${currentSortType === sortType ? 'checked' : ''} type="radio" name="trip-sort" value="sort-${sortType}">
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>`
    )).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    console.log(this.#currentSortType);
    console.log(evt.target.dataset.sortType);
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
