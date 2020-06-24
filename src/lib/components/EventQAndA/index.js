import {html} from 'lit-html';
import {BaseElement} from '../BaseElement';
import './_styles.scss';

/**
 * Filters out Q&A's based on `data-category` property.
 *
 * @extends {BaseElement}
 * @final
 */
class EventQAndA extends BaseElement {
  constructor() {
    super();
    this.closeDetail = this.closeDetail.bind(this);
    this.selectCategory = this.selectCategory.bind(this);

    this.childElements = [];
    this.categories = [];
  }

  connectedCallback() {
    super.connectedCallback();

    this.childElements = Array.from(this.querySelectorAll('[data-category]'));

    const categories = new Set();
    this.childElements.forEach((element) =>
      categories.add(element.getAttribute('data-category')),
    );
    this.categories = Array.from(categories);
  }

  render() {
    return html`
      <select class="w-select--borderless" @change="${this.selectCategory}">
        <option value>All categories</option>
        ${this.categories.map((c) => html`<option value="${c}">${c}</option>`)}
      </select>
      ${this.renderDetails()}
    `;
  }

  renderDetails() {
    return this.childElements.map(
      (e) => html`<div @click="${this.closeDetail}">${e}</div>`,
    );
  }

  closeDetail($event) {
    const category = $event.target.closest('[data-category]');
    if (!category) {
      return;
    }
    this.childElements.forEach((element) => {
      if (element !== category) {
        element.open = false;
      }
    });
  }

  selectCategory($event) {
    this.childElements.forEach((element) => {
      const show =
        !$event.target.value ||
        element.getAttribute('data-category') === $event.target.value;
      element.classList.toggle('hidden', !show);
    });
  }
}

customElements.define('web-event-q-and-a', EventQAndA);