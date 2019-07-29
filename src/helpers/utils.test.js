import {
  calcByPercentual,
  calcPercentual,
  isLatLongEqualZero,
  formatMoney,
  isInBoundingBox,
  not,
} from './utils';

describe('Testing utils', () => {
  it('Should calcByPercentual return 440 when passing 400 and 10%', () => {
    const result = calcByPercentual(400, 10);
    expect(result).toBe(440);
  });

  it('Should calcByPercentual return 440 when passing 6300 and 12.5%', () => {
    const result = calcByPercentual(6300, 12.5);
    expect(result).toBe(7087.5);
  });

  it('Should calcPercentual return 50% when passing 400 and 200', () => {
    const result = calcPercentual(400, 200);
    expect(result).toBe(50);
  });

  it('Should calcPercentual return 25% when passing 6300 and 1575', () => {
    const result = calcPercentual(6300, 1575);
    expect(result).toBe(25);
  });

  it('Should isLatLongEqualZero true when passing empty object', () => {
    const result = isLatLongEqualZero({});
    expect(result).toBe(true);
  });

  it('Should isLatLongEqualZero true when not passing lat log', () => {
    const result = isLatLongEqualZero();
    expect(result).toBe(true);
  });

  it('Should isInBoundingBox return false when passing out bounding box', () => {
    const result = isInBoundingBox({
      lon: -46.693419,
      lat: -23.546676,
    });
    expect(result).toBe(false);
  });

  it('Should isInBoundingBox return true when passing out bounding box', () => {
    const result = isInBoundingBox({
      lon: -46.663409,
      lat: -23.568704,
    });
    expect(result).toBe(true);
  });

  it('Should not inverse false to true ', () => {
    expect(not(false)).toBe(true);
  });

  it('Should formatMoney return R$ 204.34 ', () => {
    const result = formatMoney(204.34);
    expect(result.includes('204.34')).toBe(true);
    expect(result.includes('R$')).toBe(true);
  });
});
