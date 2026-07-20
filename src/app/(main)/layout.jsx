import Gnb from "@/common/components/gnb/Gnb";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Gnb />
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}
