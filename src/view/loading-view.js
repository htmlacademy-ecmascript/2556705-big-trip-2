import { DEFAULT_TEXT_FROM_SERVER } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createLoadingTemplate(messageFromServer) {
  return (
    `<p class="trip-events__msg">
      ${messageFromServer}
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  #pointsModel = null;
  #messageFromServer = DEFAULT_TEXT_FROM_SERVER;

  constructor(PointsModel) {
    super();
    this.#pointsModel = PointsModel;
    this.#messageFromServer = (this.#pointsModel.messageFromServer) ? this.#pointsModel.messageFromServer : DEFAULT_TEXT_FROM_SERVER;
  }

  get template() {
    return createLoadingTemplate(this.#messageFromServer);
  }
}
