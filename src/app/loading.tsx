export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="flex flex-col items-center gap-4">
        <div
          aria-hidden
          className="w-10 h-10 rounded-full border-4 border-navy-200 border-t-navy-600 animate-spin"
        />
        <p className="text-[12.5px] text-ink-500 font-semibold">
          페이지를 준비하는 중…
        </p>
      </div>
    </div>
  );
}
