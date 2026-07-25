import { Suspense } from "react";
import SellResultContent from "./SellResultContent";

export default function SellResultPage() {
  return (
    <Suspense fallback={null}>
      <SellResultContent />
    </Suspense>
  );
}