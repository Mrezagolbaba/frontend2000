import React, { ReactElement } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import dialog from "assets/scss/components/Dialog/style.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactElement;
  hasCloseButton?: boolean;
  children: React.ReactNode;
  size?: "xs" | "sm" | "lg" | "md" | "xl";
};

function Dialog({
  isOpen,
  onClose,
  title,
  hasCloseButton = true,
  children,
  size = "lg",
}: Props) {
  return (
    <Modal
      className={dialog["modal"]}
      isOpen={isOpen}
      toggle={onClose}
      size={size}
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
