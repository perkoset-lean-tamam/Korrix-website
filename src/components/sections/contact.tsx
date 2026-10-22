"use client"

import { useState, type FormEvent } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contact } from "@/data/content"

export function Contact() {
  const [name, setName] = useState("")
  const [reach, setReach] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = encodeURIComponent(`Заявка Korrix — ${name || "без имени"}`)
    const body = encodeURIComponent(
      `Имя: ${name}\nКонтакт: ${reach}\n\nСообщение:\n${message}`
    )

    toast.success("Открываем почтовый клиент…")
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
            {contact.title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {contact.description}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Как к вам обращаться"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="reach">Telegram или email</FieldLabel>
              <Input
                id="reach"
                name="reach"
                placeholder="@username или email"
                value={reach}
                onChange={(event) => setReach(event.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Задача</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Кратко опишите, что нужно сделать"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            className="h-11 w-fit gap-2 rounded-none px-6 text-xs tracking-[0.14em] uppercase"
          >
            Отправить
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </section>
  )
}
