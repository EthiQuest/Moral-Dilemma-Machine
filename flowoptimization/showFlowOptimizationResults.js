export function showFlowOptimizationResults() {
    const maxScore = flowOptimizationQuestions.length * 3;
    const percentage = (flowOptimizationScore / maxScore) * 100;

    let resultHtml = "<h3>Flow Optimization Assessment Results</h3>";
    resultHtml += `<p>Your Flow Optimization Score: ${flowOptimizationScore} out of ${maxScore} (${percentage.toFixed(2)}%)</p>`;

    if (percentage > 80) {
        resultHtml += "<p>Excellent! You have a strong grasp of flow optimization principles.</p>";
    } else if (percentage > 60) {
        resultHtml += "<p>Good job! You have a solid understanding of flow optimization, with some room for improvement.</p>";
    } else if (percentage > 40) {
        resultHtml += "<p>You have a basic understanding of flow optimization. Consider focusing on improving this area.</p>";
    } else {
        resultHtml += "<p>There's significant room for improvement in your understanding of flow optimization. Consider additional training or resources in this area.</p>";
    }

    resultHtml += "<button class='back-to-results'>Back to Overall Results</button>";
    document.getElementById('result').innerHTML = resultHtml;
}