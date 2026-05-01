import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
        404
      </p>
      <h1 className="font-serif text-5xl lg:text-7xl text-fg font-medium mb-4">
        Page not found
      </h1>
      <p className="font-sans text-base text-fg-muted mb-8 max-w-md">
        That page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}
