// Вставлять в .trip-events
import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';
function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(SortType).map((sortItem) => (
      `<div class="trip-sort__item  trip-sort__item--${sortItem[1]}">
      <input id="sort-${sortItem[1]}" class="trip-sort__input  visually-hidden" data-sort-type="${sortItem[1]} ${currentSortType === sortItem[1] ? 'checked' : ''}" type="radio" name="trip-sort" value="sort-${sortItem[1]}">
      <label class="trip-sort__btn" for="sort-${sortItem[1]}">${sortItem[1]}</label>
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
    console.log(this.element);
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    console.log('Обработчик сработал верно');
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
