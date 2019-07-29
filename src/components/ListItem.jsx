import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatMoney } from '../helpers/utils';
import Property from '../types/Property';
import { FOR_RENTAL } from '../helpers/constants';

const Container = styled.article`
  border: 1px solid var(--gray);
  height: 300px;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-basis: inherit;
  color: var(--white);
  text-shadow: 1px 1px var(--black);
  font-size: 1.2rem;
`;

const InfoDetails = styled.section`
  bottom: 16px;
  left: 40px;
  padding: 0 16px;
  position: absolute;
  address,
  ul {
    background: rgba(0, 0, 0, 0.5);
    clear: both;
    float: left;
    font-style: normal;
    margin: 0;
    padding: 2px;
  }
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

const InfoPrice = styled.section`
  font-weight: bold;
  position: absolute;
  right: 16px;
  top: 16px;
  span {
    background: rgba(0, 0, 0, 0.5);
    clear: both;
    float: right;
    padding: 2px;
    &:nth-child(2) {
      font-size: 1.7rem;
    }
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

function ListItem({ onSelect, property }) {
  const {
    id,
    usableAreas,
    bedrooms,
    bathrooms,
    parkingSpaces,
    images,
    pricingInfos: {
      businessType, monthlyCondoFee, price, rentalTotalPrice,
    },
    address: { city, neighborhood },
  } = property;

  const type = businessType === FOR_RENTAL ? 'Aluguel' : 'Venda';
  const value = businessType === FOR_RENTAL ? rentalTotalPrice : price;
  const altImg = `Imagem ${type}`;

  return (
    <Container>
      <Image onClick={() => onSelect(id)} alt={altImg} src={images[0]} />
      <InfoPrice>
        <span>{type}</span>
        <span>{formatMoney(value)}</span>
        {monthlyCondoFee && <span>{formatMoney(monthlyCondoFee)}</span>}
      </InfoPrice>

      <InfoDetails>
        <ul>
          {bedrooms ? <li>{`${bedrooms} quartos`}</li> : ''}
          {bathrooms ? <li>{`${bathrooms} banheiros`}</li> : ''}
          {usableAreas ? <li>{`${usableAreas} m2`}</li> : ''}
          {parkingSpaces ? <li>{`${parkingSpaces} vaga(s)`}</li> : ''}
        </ul>
        <address>{`${neighborhood}, ${city}`}</address>
      </InfoDetails>
    </Container>
  );
}

ListItem.propTypes = {
  property: Property.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ListItem;
