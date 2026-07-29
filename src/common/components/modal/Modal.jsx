"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    //Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleBackdropClick}>
      {/*Dialog*/}
      <div className="relative flex h-fit max-h-[calc(100vh-32px)] w-fit max-w-[calc(100vw-32px)] flex-col overflow-auto rounded-xs bg-gray-500 p-[15px] lg:p-[30px]">
        <button
          onClick={onClose}
          className="absolute top-[15px] right-[15px] cursor-pointer text-gray-300 transition-colors hover:text-white lg:top-[30px] lg:right-[30px]"
          aria-label="모달 닫기">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 lg:h-8 lg:w-8"
            viewBox="0 0 32 32"
            fill="none">
            <path
              d="M8.53266 24.8712L7.12756 23.4661L14.5942 15.9994L7.12756 8.53272L8.53266 7.12762L15.9993 14.5943L23.466 7.12762L24.8711 8.53272L17.4044 15.9994L24.8711 23.4661L23.466 24.8712L15.9993 17.4045L8.53266 24.8712Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="mt-[17px] flex-1">{children}</div>
      </div>
    </div>
  );
}
