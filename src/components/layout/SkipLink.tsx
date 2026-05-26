export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink-900 focus:text-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold focus:shadow-lg"
    >
      본문 바로가기
    </a>
  );
}
