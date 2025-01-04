async function loadAsync(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = src;
    const x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
    s.addEventListener("load", resolve);
    s.addEventListener("error", reject);
  });
}

let GoogleStreetViewService;
let GoogleGeoCoder;

function getGoogleStreetViewService() {
  if (GoogleStreetViewService) return GoogleStreetViewService;

  GoogleStreetViewService = new google.maps.StreetViewService();
  return GoogleStreetViewService;
}

function getGoogleGeoCoder() {
  if (GoogleGeoCoder) return GoogleGeoCoder;

  GoogleGeoCoder = new google.maps.Geocoder();
  return GoogleGeoCoder;
}

async function resolveAddress(address) {
  const geocoder = getGoogleGeoCoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        resolve(results[0].geometry.location);
      } else {
        reject(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  });
}

// https://developers.google.com/maps/documentation/javascript/reference/street-view-service

async function getPanoramaById(id) {
  const service = getGoogleStreetViewService();
  return new Promise((resolve, reject) => {
    service.getPanorama({ pano: id }, (data, status) => {
      if (data) {
        resolve(data);
      } else {
        reject(status);
      }
    });
  });
}

async function getIdByLocation(lat, lon) {
  const service = getGoogleStreetViewService();
  const latLng = new google.maps.LatLng(lat, lon);
  try {
    const res = await service.getPanorama({
      location: latLng,
      radius: 50,
      source: "outdoor",
    });
    return res;
  } catch (e) {
    throw e;
  }
}

function getQueryVariable(query, variable) {
  const parts = query.split("?");
  const params = new URLSearchParams(parts[1]);
  return params.get(variable);
}

function getIdFromURL(url) {
  url = decodeURIComponent(url);
  if (url.indexOf("panoid") != -1) {
    // https://maps.google.com/?ll=40.741352,-73.986096&spn=0.002248,0.004372&t=m&z=18&layer=c&cbll=40.741825,-73.986315&panoid=NOMYgwQ4YfVqMJogsbMcrg&cbp=12,208.53,,0,6.03
    const panoId = getQueryVariable(url, "panoid");
    return panoId;
  } else if (url.indexOf("!1s") != -1) {
    const pos = url.indexOf("!1s") + 3;
    const npos = url.substr(pos).indexOf("!");
    const panoId = url.substr(pos, npos);
    return panoId;
    // https://www.google.com/maps/preview?authuser=0#!q=Eleanor+Roosevelt+Playground&data=!1m8!1m3!1d3!2d-73.935845!3d40.693159!2m2!1f170.65!2f90!4f75!2m4!1e1!2m2!1s0Zn7rPD9Q4KOhRyEugT1qA!2e0!4m15!2m14!1m13!1s0x0%3A0x63459d24c457bec7!3m8!1m3!1d11440!2d-73.9085059!3d40.6833656!3m2!1i1329!2i726!4f13.1!4m2!3d40.6929389!4d-73.9357996&fid=5
  } else {
    throw new Error(`Can't find panorama id in specified URL`);
  }
}

async function getExtraMetadata(id) {
  const url = `http://maps.google.com/cbk?output=json&hl=x-local&cb_client=maps_sv&v=4&dm=1&pm=1&ph=1&hl=en&panoid=${id}`;
  const res = await fetch(url);
  const metadata = await res.json();
  return metadata;
}

export {
  loadAsync,
  getGoogleGeoCoder,
  getGoogleStreetViewService,
  getPanoramaById,
  resolveAddress,
  getIdByLocation,
  getIdFromURL,
  getExtraMetadata,
};
