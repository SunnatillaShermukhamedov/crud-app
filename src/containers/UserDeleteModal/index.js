import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Formik } from 'formik';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import { useManageUser } from '../../api/users';

const ModalWrapper = styled.div`
  width: 100%;
`;

const UserDeleteModal = ({ title, closeModal, profile }) => {
  const manage = useManageUser();

  const handleDelete = (_, { setSubmitting }) => {
    manage.delete(profile.id, () => {
      setSubmitting(false);
      closeModal();
    });
  };

  return (
    <Modal title={title} closeModal={closeModal}>
      <ModalWrapper>
        <Formik
          initialValues={{}}
          onSubmit={handleDelete}
        >
          {({  isSubmitting }) => (
            <Form>
              <Paragraph>Are you sure to delete {profile.surname} {profile.name}?</Paragraph>


              <Paragraph $textAlign="right">
                <Button
                  type="submit"
                  title="Confirm"
                  size="medium"
                  disabled={isSubmitting}
                />

                <Button
                  onClick={closeModal}
                  type="submit"
                  title="Cancel"
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

UserDeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

export default UserDeleteModal;
