import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const color = variant === "light" ? "#F7F5F0" : "#0E1E45";
  return (
    <Link href="/" aria-label="Indigo Jeans — Accueil" className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className="font-serif tracking-[0.18em] text-[22px] sm:text-[26px] font-semibold"
        style={{ color }}
      >
        INDIGO
      </span>
      <span
        className="font-sans tracking-[0.4em] text-[9px] sm:text-[10px] mt-1 flex items-center gap-2"
        style={{ color }}
      >
        <span className="h-px w-4" style={{ background: color }} />
        JEANS
        <span className="h-px w-4" style={{ background: color }} />
      </span>
    </Link>
  );
}
