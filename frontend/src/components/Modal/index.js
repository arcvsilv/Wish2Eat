import React from 'react';
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { propTypes } from 'react-bootstrap/esm/Image';
/*
const Modal = ({ modal, setModal }) => {
  if (modal === true){
    return (
      <div>
        Esse é um modal. <button onClick={() => setModal(false)}>Fechar</button>
      </div>      
    );  
  }  
  return null;
};

export default Modal;*/

function MyModal(handleClose, ...props) {
  console.log(props.show)
  return (
    <Modal
      onHide={props.onHide}  
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Wish2Eat</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.label}</Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleClose}>
          OK
                            </button>
        {/* <button variant="primary" onClick={handleOnSubmit}>
                                Save Changes
                            </button> */}
      </Modal.Footer>
    </Modal>
  );
}
export default MyModal;

MyModal.propTypes = {
  onHide : PropTypes.any,
  show: PropTypes.bool,
  label: PropTypes.string
};  
