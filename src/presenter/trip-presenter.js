import { render, RenderPosition, remove } from '../framework/render.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/utils.js';
import {filter} from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import HeaderInfoPresenter from './header-info-presenter.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
export default class TripPresenter {
  #tripContainer = null;
  #headerInfoContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #pointsListComponent = new PointsListView();

  #filterModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #headerInfoPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ tripContainer, headerInfoContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#tripContainer = tripContainer;
    this.#headerInfoContainer = headerInfoContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...filteredPoints].sort(sortPointDay);
      case SortType.TIME:
        return [...filteredPoints].sort(sortPointTime);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortPointPrice);
    }

    return filteredPoints;
  }

  init() {
    this.#renderTrip();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();

  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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

  #renderHeader() {
    const points = this.points;
    this.#headerInfoPresenter = new HeaderInfoPresenter({
      pointsModel: this.#pointsModel,
      headerInfoContainer: this.#headerInfoContainer
    });
    this.#headerInfoPresenter.init(points);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

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

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #clearTrip(resetSortType = false) {
    this.#newPointPresenter.destroy();
    this.#headerInfoPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip() {
    const points = this.points;
    const pointsCount = points.length;
    if(pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderHeader();
    this.#renderSort();
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints(points);
  }
}
