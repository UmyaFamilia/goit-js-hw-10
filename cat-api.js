let array = [];
import axios from 'axios';
const imgLink = ' https://api.thecatapi.com/v1/images/search';
const mainLink = 'https://api.thecatapi.com/v1/breeds';
const apikey =
  'live_Ni2malsWLRobOjFSllAaf8elaFQQzPaaOgYaQclACtH6qChCGSSmaPTtzYDuTvs7';
axios.defaults.headers.common['x-api-key'] = `${apikey}`;

export function fetchBreeds() {
  return axios.get(`${mainLink}`).then(a => {
    return a.data;
  });
}
export function fetchCatByBreed(breedId) {
  return axios.get(`${imgLink}?breed_ids=${breedId}`).then(a => {
    return a.data;
  });
}
