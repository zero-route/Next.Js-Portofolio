const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Project" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-[100] w-full border-b border-accent-cyan-light/15 bg-bg-primary/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-2.5 px-4 py-3 sm:flex-row sm:px-6 sm:py-4">
        <a
          href="#home"
          className="font-display text-sm tracking-wide text-white [text-shadow:0_0_10px_#38bdf8]"
        >
          MENU
        </a>
        <ul className="flex list-none gap-4 sm:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative font-mono text-[11px] tracking-wide text-text-secondary transition-colors hover:text-white sm:text-xs"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-accent shadow-[0_0_8px_#38bdf8] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
