import { render, RenderPosition, remove } from '../framework/render.js';
import { sortPointDay } from '../utils/utils.js';
import {filter} from '../utils/filter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
/*
Реализация текста в случае отсутствия точек маршрута в данный момент не возможна
import NoPointView from '../view/no-points-view.js';
*/
export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterModel = null;

  #pointsListComponent = new PointsListView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ tripContainer, pointsModel, filterModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    // ! Переключатель оставлен, т.к. возможно будут add др. типы сортировки
    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
    }

    return filteredPoints;
  }

  init() {
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.newId).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #handlePointChange = (updatePoint) => {
    // Здесь будем вызывать обновление модели
    this.#pointPresenters.get(updatePoint.newId).init(updatePoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.newId, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearTrip(resetSortType = false) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    // remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip() {
    const points = this.points;
    const pointsCount = points.length;
    if(pointsCount === 0) {
      // this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints(points);
  }
}
