const html: string = `
<style>
  button {
    display: block;
    overflow: hidden;
    position: relative;
    padding: 0 16px;
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    outline: none;

    width: 100%;
    height: 40px;

    box-sizing: border-box;
    border: 1px solid #a1a1a1;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
    color: #363636;
  }
</style>

<button>
  <slot></slot>
</button>
`;

class Button extends HTMLElement {
  _template: HTMLTemplateElement;
  _shadowRoot: ShadowRoot;
  $button: HTMLButtonElement;

  constructor() {
    super();
    this._template = document.createElement('template');
    this._template.innerHTML = html;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(this._template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('onClick', {
          detail: 'Hello from within the Custom Element',
        })
      );
    });
  }

  static install(prefix = 'laboratory'): void {
    window.customElements.define(`${prefix}-button`, Button);
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  static get observedAttributes(): string[] {
    return ['label'];
  }

  connectedCallback() {
    if (this.hasAttribute('as-atom')) {
      this.$button.style.padding = '0px';
    }
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    this.render();
  }

  render(): void {
    this.$button.innerHTML = this.label;
  }
}