import React, { ReactElement } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import dialog from "assets/scss/components/Dialog/style.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactElement;
  hasCloseButton?: boolean;
  children: React.ReactNode;
  size?: "xs" | "sm" | "lg" | "md" | "xl";
  classNameDialog?: string
};

function Dialog({
  isOpen,
  onClose,
  title,
  hasCloseButton = true,
  children,
  size = "lg",
  classNameDialog
}: Props) {
  return (
    <Modal
      className={`${dialog["modal"]} ${classNameDialog ? classNameDialog : ""}`}
      isOpen={isOpen}
      toggle={onClose}
      size={size}
      backdrop
      fade
    >
      {title && (
        <ModalHeader
          className={dialog["modal-header"]}
          toggle={hasCloseButton ? onClose : undefined}
        >
          {title}
        </ModalHeader>
      )}
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default Dialog;
