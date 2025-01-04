/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/lit-element@4.0.0/lit-element.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import { ReactiveElement as e } from "./lit-reactive-element.js";
export * from "./lit-reactive-element.js";
import { render as t, noChange as n } from "./lit-html.js";
export * from "./lit-html.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s extends e {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = t(n, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return n;
  }
}
(s._$litElement$ = !0),
  (s.finalized = !0),
  globalThis.litElementHydrateSupport?.({ LitElement: s });
const r = globalThis.litElementPolyfillSupport;
r?.({ LitElement: s });
const o = {
  _$AK: (e, t, n) => {
    e._$AK(t, n);
  },
  _$AL: (e) => e._$AL,
};
(globalThis.litElementVersions ??= []).push("4.0.0");
export { s as LitElement, o as _$LE };
export default null;
//# sourceMappingURL=/sm/0dc524d3ac105bd6cb23c0579db365137d51e2e204d2f7286bda1edee560283e.map
