import { Suspense } from "react";
import MarketPlaceContent from "./_components/MarketPlaceContent";
import MarketPlaceHeader from "./_components/MarketPlaceHeader";

export default function MarketplacePage() {
  return (
    <div>
      <Suspense fallback={null}>
        <MarketPlaceHeader />
        <MarketPlaceContent />
      </Suspense>
    </div>
  );
}
