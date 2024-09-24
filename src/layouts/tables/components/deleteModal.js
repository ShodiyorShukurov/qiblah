import * as React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./modal.css";

export default function NewsDeleteModal({ deleteModal, openDeleteModal, closeDeleteModal, handleDelete }) {
  return (
    <Modal isOpen={deleteModal} toggle={() => openDeleteModal} className="custom-modal">
      <ModalHeader>DELETE</ModalHeader>
      <ModalBody>Do you really want to delete?</ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={handleDelete}>
          Yes
        </Button>
        <Button color="secondary" onClick={closeDeleteModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

NewsDeleteModal.propTypes = {
  deleteModal: PropTypes.bool.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
