import React, { ReactElement } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import dialog from "./style.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactElement;
  hasCloseButton?: boolean;
  children: React.ReactNode;
};

function Dialog({
  isOpen,
  onClose,
  title,
  hasCloseButton = false,
  children,
}: Props) {
  return (
    <Modal
      className={dialog["modal"]}
      isOpen={isOpen}
      toggle={onClose}
      size="lg"
      centered
      backdrop
      fade
    >
      <ModalHeader
        className={dialog["modal-header"]}
        toggle={hasCloseButton ? onClose : undefined}
      >
        {title}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default Dialog;
