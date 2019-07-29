import { BOUNDING_BOX } from './constants';

export function isInBoundingBox({ lat, lon }) {
  return (
    lat >= BOUNDING_BOX.MINLAT
    && lat <= BOUNDING_BOX.MAXLAT
    && lon >= BOUNDING_BOX.MINLON
    && lon <= BOUNDING_BOX.MAXLON
  );
}

export function calcByPercentual(value, percentual) {
  return +(value * ((100 + percentual) / 100)).toFixed(2);
}

export function calcPercentual(valuePrimary, valueSecondary) {
  return (valueSecondary * 100) / valuePrimary;
}

export function not(condition) {
  return !condition;
}
export function isLatLongEqualZero({ lat = 0, lon = 0 } = {}) {
  return lat === 0 && lon === 0;
}

export function formatMoney(
  value,
  { locale = 'pt-BR', currency = 'BRL' } = {},
) {
  return Number(value).toLocaleString(locale, { style: 'currency', currency });
}
