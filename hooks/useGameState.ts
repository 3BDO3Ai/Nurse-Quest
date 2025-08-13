"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import casesData from '@/data/cases.json'
import { CaseData, GameState, Intervention, Symptom, Review } from '@/types'

const STARTING_STATE: GameState = {
  caseIndex: 0,
  stageIndex: 0,
  totalScore: 0,
  answeredDiagnosis: false,
  selectedInterventions: {},
}

export function useGameState() {
  const cases = casesData as unknown as CaseData[]
  const [state, setState] = useState<GameState>(STARTING_STATE)
  const [finished, setFinished] = useState(false)
  const [review, setReview] = useState<Review>([])
  const currentCase = cases[state.caseIndex]

  useEffect(() => {
    setState((s) => ({ ...s, stageIndex: 0, answeredDiagnosis: false, selectedInterventions: {} }))
  }, [state.caseIndex])

  const currentStage = currentCase.stages[state.stageIndex]
  const visibleSymptoms: Symptom[] = currentStage.symptoms

  const diagnosisOptions = useMemo(() => currentCase.diagnosisOptions, [currentCase])

  const diagnosisCorrect = state.answeredDiagnosis

  const selectDiagnosis = useCallback(
    (id: string) => {
      const option = currentCase.diagnosisOptions.find((o) => o.id === id)
      if (!option) return
      if (option.correct) {
        setState((s) => ({ ...s, answeredDiagnosis: true, totalScore: s.totalScore + 10 }))
        setReview((r) => [
          ...r,
          {
            caseId: currentCase.id,
            caseTitle: currentCase.title,
            diagnosisSelected: id,
            diagnosisCorrect: true,
            correctDiagnosisId: currentCase.diagnosisOptions.find((d) => d.correct)!.id,
            interventionsSelected: {},
          },
        ])
      } else {
        // wrong -> if stage 0 then go to stage 1; if already at last stage keep and allow second guess
        setState((s) => ({ ...s, stageIndex: Math.min(s.stageIndex + 1, currentCase.stages.length - 1) }))
      }
    },
    [currentCase]
  )

  const moveToInterventions = useCallback(() => {
    setState((s) => ({ ...s, answeredDiagnosis: true }))
  }, [])

  const interventionOptions: Intervention[] = useMemo(() => currentCase.interventionPool, [currentCase])

  const toggleIntervention = useCallback((id: string) => {
    setState((s) => ({ ...s, selectedInterventions: { ...s.selectedInterventions, [id]: !s.selectedInterventions[id] } }))
  }, [])

  const submitInterventions = useCallback(() => {
    const correctIds = new Set(interventionOptions.filter((i) => i.correct).map((i) => i.id))
    let gained = 0
    for (const [id, sel] of Object.entries(state.selectedInterventions)) {
      if (sel && correctIds.has(id)) gained += 5
      if (sel && !correctIds.has(id)) gained -= 2
    }
    // update review entry for this case
    setReview((r) => {
      const correctDiag = currentCase.diagnosisOptions.find((d) => d.correct)!.id
      const existing = r.findIndex((e) => e.caseId === currentCase.id)
      const entry = {
        caseId: currentCase.id,
        caseTitle: currentCase.title,
        diagnosisSelected: r[existing]?.diagnosisSelected,
        diagnosisCorrect: r[existing]?.diagnosisCorrect ?? false,
        correctDiagnosisId: correctDiag,
        interventionsSelected: state.selectedInterventions,
      }
      if (existing >= 0) {
        const copy = [...r]
        copy[existing] = { ...copy[existing], ...entry }
        return copy
      }
      return [...r, entry]
    })

    const atLastCase = state.caseIndex >= cases.length - 1
    if (atLastCase) {
      setFinished(true)
      setState((s) => ({ ...s, totalScore: s.totalScore + gained }))
    } else {
      setState((s) => ({
        ...s,
        totalScore: s.totalScore + gained,
        caseIndex: s.caseIndex + 1,
        stageIndex: 0,
        answeredDiagnosis: false,
        selectedInterventions: {},
      }))
    }
  }, [cases.length, interventionOptions, state.selectedInterventions, state.caseIndex])

  const progress = useMemo(() => {
    const perCase = 100 / cases.length
    const stageProgress = state.answeredDiagnosis ? 0.6 : state.stageIndex === 0 ? 0.2 : 0.4
    return Math.round(state.caseIndex * perCase + perCase * stageProgress)
  }, [cases.length, state.caseIndex, state.stageIndex, state.answeredDiagnosis])

  const resetGame = useCallback(() => {
    setFinished(false)
    setState(STARTING_STATE)
  setReview([])
  }, [])

  return {
    currentCase,
    currentStageIndex: state.stageIndex,
    visibleSymptoms,
    diagnosisOptions,
    selectDiagnosis,
    diagnosisCorrect,
    moveToInterventions,
    interventionOptions,
    toggleIntervention,
    submitInterventions,
    progress,
    isGameOver: finished,
    score: state.totalScore,
    resetGame,
  review,
  }
}
