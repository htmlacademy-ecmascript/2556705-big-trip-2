import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import HeaderInfoView from './view/header-info-view.js';
import FilterView from './view/filter-view.js';
import FilterModel from './model/filter-model.js';

const filters = [
  {
    type: 'everything',
    count: 0,
  },
];

const siteMainEventsElement = document.querySelector('.trip-events');
const headerInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();

const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({ tripContainer: siteMainEventsElement, pointsModel });

render(new HeaderInfoView(), headerInfoElement, 'afterbegin');
render(new FilterView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => {}
}), siteFilterElement);
tripPresenter.init();
