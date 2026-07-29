"use client";

import Modal from "@/common/components/modal/Modal";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [onCloseCallback, setOnCloseCallback] = useState(null);

  const openModal = (content, onClose) => {
    setModalContent(content);
    setOnCloseCallback(() => onClose ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    onCloseCallback?.();
    setIsOpen(false);
    setModalContent(null);
    setOnCloseCallback(null);
  };

  const contextValue = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
}

/**
 * useModal Hook
 *
 * 모달을 열고 닫는 함수에 접근할 수 있는 커스텀 훅입니다.
 * 아래 사용예제 참고해서 사용하세요.
 *
 * @example
 * function MyComponent() {
 *   const { openModal, closeModal } = useModal();
 *
 *   const handleClick = () => {
 *     openModal(
 *       <div>
 *         <h2>제목</h2>
 *         <p>내용</p>
 *         <button onClick={closeModal}>닫기</button>
 *       </div>
 *     );
 *   };
 *
 *   return <button onClick={handleClick}>모달 열기</button>;
 * }
 */
export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal은 ModalProvider 안에서 사용해야 합니다.");
  }

  return context;
}
