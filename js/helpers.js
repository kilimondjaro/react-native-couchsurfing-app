import {googleKey} from './config';

export function getLocations(place) {
  return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&key=${googleKey}`)
  .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'ZERO_RESULTS') {
          return [];
        }
        if (responseJson.status === 'OK') {
          return responseJson.predictions.map((loc) => ({
            description: loc.description,
            id: loc.id
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
}
