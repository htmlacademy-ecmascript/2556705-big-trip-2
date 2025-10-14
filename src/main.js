import { render } from './render.js';
import PointModel from './model/point-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import HeaderInfoView from './view/header-info-view.js';
import FilterView from './view/filter-view.js';

const siteMainEventsElement = document.querySelector('.trip-events');
const headerInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');


render(new HeaderInfoView(), headerInfoElement, 'afterbegin');
render(new FilterView(), siteFilterElement);

const pointModel = new PointModel();
pointModel.init();

const tripPresenter = new TripPresenter({ tripContainer: siteMainEventsElement, pointModel: pointModel });
tripPresenter.init();
