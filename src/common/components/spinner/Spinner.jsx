import Image from "next/image";

export default function Spinner({ size = 50, className = "" }) {
  return (
    <div className={`flex animate-spin items-center justify-center ${className}`}>
      <Image src="/spinner.svg" width={size} height={size} alt="" />
    </div>
  );
}
