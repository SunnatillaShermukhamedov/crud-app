import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import palette from '../../styles/palette';

const InputWrapper = styled.div``;

const StyledTextField = styled.input`
  border: ${palette.ghost} 1px solid;
  border-radius: 8px;
  display: block;
  width: calc(100% - 20px);
  margin-bottom: 10px;
  height 40px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;


  ::placeholder {
    color: ${palette.ghost}
  }

`;

const TextField = ({ type, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <InputWrapper>
      <StyledTextField type={type} {...field} {...props} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </InputWrapper>
  );
};

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
};

TextField.defaultProps = {
  type: 'text',
};

export default TextField;
