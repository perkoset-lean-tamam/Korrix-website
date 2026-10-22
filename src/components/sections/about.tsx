import { about, values } from "@/data/content"

export function About() {
  return (
    <section id="about" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 md:gap-16 md:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
            {about.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {about.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex min-h-56 flex-col justify-between gap-8 border-r border-b border-border p-6 md:min-h-64 md:p-8"
            >
              <h3 className="font-heading text-lg font-bold tracking-tight uppercase">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
