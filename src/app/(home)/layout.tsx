import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-[calc(100%-56px)]">
        <HomeSidebar />

        <div className="flex w-[calc(100%-300px)] flex-1 bg-gray-100 p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
