import { Suspense } from "react";
import CreateResultContent from "./CreateResultContent";

export default function CreateResultPage() {
  return (
    <Suspense fallback={null}>
      <CreateResultContent />
    </Suspense>
  );
}