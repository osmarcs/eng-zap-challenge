import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import Property from '../types/Property';

import If from '../helpers/if';
import { formatMoney } from '../helpers/utils';
import { FOR_RENTAL } from '../helpers/constants';

const DetailsContainer = styled.main`
  background-color: var(--white);
  display: flex;
  flex-wrap: wrap;
  max-width: 1024px;
  margin: auto;
  .image-gallery {
    width: 100%;
  }
  .image-gallery-image {
    height: 400px;
    width: 100%;
  }
  .image-gallery-slide img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const InfoList = styled.ul`
  display: flex;
  margin: 40px 0;
  padding: 0;
  li {
    float: left;
    margin-right: 35px;
    &:first-child {
      list-style: none;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

const GalleryContainer = styled.section`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`;
const DetailsInfo = styled.section`
  width: 70%;
  padding: 16px;
`;

const Title = styled.h1`
  font-weight: normal;
`;

const DetailsPrice = styled.section`
  border-left: 1px solid var(--gray);
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 30%;
`;

const BusinessType = styled.h3`
  font-weight: normal;
  font-variant: small-caps;
  text-transform: uppercase;
`;
const Price = styled.span`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const PriceList = styled.ul`
  margin: 0;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
  }
`;

function Details({ properties }) {
  const [property, setProperty] = useState({});
  const { match } = useReactRouter();

  useEffect(() => {
    const { id } = match.params;
    const propertyFound = properties.find(item => item.id === id) || {};
    setProperty(propertyFound);
  }, [properties, match]);

  function render() {
    const {
      usableAreas,
      bedrooms,
      bathrooms,
      parkingSpaces,
      images = [],
      pricingInfos: {
        businessType,
        monthlyCondoFee,
        price,
        rentalTotalPrice,
        yearlyIptu,
      } = {},
      address: { city, neighborhood } = {},
    } = property;

    const type = businessType === FOR_RENTAL ? 'Alugar' : 'Comprar';
    const monthly = businessType === FOR_RENTAL ? '/mês' : '';

    const photos = images.map(image => ({
      original: image,
    }));

    return (
      <If test={property.id}>
        <GalleryContainer>
          <ImageGallery
            items={photos}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
            slideDuration={1000}
          />
        </GalleryContainer>
        <DetailsInfo>
          <Title>
            {`Para ${type} com ${bedrooms} Quarto(s), 
              ${usableAreas}m² por ${formatMoney(price)}${monthly}`}
          </Title>
          <If test={city && neighborhood}>
            <address>{`${neighborhood}, ${city}`}</address>
          </If>
          <InfoList>
            {bedrooms ? <li>{`${bedrooms} quartos`}</li> : ''}
            {bathrooms ? <li>{`${bathrooms} banheiros`}</li> : ''}
            {usableAreas ? <li>{`${usableAreas} m2`}</li> : ''}
            {parkingSpaces ? <li>{`${parkingSpaces} vaga(s)`}</li> : ''}
          </InfoList>

          <p>
            Ainda assim, existem dúvidas a respeito de como o aumento do diálogo
            entre os diferentes setores produtivos assume importantes posições
            no estabelecimento do sistema de participação geral.
          </p>
        </DetailsInfo>
        <DetailsPrice>
          <BusinessType>{type}</BusinessType>
          <Price>{formatMoney(price)}</Price>
          <PriceList>
            {monthlyCondoFee > 0 && (
              <li>
                <span>Condomínio</span>
                <span>{formatMoney(monthlyCondoFee)}</span>
              </li>
            )}

            {rentalTotalPrice > 0 && (
              <li>
                <span>Preço c/ condomínio</span>
                <span>{formatMoney(rentalTotalPrice)}</span>
              </li>
            )}
            {yearlyIptu > 0 && (
              <li>
                <span>IPTU</span>
                <span>{formatMoney(yearlyIptu)}</span>
              </li>
            )}
          </PriceList>
        </DetailsPrice>
      </If>
    );
  }

  return <DetailsContainer>{property && render()}</DetailsContainer>;
}

Details.propTypes = {
  properties: PropTypes.arrayOf(Property).isRequired,
};

export default Details;
