import Sidebar from "@/components/Sidebar";

export default function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="hidden flex-col md:flex">
          <Sidebar />
        </aside>
        <main className="container px-3 py-3">{children}</main>
      </div>
    </div>
  );
}
