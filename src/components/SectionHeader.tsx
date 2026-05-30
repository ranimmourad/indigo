import Link from "next/link";

interface Props {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  href,
  hrefLabel = "Tout voir",
  align = "left",
}: Props) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start"
      } sm:flex-row sm:items-end sm:justify-between gap-3 mb-8`}
    >
      <div>
        {eyebrow && (
          <p className="text-[10px] tracking-[0.35em] uppercase text-stone mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-3xl sm:text-4xl text-indigo">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="text-[11px] tracking-[0.25em] uppercase text-indigo link-underline self-end sm:self-auto"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
