import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { site } from "@/data/content"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col bg-hero text-foreground"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-24 pb-10 md:px-8 md:pb-14">
        <div className="relative flex min-h-[58vh] flex-col items-center justify-center md:min-h-[64vh]">
          <h1 className="animate-korrix-fade-up font-heading relative z-20 w-full text-center text-[16vw] leading-[0.85] font-extrabold tracking-[-0.06em] text-foreground uppercase md:text-[11vw] lg:text-[9.5rem]">
            {site.name}
          </h1>
        </div>

        <div className="animate-korrix-fade-up-delay mt-auto flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xs text-[11px] leading-relaxed font-medium tracking-[0.16em] text-foreground/80 uppercase md:max-w-sm md:text-xs">
            {site.tagline}
          </p>
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            size="lg"
            className="h-11 min-w-44 gap-2 rounded-none px-6 text-xs tracking-[0.14em] uppercase"
          >
            Оставить заявку
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}
