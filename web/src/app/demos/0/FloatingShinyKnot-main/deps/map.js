import { LitElement, html } from "../third_party/lit.js";
import "./button.js";

const locations = [
  { lat: 51.50811493725607, lng: -0.1280283413492745 },
  { lat: 32.6144404, lng: -108.9852017 },
  { lat: 39.36382677360614, lng: 8.431220278759724 },
  { lat: 59.30571937680209, lng: 4.879402148657164 },
  { lat: 28.240385123352873, lng: -16.629988706884774 },
  { lat: 50.09072314148827, lng: 14.393133454556278 },
  { lat: 41.413416092316275, lng: 2.1531126527786455 },
  { lat: 35.71445889443406, lng: 139.7966938981724 },
  { lat: 54.552083679428065, lng: -3.297380963134742 },
];

class MapBrowser extends LitElement {
  static get properties() {
    return {
      collapsed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.snackbar = null;
    this.marker = null;
    this.onReady = null;
    this.ready = new Promise((resolve, reject) => {
      this.onReady = resolve;
    });
  }

  async loadResources() {
    const cssPromise = new Promise((resolve, reject) => {
      const css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute(
        "href",
        "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      );
      css.setAttribute(
        "integrity",
        "sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      );
      css.setAttribute("crossorigin", "");
      css.addEventListener("load", (e) => {
        resolve();
      });
      document.head.append(css);
    });

    const scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      );
      script.setAttribute(
        "integrity",
        "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      );
      script.setAttribute("crossorigin", "");
      script.addEventListener("load", (e) => {
        resolve();
      });
      document.head.append(script);
    });

    return Promise.all([cssPromise, scriptPromise]);
  }

  async firstUpdated() {
    await this.loadResources();
    this.onReady();
    const mapDiv = this.shadowRoot.querySelector("#map");
    this.map = L.map(mapDiv).setView([51.505, -0.09], 13);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoic3BpdGUiLCJhIjoiMU9EUUJlZyJ9.FXckC6N4GTPsqe1ua1u_5g",
      }
    ).addTo(this.map);

    this.map.on("click", (e) => this.onMapClick(e));
  }

  onMapClick(e) {
    this.addMarker(e.latlng.lat, e.latlng.lng);
  }

  moveTo(lat, lng) {
    this.removeMarker();
    this.marker = L.marker([lat, lng]).addTo(this.map);
    this.map.panTo([lat, lng]);
  }

  removeMarker() {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
  }

  addMarker(lat, lng) {
    this.moveTo(lat, lng);
    const e = new CustomEvent("map-selection", {
      bubbles: true,
      detail: { latLng: { lat, lng } },
    });
    this.dispatchEvent(e);
  }

  async onChange(e) {
    await this.search(e.target.value);
  }

  async onSearch(e) {
    const el = this.shadowRoot.querySelector("#search");
    await this.search(el.value);
  }

  async search(str) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${str}`;
    const res = await fetch(url, { mode: "cors" });
    const data = await res.json();
    if (!data.length) {
      this.snackbar.error(
        `Could not find a result for the specified location.`
      );
      return;
    }
    const city = data[0];
    const bb = city.boundingbox;
    this.map.fitBounds([
      [parseFloat(bb[0]), parseFloat(bb[2])],
      [parseFloat(bb[1]), parseFloat(bb[3])],
    ]);
    this.addMarker(parseFloat(city.lat), parseFloat(city.lon));
  }

  onLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.addMarker(pos.coords.latitude, pos.coords.longitude);
      },
      (e) => {
        this.snackbar.error(`Could not acquire geolocation: ${e.message}`);
      },
      { enableHighAccuracy: true }
    );
  }

  randomLocation() {
    const location = locations[Math.floor(Math.random() * locations.length)];
    this.addMarker(location.lat, location.lng);
  }

  onInput(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  onCollapse() {
    this.collapsed = !this.collapsed;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          font: inherit;
          overflow: hidden;
        }
        #container {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          justify-content: flex-end;
        }
        #map-container {
          position: relative;
          flex: 1 1 400px;
        }
        #map-container.collapsed {
          height: 0;
          flex: 0;
        }
        #map {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
        }
        #tools {
          display: flex;
          flex-direction: row;
        }
        #tools div {
          display: flex;
        }
        #tools div:first-child {
          flex: 1;
          margin: 0 0.5em 0 0;
        }
        input {
          padding: 0.5em 0.5em;
          border: 1px solid #111;
          outline: none;
          border-radius: 0.25em;
          flex: 1;
          margin-right: 0.5em;
        }
        .collapse-bar {
          justify-content: flex-end;
          display: flex;
        }
        @media (max-width: 600px) {
          #tools {
            flex-direction: column;
          }
          #tools div:first-child {
            flex: 1;
            margin: 0 0 0.5em 0;
          }
          #tools div:nth-child(2) {
            justify-content: end;
          }
        }
      </style>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      <div id="container">
        <div class="collapse-bar">
          <x-button @click="${this.onCollapse}"
            >${this.collapsed ? "Expand ▲" : "Collapse ▼"}</x-button
          >
        </div>
        <div id="map-container" class="${this.collapsed ? "collapsed" : ""}">
          <div id="map"></div>
        </div>
        <div id="tools">
          <div>
            <input
              placeholder="Search..."
              type="text"
              id="search"
              autocomplete="off"
              @input=${this.onInput}
              @change=${this.onChange}
            />
            <x-button class="btn" class="search" @click=${this.onSearch}
              >Search</x-button
            >
          </div>
          <div>
            <x-button class="btn" left @click=${this.onLocation}
              >My location</x-button
            >
            <x-button class="btn" right @click=${this.randomLocation}>
              Random location
            </x-button>
          </div>
          <div></div>
        </div>
      </div>
    `;
  }
}
customElements.define("map-browser", MapBrowser);
