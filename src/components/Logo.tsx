interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <a
      href="/"
      className={`flex items-center p-0 gap-2 ${className ?? ""}`}
    >
      <span className="font-mono text-xl font-semibold text-white tracking-wide transition-all duration-200 hover:text-[#93c5fd]">
        Frank
      </span>
      <span className="text-[#3b82f6] text-base font-light">/</span>
      <span className="font-mono text-base text-[#64748b] tracking-wide transition-all duration-200 hover:text-[#94a3b8]">
        dev
      </span>
    </a>
  );
}
