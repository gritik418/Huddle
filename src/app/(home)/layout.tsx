import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100 pt-4 h-[calc(100%-56px)]">
        <div className="sticky h-max top-[70px]">
          <HomeSidebar />
        </div>

        <div className="flex w-[calc(100%-300px)] flex-1 bg-gray-100 p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
