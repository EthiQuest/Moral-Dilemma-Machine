import { flowOptimizationQuestions } from '../flowOptimizationQuestions.js';

export function presentFlowOptimizationQuestion() {
    if (currentFlowQuestion >= flowOptimizationQuestions.length) {
        showFlowOptimizationResults();
        return;
    }

    const question = flowOptimizationQuestions[currentFlowQuestion];
    let questionHtml = `<h3>Flow Optimization Question ${currentFlowQuestion + 1}</h3>`;
    questionHtml += `<p>${question.question}</p>`;

    questionHtml += question.options.map((option, index) => 
        `<button data-flow-option="${index}">${option.text}</button>`
    ).join('');
    document.getElementById('result').innerHTML = questionHtml;
}