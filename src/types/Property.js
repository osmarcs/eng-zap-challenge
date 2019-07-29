import PropTypes from 'prop-types';

export default PropTypes.shape({
  usableAreas: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.shape({
    city: PropTypes.string,
    neighborhood: PropTypes.string,
  }).isRequired,
  pricingInfos: PropTypes.shape({
    businessType: PropTypes.oneOf(['SALE', 'RENTAL']).isRequired,
    monthlyCondoFee: PropTypes.string,
    price: PropTypes.string,
    rentalTotalPrice: PropTypes.string,
  }),
});
