import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { services, servicesIntro } from "@/data/content"

export function Services() {
  return (
    <section id="services" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 md:px-8 lg:gap-24">
        <div className="flex flex-col gap-6 md:sticky md:top-24 md:self-start">
          <h2 className="font-heading max-w-xs text-3xl font-bold tracking-tight uppercase md:text-5xl">
            {servicesIntro.title}
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
            {servicesIntro.description}
          </p>
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            size="lg"
            className="h-11 w-fit gap-2 rounded-none px-6 text-xs tracking-[0.14em] uppercase"
          >
            Оставить заявку
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>

        <ul className="flex flex-col">
          {services.map((service, index) => (
            <li key={service.index}>
              {index > 0 ? <Separator className="bg-border" /> : null}
              <div className="group flex items-start justify-between gap-6 py-7 transition-colors hover:bg-foreground hover:text-background md:py-8">
                <div className="flex min-w-0 flex-col gap-2 px-2 md:px-3">
                  <h3 className="font-heading text-lg font-bold tracking-tight uppercase md:text-xl">
                    {service.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground group-hover:text-background/70">
                    {service.description}
                  </p>
                </div>
                <span className="shrink-0 px-2 pt-1 font-mono text-xs tracking-wider text-muted-foreground group-hover:text-background/60 md:px-3">
                  {service.index} /
                </span>
              </div>
            </li>
          ))}
          <Separator className="bg-border" />
        </ul>
      </div>
    </section>
  )
}
