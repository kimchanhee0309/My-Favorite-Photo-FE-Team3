import { Suspense } from "react";
import MySalesContent from "./_components/MySalesContent";
import MySalesHeader from "./_components/MySalesHeader";

export default function MySales() {
  return (
    <div>
      <Suspense fallback={null}>
        <MySalesHeader />
        <MySalesContent />
      </Suspense>
    </div>
  );
}
