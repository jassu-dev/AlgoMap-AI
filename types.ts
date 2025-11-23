export interface SolutionStep {
  id: string;
  label: string;
  description: string;
  type: 'process' | 'decision' | 'start' | 'end';
}

export interface SolutionData {
  problemName: string;
  bruteForce: {
    code: string;
    complexity: string;
    explanation: string;
  };
  optimal: {
    code: string;
    complexity: string;
    explanation: string;
  };
  flowchart: SolutionStep[];
}

export interface GeminiResponse {
  problemTitle: string;
  bruteForceCode: string;
  bruteForceComplexity: string;
  optimalCode: string;
  optimalComplexity: string;
  stepByStepFlow: {
    step: string;
    detail: string;
    isDecision: boolean;
  }[];
}
