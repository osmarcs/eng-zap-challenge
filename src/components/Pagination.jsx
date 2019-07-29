import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaginationContainer = styled.nav`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin: 40px;
  width: 100%;
`;
const Button = styled.button`
  background: var(--black);
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: 10px;
`;
const CurrentPage = styled.span`
  background-color: var(--white);
  padding: 9px 13px;
`;

function Pagination({ current, totalPage, onChangePage }) {
  return (
    <PaginationContainer>
      {current > 1 && (
        <Button type="button" onClick={() => onChangePage(current - 1)}>
          Anterior
        </Button>
      )}
      <CurrentPage>{current}</CurrentPage>
      {current !== totalPage && (
        <Button type="button" onClick={() => onChangePage(current + 1)}>
          Próximo
        </Button>
      )}
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Pagination;
