"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
        Something went wrong
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
        An error occurred
      </h1>
      <p className="font-sans text-base text-fg-muted mb-8 max-w-md">
        {error.message || "Please try again or refresh the page."}
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
