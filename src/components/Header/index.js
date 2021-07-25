import React from 'react';
import styled from 'styled-components';

import palette from '../../styles/palette';
import Container from '../Container';

const StyledHeader = styled.header`
  background: ${palette.alto};
  height: 50px;
  width: 100%;
  margin-bottom: 30px;

  p {
    margin: 0;
    padding: 0;
    font-weight: bold;
    padding-top: 15px;
    font-size: 18px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <p>Logo</p>
      </Container>
    </StyledHeader>
  );
};

export default Header;
