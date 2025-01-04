import { LitElement, html } from "../third_party/lit.js";

class ProgressBar extends LitElement {
  static get properties() {
    return {
      progress: { type: Number },
    };
  }

  constructor() {
    super();
    this.progress = 0;
  }

  reset() {
    this.progress = 0;
  }

  show() {
    this.style.display = "flex";
  }

  hide() {
    this.style.display = "none";
  }

  render() {
    return html`
      <style>
        :host {
          display: flex;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        #bar {
          width: min(1000px, calc(100% - 40px));
          height: 20px;
          background-color: white;
          border-radius: 3px;
          padding: 2px;
        }
        #progress {
          width: 0;
          height: 100%;
          border-radius: 2px;
          background-color: #0f5ea2;
        }
      </style>
      <div id="bar">
        <div id="progress" style="width: ${this.progress}%"></div>
      </div>
    `;
  }
}
customElements.define("progress-bar", ProgressBar);
