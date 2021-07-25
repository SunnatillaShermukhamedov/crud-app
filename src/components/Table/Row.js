import React from 'react';
import styled from 'styled-components';

import palette from '../../styles/palette';

const StyledRow = styled.tr`
  &:nth-child(2n) {
    background: ${palette.clouds};
  }

  thead & {
    td {
      font-weight: bold;
      background: ${palette.alto};
      height: 50px;
    }
  }
`;

const Row = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

export default Row;
