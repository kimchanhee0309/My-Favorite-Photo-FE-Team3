import { Suspense } from "react";
import GalleryContent from "./_components/GalleryContent";
import GalleryHeader from "./_components/GalleryHeader";

export default function GalleryPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <GalleryHeader />
        <GalleryContent />
      </Suspense>
    </div>
  );
}
