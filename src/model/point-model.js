import { points } from '../mocks/points'; //! .js
import { offers } from '../mocks/offers'; //! .js
import { destinations } from '../mocks/destinations'; //! .js

export default class PointModel {
  constructor() {
    this.points = [];
    this.offers = [];
    this.destinations = [];
  }

  init () {
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}

