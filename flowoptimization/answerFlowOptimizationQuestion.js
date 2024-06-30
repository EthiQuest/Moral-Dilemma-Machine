import { presentFlowOptimizationQuestion } from './presentFlowOptimizationQuestion.js';

export function answerFlowOptimizationQuestion(optionIndex) {
    const question = flowOptimizationQuestions[currentFlowQuestion];
    flowOptimizationScore += question.options[optionIndex].score;
    currentFlowQuestion++;
    presentFlowOptimizationQuestion();
}