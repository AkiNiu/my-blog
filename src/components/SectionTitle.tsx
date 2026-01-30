type Props = {
  id?: string
  title: string
  subtitle?: string
}

export default function SectionTitle({ id, title, subtitle }: Props) {
  return (
    <div id={id} className="flex flex-col gap-2 mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-primary">{title}</h2>
      {subtitle ? <p className="text-lg text-muted-foreground font-light">{subtitle}</p> : null}
      <div className="h-1 w-20 bg-primary/10 rounded-full mt-2"></div>
    </div>
  )
}
