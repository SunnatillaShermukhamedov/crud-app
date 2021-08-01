import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import DatePickerField from '../../components/DatePicker';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import { useManageUser } from '../../api/users';

const ModalWrapper = styled.div`
  width: 100%;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  surname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Surname is required'),
});

const UserFormModal = ({ title, closeModal, profile }) => {
  const manage = useManageUser();
  const editMode = !!profile;
  const handleSave = (values, { setSubmitting }) => {
    if (editMode) {
      manage.update(values, () => {
        setSubmitting(false);
        closeModal();
      });
    } else {
      manage.create(values, () => {
        setSubmitting(false);
        closeModal();
      });
    }
  };

  const initialValues = profile
    ? {
        ...profile,
        dateofbirth: profile.dateofbirth ? new Date(profile.dateofbirth) : '',
      }
    : {
        name: '',
        surname: '',
        middlename: '',
        dateofbirth: '',
        address: '',
      };

  return (
    <Modal title={title} closeModal={closeModal}>
      <ModalWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <TextField
                placeholder="Surname"
                type="text"
                maxLength={30}
                name="surname"
              />
              <TextField
                placeholder="Name"
                type="text"
                maxLength={30}
                name="name"
              />
              <TextField
                placeholder="Middle name"
                type="text"
                maxLength={30}
                name="middlename"
              />
              <DatePickerField
                name="dateofbirth"
                placeholderText="Date OF Birth"
                selected={values.dateofbirth}
                onChange={(date) => setFieldValue('dateofbirth', date)}
              />

              <TextField
                placeholder="Address"
                type="text"
                maxLength={30}
                name="address"
              />
              <Paragraph $textAlign="right">
                <Button
                  type="submit"
                  title="Save"
                  size="medium"
                  disabled={isSubmitting}
                />
              </Paragraph>
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    </Modal>
  );
};

UserFormModal.propTypes = {
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

export default UserFormModal;
