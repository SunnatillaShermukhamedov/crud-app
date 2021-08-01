import classNames from 'classnames';
import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import palette from '../../styles/palette';
import Paragraph from '../Paragraph';

const modalStyles = {
  overlay: {
    position: 'fixed',
    overflowY: 'scroll',
    zIndex: 2,
    padding: '27px 0',
    height: '100%',
  },
  content: {
    inset: 0,
    width: '90%',
    margin: '0 auto',
    overflow: 'initial',
    background: 'transparent',
    maxWidth: '800px',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
};

const ModalDialog = styled.div`
  background: ${palette.white};
  border-radius: 8px;
  box-shadow: 1px 1px 4px ${palette.silver};
  border: 1px solid ${palette.silver};
  padding: 36px;
  position: relative;
  width: 100%;
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  width: 16px;
  height: 16px;
  border: 0;
  top: 16px;
  right: 16px;
  background: transparent;
  padding: 0;
  font-size: 24px;
`;

const Modal = ({ className, children, title, closeModal }) => {
  return (
    <ReactModal
      isOpen={true}
      style={modalStyles}
      bodyOpenClassName="modal-open"
      onRequestClose={closeModal}
      className={classNames('modal-content', className)}
      shouldCloseOnOverlayClick={true}
    >
      <ModalDialog>
        {title && (
          <Paragraph
            as="h3"
            className="modal-title"
            $marginBottom="36px"
            $fontSize="20px"
          >
            {title}
          </Paragraph>
        )}
        {children}
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalDialog>
    </ReactModal>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
