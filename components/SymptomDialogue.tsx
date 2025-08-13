import { LegacySymptom } from '@/types'
import { useEffect, useState } from 'react'

type Props = { symptoms: LegacySymptom[] }

export default function SymptomDialogue({ symptoms }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    if (symptoms.length === 0) return
    const iv = setInterval(() => {
      setVisibleCount((c) => (c < symptoms.length ? c + 1 : c))
    }, 500)
    return () => clearInterval(iv)
  }, [symptoms])

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Symptoms</h2>
      <ul className="space-y-1">
        {symptoms.slice(0, visibleCount).map((s) => (
          <li key={s.id} className="animate-fade-in-up">• {s.text}</li>
        ))}
      </ul>
    </div>
  )
}
