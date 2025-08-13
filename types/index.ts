export interface Symptom {
  type: "text" | "visual";
  value: string; // text description or image reference
}

export interface Intervention {
  text: string;
  isCorrect: boolean;
}

export interface MedicalCase {
  illness: string;
  symptomsPart1: Symptom[];
  symptomsPart2: Symptom[];
  diagnosisOptions: string[];
  correctDiagnosis: string;
  interventions: Intervention[];
}

export interface GameState {
  currentCaseIndex: number;
  currentStage: 1 | 2 | "intervention" | "result";
  score: number;
  selectedDiagnosis?: string;
  selectedInterventions: string[];
}

// Legacy types for existing code compatibility
export type LegacySymptom = {
  id: string
  text: string
  visual?: string // optional key to trigger avatar visual change
}

export type LegacyIntervention = {
  id: string
  text: string
  correct: boolean
}

export type CaseStage = {
  id: string
  symptoms: LegacySymptom[]
}

export type CaseData = {
  id: string
  title: string
  avatar: string // base avatar image src in /public/avatars
  visualSymptoms?: Record<string, string> // key -> avatar image src for visual symptom
  diagnosisOptions: { id: string; text: string; correct: boolean }[]
  stages: CaseStage[]
  interventionPool: LegacyIntervention[]
}

export type LegacyGameState = {
  caseIndex: number
  stageIndex: number
  totalScore: number
  answeredDiagnosis: boolean
  selectedInterventions: Record<string, boolean>
}

export type ReviewEntry = {
  caseId: string
  caseTitle: string
  diagnosisSelected?: string
  diagnosisCorrect: boolean
  correctDiagnosisId: string
  interventionsSelected: Record<string, boolean>
}

export type Review = ReviewEntry[]
