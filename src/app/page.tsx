import Image from "next/image";

export default function Home() {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Home Page</h1>
          <p className="text-lg text-muted-foreground">
            This would be your landing page
          </p>
        </div>
      </div>
    </div>
  );
}
