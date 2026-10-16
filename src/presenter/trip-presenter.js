import { render, RenderPosition } from '../framework/render.js';
import {updateItem, sortPointDay} from '../utils/utils.js';
import {SortType} from '../const.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
/*
Реализация текста в случае отсутствия точек маршрута в данный момент не возможна
import NoPointView from '../view/no-points-view.js';
*/
export default class TripPresenter {
  #tripContainer;
  #pointsModel;
  #tripPoints;
  #destinations;
  #offers;
  #sortView = null;
  #pointsListComponent = new PointsListView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTripPoints = [];

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:

    // Получаем точки для выбранного фильтра (filteredPoints) и вставляем их в render вместо this.#tripPoints
    // const filteredPoints = this.#tripPoints;

    this.#sourcedTripPoints = [...this.#pointsModel.points];

    this.#renderTrip();
    /* т.к. filterView был перенесен в main.js, то реализация отрисовки текста при отсутствии точек маршрута невозможна на данный
    if (filteredPoints.length === 0) {
      render(new NoPointView(filterView.noPointsText), this.#eventListComponent.element);
      return;
    }*/
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.newId).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY: this.#tripPoints.sort(sortPointDay);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _tripPoints исходный массив
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element, pointsModel: this.#pointsModel, onDataChange: this.#handlePointChange, onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.newId, pointPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints();
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort() {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortView, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip() {
    this.#renderPointsList();
    this.#renderSort();
  }
}
