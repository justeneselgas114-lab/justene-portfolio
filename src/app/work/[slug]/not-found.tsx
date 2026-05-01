import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
        404
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
        Project not found
      </h1>
      <p className="font-sans text-base text-fg-muted mb-8 max-w-md">
        The case study you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild>
        <Link href="/#work">View all work</Link>
      </Button>
    </main>
  );
}
