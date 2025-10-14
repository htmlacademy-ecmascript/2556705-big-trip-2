import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
// !! Вроде как не вставляется import PointModel from '../model/point-model.js';
import { render } from '../render.js';
import { getDefaultPoint } from '../const.js';

export default class TripPresenter {
  eventListComponent = new EventListView();
  eventEditComponent = new EventEditView();

  constructor({ tripContainer, pointModel }) {
    this.tripContainer = tripContainer;
    this.pointModel = pointModel;
  }

  init() {
    const points = this.pointModel.getPoints();
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();

    render(new SortView(), this.tripContainer);
    render(this.eventListComponent, this.tripContainer);

    render(new EventEditView(getDefaultPoint(), destinations, offers), this.eventListComponent.getElement());
    render(new EventEditView(points[0], destinations, offers), this.eventListComponent.getElement());

    for (const point of points) {
      render(new EventPointView(point, destinations, offers), this.eventListComponent.getElement());
    }
  }
}
