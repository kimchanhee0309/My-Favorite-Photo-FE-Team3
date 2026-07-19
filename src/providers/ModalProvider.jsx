"use client";

import Modal from "@/common/components/modal/Modal";
import Drawer from "@/common/components/modal/Drawer";
import FullScreenModal from "@/common/components/modal/FullScreenModal";
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext(null);

function useModalBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("lg");

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 744px)");
    const lgQuery = window.matchMedia("(min-width: 1480px)");

    const update = () => {
      if (lgQuery.matches) setBreakpoint("lg");
      else if (mdQuery.matches) setBreakpoint("md");
      else setBreakpoint("base");
    };

    update();
    mdQuery.addEventListener("change", update);
    lgQuery.addEventListener("change", update);
    return () => {
      mdQuery.removeEventListener("change", update);
      lgQuery.removeEventListener("change", update);
    };
  }, []);

  return breakpoint;
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const breakpoint = useModalBreakpoint();

  const openModal = (content, { title = "" } = {}) => {
    setModalContent(content);
    setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalContent(null);
      setModalTitle("");
    }, 200);
  };

  const contextValue = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {breakpoint === "lg" && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
      {breakpoint === "md" && (
        <Drawer open={isOpen} onClose={closeModal}>
          {modalContent}
        </Drawer>
      )}
      {breakpoint === "base" && (
        <FullScreenModal open={isOpen} onClose={closeModal} title={modalTitle}>
          {modalContent}
        </FullScreenModal>
      )}
    </ModalContext.Provider>
  );
}

/**
 * useModal Hook
 *
 * 모달을 열고 닫는 함수에 접근할 수 있는 커스텀 훅입니다.
 * 화면 크기에 따라 Modal(lg) / Drawer(md) / FullScreenModal(base)이 자동으로 선택됩니다.
 * FullScreenModal의 헤더 타이틀이 필요하면 두 번째 인자로 { title }을 넘기세요.
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
 *       </div>,
 *       { title: "모바일 헤더 타이틀" }
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