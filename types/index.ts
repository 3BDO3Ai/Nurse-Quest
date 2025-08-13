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

// Legacy types for backwards compatibility
export type ReviewEntry = {
  caseId: string
  caseTitle: string
  diagnosisSelected?: string
  diagnosisCorrect: boolean
  correctDiagnosisId: string
  interventionsSelected: Record<string, boolean>
}

export type Review = ReviewEntry[]
