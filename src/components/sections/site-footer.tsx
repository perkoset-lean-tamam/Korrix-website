import { navLinks, site } from "@/data/content"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-heading text-sm font-bold tracking-[0.18em] uppercase">
          © {year} {site.name}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
