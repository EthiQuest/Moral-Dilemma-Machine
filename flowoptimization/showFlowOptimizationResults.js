export function showFlowOptimizationResults() {
    const maxScore = flowOptimizationQuestions.length * 3;
    const percentage = (flowOptimizationScore / maxScore) * 100;

    let resultHtml = "<h3>Flow Optimization Assessment Results</h3>";
    resultHtml += `<p>Your Flow Optimization Score: ${flowOptimizationScore} out of ${maxScore} (${percentage.toFixed(2)}%)</p>`;

    if (percentage > 80) {
        resultHtml += "<p>Excellent! You have a