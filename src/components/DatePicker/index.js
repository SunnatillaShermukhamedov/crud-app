import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from "formik";


import palette from '../../styles/palette';

const FieldWrapper = styled.div`
  .react-datepicker-wrapper {
    display: block;
  }
  .react-datepicker__input-container input {
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
  }
`;

const DatePickerField = (props) => {
  const [field] = useField(props);
  return (
    <FieldWrapper>
      <DatePicker {...field} {...props} />
    </FieldWrapper>
  );
};

export default DatePickerField;
