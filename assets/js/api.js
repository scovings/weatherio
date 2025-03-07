/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright scovings 2025 All rights reserved
 * @author scovings <weedanieltait@gmail.com>
 */

'use strict';

const api_key = "8e5ff68018efa9d972059880213f857a";

/**
 * Fetch data from server
 * @param {string} URL API url 
 * @param {Function} callback callback
 */
export const fetchData = function(URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
    .then(res => res.json())
    .then(data => callback(data));
}

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metic`
  }
}