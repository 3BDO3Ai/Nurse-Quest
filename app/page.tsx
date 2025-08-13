"use client"

import PatientDisplay from '@/components/PatientDisplay'
import SymptomDialogue from '@/components/SymptomDialogue'
import DiagnosisOptions from '@/components/DiagnosisOptions'
import InterventionSelection from '@/components/InterventionSelection'
import ScoreSummary from '@/components/ScoreSummary'
import ProgressBar from '@/components/ProgressBar'
import { useGameState } from '@/hooks/useGameState'

export default function HomePage() {
  const {
    currentCase,
    currentStageIndex,
    visibleSymptoms,
    diagnosisOptions,
    selectDiagnosis,
    diagnosisCorrect,
    interventionOptions,
    toggleIntervention,
    submitInterventions,
    progress,
    isGameOver,
    score,
    resetGame,
    review,
  } = useGameState()

  if (isGameOver) {
    return (
      <div className="card">
        <ScoreSummary score={score} review={review} onRestart={resetGame} />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-4 items-start">
      <div className="card flex flex-col items-center">
        <PatientDisplay
          avatar={currentCase.avatar}
          visualSymptoms={currentCase.visualSymptoms}
          currentVisualKey={visibleSymptoms.find((s) => s.visual)?.visual ?? null}
        />
      </div>

      <div className="space-y-4">
        <ProgressBar value={progress} />

        <div className="card">
          <SymptomDialogue symptoms={visibleSymptoms} />
        </div>

        {!diagnosisCorrect ? (
          <div className="card">
            <DiagnosisOptions options={diagnosisOptions} onSelect={selectDiagnosis} />
          </div>
        ) : (
          <div className="card">
            <InterventionSelection
              options={interventionOptions}
              onToggle={toggleIntervention}
              onSubmit={submitInterventions}
            />
          </div>
        )}
      </div>
    </div>
  )
}
