import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent height="750px" maxWidth="750px" px={10}>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
