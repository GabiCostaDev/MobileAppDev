import axios from 'axios';
import MAPBOX_ACCESS_TOKEN from '../config/mapbox.config';

const mapboxApi = axios.create({
  baseURL: 'https://api.mapbox.com',
});

const handleResponse = (response) => {
  return response;
};

const handleError = (error) => {
  console.error('API Error:', error.response ? error.response.data : error.message);
  throw error;
};

export const directionsApi = (profile, coordinates, params = {}) =>
  mapboxApi.get(`/directions/v5/mapbox/${profile}/${coordinates}`, {
    params: {
      access_token: MAPBOX_ACCESS_TOKEN,
      geometries: 'geojson',
      ...params,
    },
  }).then(handleResponse).catch(handleError);

export const geocodeApi = (place) =>
  mapboxApi.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`, {
    params: { access_token: MAPBOX_ACCESS_TOKEN },
  }).then(handleResponse).catch(handleError);

export const searchboxApi = (searchText, latitude, longitude) =>
  mapboxApi.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json`, {
    params: {
      access_token: MAPBOX_ACCESS_TOKEN,
      autocomplete: true,
      types: 'place,address',
      proximity: `${longitude},${latitude}`,
    },
  }).then(handleResponse).catch(handleError);

export const mapMatchingApi = (profile, coordinates) =>
  mapboxApi.get(`/matching/v5/mapbox/${profile}/${coordinates}`, {
    params: {
      access_token: MAPBOX_ACCESS_TOKEN,
      geometries: 'geojson',
      steps: true,
      overview: 'full',
    },
  }).then(handleResponse).catch(handleError);

export const matrixApi = (profile, coordinates) =>
  mapboxApi.get(`/directions-matrix/v1/mapbox/${profile}/${coordinates}`, {
    params: { access_token: MAPBOX_ACCESS_TOKEN },
  }).then(handleResponse).catch(handleError);

export const getCoordinates = async (place) => {
  try {
    const response = await geocodeApi(place);
    console.log('Geocode API Response:', response.data);
    if (response.data.features.length > 0) {
      const coordinates = response.data.features[0].geometry.coordinates;
      return coordinates.join(',');
    } else {
      throw new Error('No coordinates found for the given place.');
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};
