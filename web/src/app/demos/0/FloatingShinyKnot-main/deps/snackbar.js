import { LitElement, html } from "../third_party/lit.js";

class SnackBar extends LitElement {
  static properties = {
    message: { type: String },
    visible: { type: Boolean },
  };

  constructor() {
    super();
    this.timeout = null;
    this.visible = false;
  }

  error(message) {
    this.message = message;
    this.visible = true;
    this.clearTimeout();
    this.timeout = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  hide() {
    this.clearTimeout();
    this.visible = false;
  }

  render() {
    return html`
      <style>
        :host {
          position: fixed;
          bottom: 1em;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        #bar {
          background-color: #808080;
          border-radius: 3px;
          padding: 1em;
          color: white;
          text-shadow: 0 -1px black;
          transform: translate(0, 5em);
          transition: transform 250ms ease-out;
          display: flex;
          align-items: center;
          pointer-events: auto;
        }
        #bar.visible {
          transform: translate(0, 0);
        }
        #bar button {
          outline: none;
          border: none;
          background: none;
        }
        #bar button svg {
          fill: white;
          width: 1em;
          height: 1em;
        }
        #bar button svg:hover {
          fill: #dadada;
        }
      </style>
      <div id="bar" class="${this.visible ? "visible" : ""}">
        ${this.message}
        <button @click=${this.hide}>
          <svg
            height="512px"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
            />
          </svg>
        </button>
      </div>
    `;
  }
}
customElements.define("snack-bar", SnackBar);
