import MarketPlaceContent from "./_components/MarketPlaceContent";
import MarketPlaceHeader from "./_components/MarkeyPlaceHeader";

export default function MarketplacePage() {
  return (
    <div className="layout-container flex flex-col py-10">
      <MarketPlaceHeader />
      <MarketPlaceContent />
    </div>
  );
}
