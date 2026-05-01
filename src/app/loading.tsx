export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent-soft border-t-accent animate-spin" />
        <p className="font-sans text-sm text-fg-subtle">Loading...</p>
      </div>
    </div>
  );
}
