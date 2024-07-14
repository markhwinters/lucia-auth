export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-background">
      {children}
    </main>
  );
}
