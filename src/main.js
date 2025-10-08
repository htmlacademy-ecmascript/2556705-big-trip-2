import HeaderInfoView from './view/header-info-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainEventsElement = document.querySelector('.trip-events');
const headerInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const boardPresenter = new BoardPresenter({boardContainer: siteMainEventsElement});

render(new HeaderInfoView(), headerInfoElement, 'afterbegin');
render(new FilterView(), siteFilterElement);

boardPresenter.init();

