/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright scovings 2023 All rights reserved
 * @author scovings <weedanieltait@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=55.8617&lon=4.2583" // Glasgow

const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(res => {
    const { latitude, longitude } = res.coords;

    updateWeather(`lat=${latitude}`, `lon=${longitude}`);
  }, err => {
    window.location.hash = defaultLocation;
  });
}

/**
 * @param {string} query Searched query
 */
const searchedLocation = query => updateWeather(...query.split("&"));
// updateWeather("lat=55.8617", "lon=4.2583")

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation]
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);

  const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL]

  routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (window.location.hash) {
    window.location.hash = "#/current-location"
  } else {
    checkHash();
  }
})