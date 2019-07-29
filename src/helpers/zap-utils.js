import { ZAP_ROLES as ROLES, FOR_RENTAL } from './constants';
import { isInBoundingBox, calcByPercentual } from './utils';

function getMinSaleValue(inBoundingBox) {
  const minSaleValue = ROLES.MIN_SALE_VALUE;
  return inBoundingBox
    ? calcByPercentual(minSaleValue, ROLES.SALE_PERCENTUAL_IN_BOUNDING_BOX)
    : minSaleValue;
}

function isRentable({ pricingInfos }) {
  return pricingInfos.rentalTotalPrice >= ROLES.MIN_RENTAL_VALUE;
}

function isSellable({ pricingInfos, usableAreas, location }) {
  const squareMeterValue = pricingInfos.price / usableAreas;
  const inBoundingBox = isInBoundingBox(location);

  return (
    usableAreas > 0
    && squareMeterValue > ROLES.MIN_SQUARE_METER_VALUE
    && pricingInfos.price >= getMinSaleValue(inBoundingBox)
  );
}

export default function isAvaliableForZAP(property) {
  const {
    pricingInfos: { businessType: type },
  } = property;
  return type === FOR_RENTAL ? isRentable(property) : isSellable(property);
}
