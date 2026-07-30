import Spinner from "@/common/components/spinner/Spinner";

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Spinner size={50} />
    </div>
  );
}
