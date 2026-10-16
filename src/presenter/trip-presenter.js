import { render, RenderPosition } from '../framework/render.js';
import { sortPointDay } from '../utils/utils.js';
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
  #sortView = null;
  #pointsListComponent = new PointsListView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointDay);
    }

    return this.#pointsModel.points;
  }

  init() {
    this.#renderTrip();
    /* т.к. filterView был перенесен в main.js, то реализация отрисовки текста при отсутствии точек маршрута невозможна на данный
    if (filteredPoints.length === 0) {
      render(new NoPointView(filterView.noPointsText), this.#eventListComponent.element);
      return;
    }*/
  }

  #handlePointChange = (updatedPoint) => {
    // Здесь будем вызывать обновление модели
    this.#pointPresenters.get(updatedPoint.newId).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPointsList() {
    const points = this.points;
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints(points);
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
    // ! Надо будет потом добавлять и оформлять данный компонент
    // ! this.#renderNoTasks();
    this.#renderPointsList();
    this.#renderSort();
  }
}
