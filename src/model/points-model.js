import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #dataApiService = null;
  #points = [];
  #offers = null;
  #destinations = null;
  #messageFromServer = null;
  #hasServerError = null;


  constructor({ dataApiService }) {
    super();
    this.#dataApiService = dataApiService;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get messageFromServer() {
    return this.#messageFromServer;
  }

  get hasServerError() {
    return this.#hasServerError;
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,

      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  async init() {
    try {
      this.#messageFromServer = 'Loading...';
      const points = await this.#dataApiService.points;
      this.#offers = await this.#dataApiService.offers;
      this.#destinations = await this.#dataApiService.destinations;
      this.#points = points.map(this.#adaptToClient);
      this.#hasServerError = false;
      this.#messageFromServer = 'Loading...';
    } catch (err) {
      this.#points = [];
      this.#hasServerError = true;
      this.#messageFromServer = 'Failed to load latest route information';
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#dataApiService.updatePoint(update);
      const updatedPoit = this.#adaptToClient(response);
      this.#points = [...this.#points.map((point, i) => (i === index) ? updatedPoit : point)];

      this._notify(updateType, updatedPoit);

    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#dataApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#dataApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }
}
