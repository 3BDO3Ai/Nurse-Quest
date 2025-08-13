type Option = { id: string; text: string; correct: boolean }

type Props = {
  options: Option[]
  onSelect: (id: string) => void
}

export default function DiagnosisOptions({ options, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">What is the most likely diagnosis?</h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((o) => (
          <button key={o.id} onClick={() => onSelect(o.id)} className="btn btn-secondary text-left">
            {o.text}
          </button>
        ))}
      </div>
    </div>
  )
}
