import { Suspense } from "react";
import ExchangeResultContent from "./ExchangeResultContent";

export default function ExchangeResultPage() {
  return (
    <Suspense fallback={null}>
      <ExchangeResultContent />
    </Suspense>
  );
}