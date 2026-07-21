import { Suspense } from "react";
import PurchaseResultContent from "./PurchaseResultContent";

export default function PurchaseResultPage() {
  return (
    <Suspense fallback={null}>
      <PurchaseResultContent />
    </Suspense>
  );
}