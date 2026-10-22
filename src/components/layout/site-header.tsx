import { useState } from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { navLinks, site } from "@/data/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a
          href="#top"
          className="font-heading text-sm font-bold tracking-[0.2em] uppercase"
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium tracking-[0.18em] text-foreground/80 uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>

      <div
        className={cn(
          "border-b border-border bg-background/95 px-5 py-4 backdrop-blur md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-[0.14em] uppercase"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
