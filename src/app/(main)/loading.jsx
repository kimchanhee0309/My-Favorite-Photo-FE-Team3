import Spinner from "@/common/components/spinner/Spinner";

export default function MainLoading() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Spinner size={50} />
    </div>
  );
}
