import ExploreTabs from "../../../components/ExploreTabs/ExploreTabs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white min-h-[calc(100vh-56px-16px-24px)] w-full rounded-lg">
      <ExploreTabs />

      {children}
    </div>
  );
}
