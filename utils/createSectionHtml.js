import { capitalizeFirstLetter } from './capitalizeFirstLetter.js';

export function createSectionHtml(title, scoreObj, chartId) {
    let sectionHtml = `<div class='section'><h3>${title}</h3>`;
    let totalScore = 0;
    const maxPossibleScore = totalDilemmas * 3 * Object.keys(scoreObj).length;
    const minPossibleScore = totalDilemmas * -3 * Object.keys(scoreObj).length;

    sectionHtml += "<table class='score-table'>";
    sectionHtml += "<thead><tr><th>Metric</th><th>Score</th><th>Percentage</th></tr></thead><tbody>";

    if (scoreObj) {
        for (const [metric, score] of Object.entries(scoreObj)) {
            const singleMetricMax = totalDilemmas * 3;
            const singleMetricMin = totalDilemmas * -3;
            const normalizedScore = ((score - singleMetricMin) / (singleMetricMax - singleMetricMin)) * 100;

            sectionHtml += `<tr>
                <td>${capitalizeFirstLetter(metric)}</td>
                <td>${score}</td>
                <td>${normalizedScore.toFixed(2)}%</td>
            </tr>`;
            totalScore += score;

            if (metric === 'flowEfficiency' && title === 'Lean Leadership') {
                sectionHtml += `<tr><td colspan="3"><button class="flow-optimization-drill-down">Drill Down into Flow Optimization</button></td></tr>`;   
            }
        }
    }
    const overallPercentage = ((totalScore - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * 100;
    sectionHtml += `</tbody><tfoot><tr>
        <th>Overall ${title} Score</th>
        <th>${totalScore} out of ${maxPossibleScore}</th>
        <th>${overallPercentage.toFixed(2)}%</th>
    </tr></tfoot>`;
    sectionHtml += "</table>";
    sectionHtml += `<div class='chart-container'><canvas id="${chartId}"></canvas></div></div>`;

    return sectionHtml;
}