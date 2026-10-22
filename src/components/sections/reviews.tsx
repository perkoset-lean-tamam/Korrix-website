import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { reviews } from "@/data/content"

export function Reviews() {
  return (
    <section id="reviews" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 md:gap-16 md:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
          Отзывы
        </h2>

        <div className="grid grid-cols-1 border-t border-l border-border md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex flex-col gap-8 border-r border-b border-border p-6 md:min-h-80 md:p-8"
            >
              <p className="flex-1 text-sm leading-relaxed md:text-[15px]">
                «{review.quote}»
              </p>
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>{review.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
