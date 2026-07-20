"use client";

import { Drawer as VaulDrawer } from "vaul";

export default function Drawer({ open, onClose, children }) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <VaulDrawer.Content className="fixed right-0 bottom-0 left-0 z-50 flex max-h-[90vh] flex-col items-center rounded-t-xs bg-gray-500 outline-none">
          <div className="mt-4 h-1 w-10 shrink-0 rounded-full bg-gray-400" />
          <div className="w-[345px] flex-1 overflow-y-auto px-5 py-6 md:w-[704px]">
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}