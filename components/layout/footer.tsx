import { Icon } from "@/components/ui/Icon";
import { socials } from "@/lib/data";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Project" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-[70px] border-t border-accent-cyan-light/15 px-5 pb-5 pt-10">
      <div className="mx-auto flex max-w-[1100px] flex-col justify-between gap-8 md:flex-row">
        <div className="flex flex-col gap-2">
          <a href="#home" className="font-display text-sm text-white">
            Zero-Route.Github.Io
          </a>
          <p className="text-xs text-text-secondary">Dimas Aksa Oktapian</p>
          <p className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Icon name="location" /> Barru, Indonesia
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-1.5 font-display text-[13px] text-white">Quick Links</h4>
          {quickLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-xs text-text-secondary transition-colors hover:text-accent-cyan-light">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-1.5 font-display text-[13px] text-white">Connect</h4>
          <p className="text-xs text-text-secondary">iostream911@gmail.com</p>
          <div className="mt-2 flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                aria-label={s.name}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent-cyan-light hover:text-accent-cyan-light"
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-8 border-t border-accent-cyan-light/[0.08] pt-5 text-center text-[11px] text-text-muted">
        © 2026 Dimas Aksa Oktapian. All rights reserved.
      </p>
    </footer>
  );
}
