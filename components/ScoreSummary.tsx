import casesData from '@/data/cases.json'
import { Review } from '@/types'

type Props = {
  score: number
  review: Review
  onRestart: () => void
}

export default function ScoreSummary({ score, review, onRestart }: Props) {
  const cases = casesData as any[]
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Simulation Complete</h2>
        <p className="text-slate-700">Total score: <span className="font-semibold">{score}</span></p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Review</h3>
        <div className="space-y-3">
          {review.map((r) => {
            const c = cases.find((x) => x.id === r.caseId)
            const correctDiag = c?.diagnosisOptions.find((d: any) => d.correct)
            const interventions = c?.interventionPool ?? []
            const selected = r.interventionsSelected || {}
            return (
              <div key={r.caseId} className="border rounded-lg p-3">
                <div className="font-medium">{r.caseTitle}</div>
                <div className="text-sm text-slate-700">Diagnosis: {correctDiag?.text}</div>
                <div className="mt-2">
                  <div className="text-sm font-medium">Interventions:</div>
                  <ul className="text-sm ml-4 list-disc">
                    {interventions.map((i: any) => (
                      <li key={i.id} className={i.correct ? 'text-emerald-700' : 'text-rose-700'}>
                        {i.text}
                        {selected[i.id] ? ' • selected' : ''}
                        {i.correct ? ' • correct' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center pt-2">
        <button onClick={onRestart} className="btn btn-primary">Play Again</button>
      </div>
    </div>
  )
}
