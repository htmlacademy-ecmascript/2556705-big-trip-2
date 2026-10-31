import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const siteMainEventsElement = document.querySelector('.trip-events');
const headerInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-main__trip-controls');
const pointsModel = new PointsModel();

const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({ tripContainer: siteMainEventsElement,
  headerInfoContainer: headerInfoElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, headerInfoElement);

filterPresenter.init();
tripPresenter.init();
