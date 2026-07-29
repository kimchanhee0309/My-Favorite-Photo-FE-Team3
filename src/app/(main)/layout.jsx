import Gnb from "@/common/components/gnb/Gnb";
import { Suspense } from "react";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <Gnb />
      </Suspense>
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}
