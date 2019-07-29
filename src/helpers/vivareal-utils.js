import { VIVAREAL_ROLES as ROLES, FOR_RENTAL } from './constants';
import { isInBoundingBox, calcPercentual, calcByPercentual } from './utils';

function getMaxRentalValue(inBoundingBox) {
  const maxRentaValue = ROLES.MAX_RENTAL_VALUE;
  return inBoundingBox
    ? calcByPercentual(maxRentaValue, ROLES.RENTAL_PERCENTUAL_IN_BOUNDING_BOX)
    : maxRentaValue;
}

function isRentable({ pricingInfos, location }) {
  const { monthlyCondoFee, rentalTotalPrice } = pricingInfos;
  const condonFeePercentual = calcPercentual(rentalTotalPrice, monthlyCondoFee);
  const inBoundingBox = isInBoundingBox(location);
  return (
    monthlyCondoFee > 0
      && condonFeePercentual < ROLES.MAX_PERCENTUAL_MONTHLY_CONDO_FEE,
    rentalTotalPrice <= getMaxRentalValue(inBoundingBox)
  );
}

function isSellable({ pricingInfos }) {
  return pricingInfos.price <= ROLES.MAX_SALE_VALUE;
}

export default function isAvaliableForVivaReal(property) {
  const {
    pricingInfos: { businessType: type },
  } = property;
  return type === FOR_RENTAL ? isRentable(property) : isSellable(property);
}
