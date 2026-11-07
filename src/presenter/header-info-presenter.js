import {render, replace, remove, RenderPosition} from '../framework/render.js';
import HeaderInfoView from '../view/header-info-view.js';

export default class HeaderInfoPresenter {
  #points = null;
  #destinations = null;
  #pointsModel = null;
  #headerInfoContainer = null;
  #headerInfoComponent = null;

  constructor({pointsModel, headerInfoContainer}) {
    this.#pointsModel = pointsModel;
    this.#headerInfoContainer = headerInfoContainer;
  }

  init(points) {
    this.#points = points;
    this.#destinations = this.#pointsModel.destinations;
    const prevHeaderInfoComponent = this.#headerInfoComponent;

    this.#headerInfoComponent = new HeaderInfoView(this.#points, this.#destinations);

    if (prevHeaderInfoComponent === null) {
      render(this.#headerInfoComponent, this.#headerInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerInfoComponent, prevHeaderInfoComponent);
    remove(prevHeaderInfoComponent);
  }

  destroy() {
    remove(this.#headerInfoComponent);
  }
}
