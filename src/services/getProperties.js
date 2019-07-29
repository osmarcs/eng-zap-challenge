import normalizeApiData from '../helpers/normalizeApiData';

const endpoint = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json';

export default function getAllProperties() {
  return fetch(endpoint)
    .then(response => response.json())
    .then(data => normalizeApiData(data));
}
