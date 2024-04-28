import h from '../hyperscript';

export default class FullscreenLoading extends HTMLElement {
  static style: string;
  static SVGHtml: string;
  static template: HTMLTemplateElement;
  static define() {
    window.customElements.define('fullscreen-loading', FullscreenLoading);
  }

  private _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(FullscreenLoading.template.content.cloneNode(true));
  }
}

FullscreenLoading.style = `
  .fullscreen-loading_container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 10000;
    transition: opacity .5s ease-in-out;
  }

  .fullscreen-loading__content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .fullscreen-loading__viewbox {
    width: 20vw;
    height: 20vh;
  }

  .fullscreen-loading__text {
    color: #454545;
    font-family: 'Microsoft YaHei UI','Microsoft YaHei',DengXian,SimSun,'Segoe UI',Tahoma,Helvetica,sans-serif;
    font-size: 18px;
    font-weight: 200;
    text-align: center;
  }
`;

FullscreenLoading.SVGHtml = `
<svg
  fill="#2d8cf0"
  width="100%"
  height="100%"
  viewBox="0 0 25 30"
>
  <rect
    width="4"
    height="11.3922"
    rx="1.5"
    ry="1.5"
    x="0"
    y="9.80392"
  >
    <animate
      attributeName="height"
      attributeType="XML"
      begin="0s"
      dur="0.6s"
      repeatCount="indefinite"
      values="5;21;5"
    />
    <animate
      attributeName="y"
      attributeType="XML"
      begin="0s"
      dur="0.6s"
      repeatCount="indefinite"
      values="13; 5; 13"
    />
  </rect>
  <rect
    height="19.3922"
    rx="1.5"
    ry="1.5"
    width="4"
    x="10"
    y="5.80392"
  >
    <animate
      attributeName="height"
      attributeType="XML"
      begin="0.15s"
      dur="0.6s"
      repeatCount="indefinite"
      values="5;21;5"
    />
    <animate
      attributeName="y"
      attributeType="XML"
      begin="0.15s"
      dur="0.6s"
      repeatCount="indefinite"
      values="13; 5; 13"
    />
  </rect>
  <rect
    height="14.6078"
    rx="1.5"
    ry="1.5"
    width="4"
    x="20"
    y="8.19608"
  >
    <animate
      attributeName="height"
      attributeType="XML"
      begin="0.3s"
      dur="0.6s"
      repeatCount="indefinite"
      values="5;21;5"
    />
    <animate
      attributeName="y"
      attributeType="XML"
      begin="0.3s"
      dur="0.6s"
      repeatCount="indefinite"
      values="13; 5; 13"
    />
  </rect>
</svg>
`

FullscreenLoading.template = h('template', null, [
  h('style', null, FullscreenLoading.style),
  h('div', { className: 'fullscreen-loading_container' }, [
    h('div', { className: 'fullscreen-loading__content' }, [
      h('div', { className: 'fullscreen-loading__viewbox' }, [
        new DOMParser().parseFromString(FullscreenLoading.SVGHtml, 'text/html').body.childNodes[0]
      ]),
      h('p', { className: 'fullscreen-loading__text' }, [
        h('slot', null, 'Wecome to Laboratory')
      ])
    ])
  ])
]);