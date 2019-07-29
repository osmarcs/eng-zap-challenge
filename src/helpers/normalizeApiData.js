import { not, isLatLongEqualZero } from './utils';
import isAvaliableForZAP from './zap-utils';
import isAvaliableForVivaReal from './vivareal-utils';

export default function normalizeApiData(properties) {
  return properties
    .filter((item) => {
      const { location } = item.address.geoLocation;
      return not(isLatLongEqualZero(location));
    })
    .map((item) => {
      const {
        usableAreas,
        pricingInfos,
        address: {
          geoLocation: { location },
        },
      } = item;
      const property = { usableAreas, location, pricingInfos };
      return {
        ...item,
        isAvaliableZAP: isAvaliableForZAP(property),
        isAvaliableVivaReal: isAvaliableForVivaReal(property),
      };
    })
    .filter(item => item.isAvaliableVivaReal || item.isAvaliableZAP);
}
