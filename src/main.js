import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import DataApiService from './data-api-service.js';

const AUTHORIZATION = 'Basic 322ffdgffdsfvedhtrwtrwtr';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteMainEventsElement = document.querySelector('.trip-events');
const headerInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-main__trip-controls');
const pointsModel = new PointsModel({
  dataApiService: new DataApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel({
  dataApiService: new DataApiService(END_POINT, AUTHORIZATION)
});
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

tripPresenter.init();
filterPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, headerInfoElement);
  });

