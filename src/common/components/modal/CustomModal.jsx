"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Drawer from "./Drawer";
import FullScreenModal from "./FullScreenModal";

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

export default function CustomModal({
  isOpen,
  onClose,
  width = 1160,
  contentMaxWidth = 920,
  mobileVariant = "drawer", // "drawer" | "fullscreen"
  title = "",
  children,
}) {
  const breakpoint = useModalBreakpoint();

  if (breakpoint === "base" && mobileVariant === "fullscreen") {
    return (
      <FullScreenModal open={isOpen} onClose={onClose} title={title}>
        {children}
      </FullScreenModal>
    );
  }

  if (breakpoint === "md" || breakpoint === "base") {
    return (
      <Drawer open={isOpen} onClose={onClose}>
        {children}
      </Drawer>
    );
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative flex max-h-[90vh] flex-col rounded-xs bg-gray-500 p-[30px]"
        style={{ width }}
      >
        <button
          onClick={onClose}
          className="absolute top-[30px] right-[30px] cursor-pointer"
          aria-label="모달 닫기"
        >
          <Image src="/close.png" alt="닫기" width={32} height={32} className="h-8 w-8" />
        </button>

        <div className="mt-[17px] mr-[70px] flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-400">
          <div className="mx-auto w-full" style={{ maxWidth: contentMaxWidth }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}