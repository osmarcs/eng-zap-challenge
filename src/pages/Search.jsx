import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import ListItem from '../components/ListItem';
import Property from '../types/Property';
import Pagination from '../components/Pagination';

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 50%;
  @media (max-width: 768px) {
    flex-basis: 100%;
  }
  @media (min-width: 1540px) {
    flex-basis: 33.33%;
  }
  @media (min-width: 2000px) {
    flex-basis: 25%;
  }
`;

function Search(props) {
  const { properties } = props;
  const perPage = 20;
  const [pagination, setPagination] = useState({});
  const [paginateProperties, setPaginateProperties] = useState([]);
  const { history } = useReactRouter();

  function handleSelectProperty(id) {
    history.push(`details/${id}`);
  }

  function handleChangePage(page) {
    const { currentPage, totalPage } = pagination;
    const newPage = page - 1;
    if (currentPage === newPage || totalPage < page) {
      return;
    }
    setPagination({
      totalPage,
      currentPage: newPage,
    });
  }

  useEffect(() => {
    const totalPage = Math.ceil(properties.length / perPage);
    setPagination({
      totalPage,
      currentPage: 0,
    });
  }, [properties]);

  useEffect(() => {
    const { currentPage = 0 } = pagination;
    const start = perPage * currentPage;
    const end = perPage * (currentPage + 1);
    setPaginateProperties(properties.slice(start, end));
  }, [pagination, properties]);

  return (
    <Main>
      {paginateProperties.map(item => (
        <ListItem
          onSelect={handleSelectProperty}
          key={item.id}
          property={item}
        />
      ))}
      {paginateProperties.length ? (
        <Pagination
          current={pagination.currentPage + 1}
          totalPage={pagination.totalPage}
          onChangePage={handleChangePage}
        />
      ) : (
        ''
      )}
    </Main>
  );
}

Search.propTypes = {
  properties: PropTypes.arrayOf(Property).isRequired,
};

export default Search;
