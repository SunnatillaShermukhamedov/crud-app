import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import palette from '../../styles/palette';

const StyledButton = styled.button`
  background: ${palette.alto};
  color:  ${palette.black};
  border: 3px solid ${palette.clouds};
  border-radius: 8px;


  ${ifProp(
    { size: 'medium' },
    css`
      padding: 10px 20px;
    `,
  )}
  ${ifProp(
    { size: 'small' },
    css`
      padding: 5px 10px;
    `,
  )};
  ${ifProp(
    '$margin',
    css`
      margin: ${prop('$margin')};
    `,
  )};
`;

const Button = ({ title, size, $margin, onClick, ...props }) => {
  return (
    <StyledButton
      size={size}
      $width="120px"
      $margin={$margin}
      onClick={onClick}
      {...props}
    >
      {title}
    </StyledButton>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
};

Button.defaultProps = {
  size: 'medium',
};

export default Button;
