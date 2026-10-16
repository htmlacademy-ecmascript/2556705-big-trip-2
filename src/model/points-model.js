import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mocks/points'; //! .js
import { offers } from '../mocks/offers'; //! .js
import { destinations } from '../mocks/destinations'; //! .js

const POINT_COUNT = 3;
export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offers;
  #destinations = destinations;
  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
