export default function CowMark({ className = "", strokeWidth = 1.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* horns */}
      <path
        d="M14 14C8 11 4 4 6 1C9 -1 13 4 15 9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M50 14C56 11 60 4 58 1C55 -1 51 4 49 9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* head outline */}
      <path
        d="M32 10C20 10 12 19 12 29C12 40 20 48 32 48C44 48 52 40 52 29C52 19 44 10 32 10Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* ears */}
      <path d="M12 24C7 22 3 24 2 28" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M52 24C57 22 61 24 62 28" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* snout */}
      <path
        d="M22 36C22 41 26 44 32 44C38 44 42 41 42 36C42 33 38 31 32 31C26 31 22 33 22 36Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* nostrils */}
      <circle cx="28" cy="37" r="1.4" fill="currentColor" />
      <circle cx="36" cy="37" r="1.4" fill="currentColor" />
      {/* eyes */}
      <circle cx="23" cy="24" r="1.6" fill="currentColor" />
      <circle cx="41" cy="24" r="1.6" fill="currentColor" />
    </svg>
  );
}
