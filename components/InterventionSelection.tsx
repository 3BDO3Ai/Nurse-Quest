import { LegacyIntervention } from '@/types'
import { useMemo, useState } from 'react'

type Props = {
  options: LegacyIntervention[]
  onToggle: (id: string) => void
  onSubmit: () => void
}

export default function InterventionSelection({ options, onToggle, onSubmit }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const correctCount = useMemo(() => options.filter((o) => o.correct).length, [options])

  const toggle = (id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }))
    onToggle(id)
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Select all appropriate interventions</h2>
      <p className="text-sm text-slate-600">There are {correctCount} correct choices.</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => toggle(o.id)}
            className={`btn text-left ${selected[o.id] ? 'btn-primary' : 'btn-secondary'}`}
          >
            {o.text}
          </button>
        ))}
      </div>
      <div className="pt-2">
        <button onClick={onSubmit} className="btn btn-primary">Submit Interventions</button>
      </div>
    </div>
  )
}
