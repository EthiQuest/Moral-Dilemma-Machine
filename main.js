import { startAssessment, checkHRCode, makeChoice, showResults, startFlowOptimizationDrillDown, answerFlowOptimizationQuestion } from './app.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startButton').addEventListener('click', startAssessment);
    document.getElementById('hrAccessButton').addEventListener('click', checkHRCode);

    document.getElementById('options').addEventListener('click', function(event) {
        if (event.target.matches('button[data-choice]')) {
            const index = parseInt(event.target.getAttribute('data-choice'));
            makeChoice(index);
        }
    });

    document.getElementById('result').addEventListener('click', function(event) {
        if (event.target.matches('button[data-flow-option]')) {
            const index = parseInt(event.target.getAttribute('data-flow-option'));
            answerFlowOptimizationQuestion(index);
        } else if (event.target.matches('.flow-optimization-drill-down')) {
            startFlowOptimizationDrillDown();
        } else if (event.target.matches('.back-to-results')) {
            showResults();
        }
    });

    const modal = document.getElementById("infoModal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});