import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import Row from './Row';
import palette from '../../styles/palette';

const StyledTable = styled.table`
  height: 60vh;
  width: 100%;
  border: 3px solid ${palette.alto};
`;

const Table = ({ data }) => {
  return (
    <StyledTable>
      <thead>
        <Row>
          <td>Surname</td>
          <td>Name</td>
          <td>Patronymic</td>
          <td>Date of birth</td>
          <td>Address</td>
        </Row>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <Row key={index}>
            <td>{item.surname}</td>
            <td>{item.name}</td>
            <td>{item.middlename}</td>
            <td>{format(new Date(item.dateofbirth), 'yyyy-MM-dd')}</td>
            <td>{item.address}</td>
          </Row>
        ))}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
