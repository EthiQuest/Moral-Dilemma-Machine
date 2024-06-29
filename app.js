import dilemmaPool from './dilemmas.js';

const HR_SECRET_CODE = 'HR1234';
let currentDilemma = 0;
let totalDilemmas = 20;
let currentFlowQuestion = 0;
let flowOptimizationScore = 0;

const scores = {
    pillars: {
        trustworthiness: 0,
        respect: 0,
        responsibility: 0,
        fairness: 0,
        caring: 0,
        citizenship: 0
    },
    lean: {
        valueStreamOptimization: 0,
        continuousImprovement: 0,
        wasteReduction: 0,
        flowEfficiency: 0
    },
    team: {
        psychologicalSafety: 0,
        conflictResolution: 0,
        collaborativeCulture: 0,
        employeeEmpowerment: 0
    },
    psychopathic: 0,
    answerImpacts: []
};

const flowOptimizationQuestions = [
    {
        question: "How do you typically handle bottlenecks in your workflow?",
        options: [
            { text: "Increase resources at the bottleneck", score: 2 },
            { text: "Redesign the process to eliminate the bottleneck", score: 3 },
            { text: "Ignore it and focus on other areas", score: 0 }
        ]
    },
    {
        question: "What's your approach to reducing work in progress (WIP)?",
        options: [
            { text: "Implement a strict WIP limit", score: 3 },
            { text: "Gradually reduce WIP over time", score: 2 },
            { text: "Allow WIP to fluctuate based on demand", score: 1 }
        ]
    },
    {
        question: "How do you measure and improve cycle time?",
        options: [
            { text: "Regularly track and analyze cycle time metrics", score: 3 },
            { text: "Occasionally review cycle time when issues arise", score: 1 },
            { text: "Focus on output rather than cycle time", score: 0 }
        ]
    },
    {
        question: "What's your strategy for managing variability in your processes?",
        options: [
            { text: "Standardize processes to reduce variability", score: 3 },
            { text: "Buffer with inventory or capacity", score: 1 },
            { text: "Accept variability as inevitable", score: 0 }
        ]
    },
    {
        question: "How do you approach continuous flow in your operations?",
        options: [
            { text: "Strive for single-piece flow wherever possible", score: 3 },
            { text: "Use small batch sizes", score: 2 },
            { text: "Prioritize large batch production for efficiency", score: 0 }
        ]
    }
];

//
// functions startAssessment ...
//

function startAssessment() {
    totalDilemmas = parseInt(document.getElementById('dilemmaCount').value);
    if (isNaN(totalDilemmas) || totalDilemmas < 1 || totalDilemmas > dilemmaPool.length) {
        alert(`Please enter a valid number of scenarios (1-${dilemmaPool.length}).`);
        return;
    }
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    currentDilemma = 0;
    resetScores();
    presentDilemma();
}

//
// function resetScores ...
//

function resetScores() {
    for (const category in scores) {
        if (typeof scores[category] === 'object') {
            for (const metric in scores[category]) {
                scores[category][metric] = 0;
            }
        } else {
            scores[category] = 0;
        }
    }
}

//
// function makeChoice ...
//

function makeChoice(choiceIndex) {
  try {
    const dilemma = dilemmaPool[currentDilemma % dilemmaPool.length];
    const chosenOption = dilemma.options[choiceIndex];
    scores.answerImpacts = scores.answerImpacts || [];

    let impact = {
      question: dilemma.scenario,
      answer: chosenOption.text,
      impacts: {}
    };

    for (const [pillar, score] of Object.entries(chosenOption.scores.pillars)) {
      scores.pillars[pillar] += score;
      impact.impacts[pillar] = score;
    }

    scores.answerImpacts.push(impact);

    for (const category in chosenOption.scores) {
      if (category === 'psychopathic') {
        scores[category] += chosenOption.scores[category];
      } else {
        for (const metric in chosenOption.scores[category]) {
          scores[category][metric] += chosenOption.scores[category][metric];
        }
      }
    }

    currentDilemma++;
    
    if (currentDilemma >= totalDilemmas) {
      showResults();
    } else {
      presentDilemma();
    }
  } catch (error) {
    console.error("Error in makeChoice:", error);
  }
}

//
// function presentDilemma ...
//

function presentDilemma() {
  if (currentDilemma >= totalDilemmas) {
    showResults();
    return;
  }

  document.getElementById('progress').innerHTML = `<i class="fas fa-tasks"></i> Scenario ${currentDilemma + 1} of ${totalDilemmas}`;
  const dilemma = dilemmaPool[currentDilemma % dilemmaPool.length];
  document.getElementById('scenario').innerHTML = `<p><i class="fas fa-exclamation-circle"></i> ${dilemma.scenario}</p>`;

  const optionsHtml = dilemma.options.map((option, index) =>
    `<button data-choice="${index}" class="icon-text"><i class="fas fa-check-circle"></i> ${option.text}</button>`
  ).join('');

  document.getElementById('options').innerHTML = optionsHtml;
}

//
// function createImpactChart .....
//

let impactChart; // Declare a variable to store the chart instance

function createImpactChart(canvasId, impacts, pillars) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // If a chart instance already exists, destroy it before creating a new one
    if (impactChart) {
        impactChart.destroy();
    }

    const datasets = impacts.map((impact, index) => ({
        label: `Q${index + 1}`,
        data: pillars.map(pillar => impact.impacts[pillar] || 0),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
    }));

    impactChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pillars,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return `Question ${context[0].dataset.label}`;
                        },
                        label: function(context) {
                            const impact = impacts[context.datasetIndex];
                            return [
                                `Pillar: ${context.label}`,
                                `Impact: ${context.raw}`,
                                `Question: ${impact.question}`,
                                `Answer: ${impact.answer}`
                            ];
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 10
                        },
                        generateLabels: function(chart) {
                            const data = chart.data.datasets;
                            return data.map((dataset, i) => ({
                                text: dataset.label,
                                fillStyle: dataset.backgroundColor,
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                }
            }
        }
    });

    // Add click event listener to open modal with detailed information
    ctx.canvas.addEventListener('click', function(evt) {
        const points = impactChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        if (points.length) {
            const firstPoint = points[0];
            const selectedIndex = firstPoint.datasetIndex;
            openModalWithDetails(selectedIndex);
        }
    });
}
function openModalWithDetails(questionIndex) {
    const impact = scores.answerImpacts[questionIndex];
    const modal = document.getElementById("infoModal");
    const modalDetails = document.getElementById("modalDetails");

    let detailsHtml = `<h2>Details for Question ${questionIndex + 1}</h2>`;
    detailsHtml += `<p><strong>Question:</strong> ${impact.question}</p>`;
    detailsHtml += `<p><strong>Answer:</strong> ${impact.answer}</p>`;
    detailsHtml += "<ul>";
    for (const [pillar, value] of Object.entries(impact.impacts)) {
        detailsHtml += `<li><strong>${pillar}:</strong> ${value}</li>`;
    }
    detailsHtml += "</ul>";

    modalDetails.innerHTML = detailsHtml;
    modal.style.display = "block";
}

// Close modal when the user clicks on <span> (x)
document.addEventListener('DOMContentLoaded', function() {
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

//
// function showResults 
// 

function showResults() {
    console.log("showResults function called");

    try {
        const resultElement = document.getElementById('result');
        const gameElement = document.getElementById('game');
        const chartContainersElement = document.getElementById('chartContainers');
        const hrAccessElement = document.getElementById('hrAccess');

        if (!resultElement) {
            console.error("Error: 'result' element not found.");
            return;
        }
        if (!gameElement) {
            console.error("Error: 'game' element not found.");
            return;
        }
        if (!chartContainersElement) {
            console.error("Error: 'chartContainers' element not found.");
            return;
        }
        if (!hrAccessElement) {
            console.error("Error: 'hrAccess' element not found.");
            return;
        }

        let resultHtml = "<h2><i class='fas fa-chart-bar'></i> Your Leadership Style Assessment</h2>";

        // Impact on the 6 pillars Section - initialize scoreObj properly or handle null
        if (scores.answerImpacts && scores.answerImpacts.length > 0) {
            resultHtml += createSectionHtml("Impact of Your Decisions on Six Pillars", scores.pillars, 'impactChart');
        } else {
            resultHtml += "<p>No impacts to display.</p>";
        }

        // Ethical Leadership Section
        resultHtml += createSectionHtml("Ethical Leadership", scores.pillars, 'radarChart');

        // Lean Leadership Section
        resultHtml += createSectionHtml("Lean Leadership", scores.lean, 'leanRadarChart');

        // Team Leadership Section
        resultHtml += createSectionHtml("Team Leadership", scores.team, 'teamRadarChart');

        // Psychopathic Tendency
        const psychopathicPercentage = totalDilemmas > 0 ? (scores.psychopathic / (totalDilemmas * 2)) * 100 : 0;
        resultHtml += "<h3>Psychopathic Tendency</h3>";
        resultHtml += `<p><strong>Score:</strong> ${scores.psychopathic} out of ${totalDilemmas * 2} (${psychopathicPercentage.toFixed(2)}%)</p>`;
        if (psychopathicPercentage > 70) {
            resultHtml += "<p><strong><i class='fas fa-exclamation-triangle'></i> Note:</strong> Your decision-making style shows a significant tendency towards detachment and self-interest, which may be perceived negatively in leadership roles.</p>";
        } else if (psychopathicPercentage > 40) {
            resultHtml += "<p><strong><i class='fas fa-info-circle'></i> Note:</strong> Your decisions sometimes reflect a lack of empathy or consideration for others, which could impact your effectiveness as a leader.</p>";
        } else {
            resultHtml += "<p><strong><i class='fas fa-check-circle'></i> Note:</strong> Your decisions generally reflect empathy and consideration for others, which is positive for leadership roles.</p>";
        }

        console.log("Updating innerHTML of 'result' element");
        resultElement.innerHTML = resultHtml;
        console.log("Setting style of 'game' element to 'none'");
        gameElement.style.display = 'none';
        console.log("Setting style of 'result' element to 'block'");
        resultElement.style.display = 'block';
        console.log("Setting style of 'chartContainers' element to 'block'");
        chartContainersElement.style.display = 'block';
        console.log("Setting style of 'hrAccess' element to 'block'");
        hrAccessElement.style.display = 'block';

        console.log('Answer Impacts:', scores.answerImpacts);
        console.log('Pillars:', Object.keys(scores.pillars));

        document.querySelectorAll('.chart-container').forEach(container => {
            console.log('Setting display for container', container);
            container.style.display = 'block';
        });

        // Wrap chart creation in try-catch
        try {
            createImpactChart('impactChart', scores.answerImpacts, Object.keys(scores.pillars));
            createRadarChart('radarChart', Object.keys(scores.pillars), Object.values(scores.pillars), 'Ethical Leadership Profile');
            createRadarChart('leanRadarChart', Object.keys(scores.lean), Object.values(scores.lean), 'Lean Leadership Profile');
            createRadarChart('teamRadarChart', Object.keys(scores.team), Object.values(scores.team), 'Team Leadership Profile');
        } catch (error) {
            console.error("Error creating charts:", error);
        }

        console.log("Results displayed successfully");
    } catch (error) {
        console.error("Error in showResults:", error);
    }
}


//
// function createSectionHtml
//

function createSectionHtml(title, scoreObj, chartId) {
    let sectionHtml = `<div class='section'><h3>${title}</h3>`;
    let totalScore = 0;
    const maxPossibleScore = totalDilemmas * 3 * Object.keys(scoreObj).length;
    const minPossibleScore = totalDilemmas * -3 * Object.keys(scoreObj).length;

    sectionHtml += "<table class='score-table'>";
    sectionHtml += "<thead><tr><th>Metric</th><th>Score</th><th>Percentage</th></tr></thead><tbody>";

    if (scoreObj) {
        for (const [metric, score] of Object.entries(scoreObj)) {
            // For individual metrics, normalize based on the possible range for a single metric
            const singleMetricMax = totalDilemmas * 3;
            const singleMetricMin = totalDilemmas * -3;
            const normalizedScore = ((score - singleMetricMin) / (singleMetricMax - singleMetricMin)) * 100;
        
            sectionHtml += `<tr>
                <td>${capitalizeFirstLetter(metric)}</td>
                <td>${score}</td>
                <td>${normalizedScore.toFixed(2)}%</td>
            </tr>`;
            totalScore += score;
        
            // Add drill-down button for Flow Optimization
            if (metric === 'flowEfficiency' && title === 'Lean Leadership') {
                sectionHtml += `<tr><td colspan="3"><button class="flow-optimization-drill-down">Drill Down into Flow Optimization</button></td></tr>`;   
            }
        }
    }
    // Calculate overall percentage
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

//
// function createRadarChart ...
//

function createRadarChart(canvasId, labels, data, title) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: totalDilemmas * 3,
                    ticks: {
                        stepSize: totalDilemmas
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

//
// function capitalizeFirstLetter ...
//

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//
// function checkHRCode ...
//

function checkHRCode() {
    const inputCode = document.getElementById('hrCodeInput').value;
    if (inputCode === HR_SECRET_CODE) {
        showHRDetails();
    } else {
        alert("Incorrect HR code. Access denied.");
    }
}

//
// function startFlowOptimizationDrillDown 
//

function startFlowOptimizationDrillDown() {
    currentFlowQuestion = 0;
    flowOptimizationScore = 0;
    presentFlowOptimizationQuestion();
}

//
// function presentFlowOptimizationQuestion
//

function presentFlowOptimizationQuestion() {
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

//
// function answerFlowOptimizationQuestion
//

function answerFlowOptimizationQuestion(optionIndex) {
    const question = flowOptimizationQuestions[currentFlowQuestion];
    flowOptimizationScore += question.options[optionIndex].score;
    currentFlowQuestion++;
    presentFlowOptimizationQuestion();
}

//
// function showFlowOptimizationResults
//

function showFlowOptimizationResults() {
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

//
// function showHRDetails ...
//

function showHRDetails() {
    let hrResultHtml = "<h2><i class='fas fa-user-shield'></i> HR Detailed Assessment Results</h2>";
    
    const psychopathicPercentage = (scores.psychopathic / (totalDilemmas * 2)) * 100;
    hrResultHtml += `<p><strong>Psychopathic Tendency Score:</strong> ${scores.psychopathic} out of ${totalDilemmas * 2} (${psychopathicPercentage.toFixed(2)}%)</p>`;
    
    if (psychopathicPercentage > 70) {
        hrResultHtml += "<p><strong>Assessment:</strong> The participant's responses show a high level of psychopathic tendencies. Their decision-making demonstrates significant lack of empathy, manipulativeness, and disregard for others' wellbeing. This individual may pose serious risks in leadership positions.</p>";
    } else if (psychopathicPercentage > 40) {
        hrResultHtml += "<p><strong>Assessment:</strong> The participant's responses indicate moderate psychopathic tendencies. Their decisions often lack empathy and consideration for others. This could lead to problematic leadership behaviors and should be addressed.</p>";
    } else {
        hrResultHtml += "<p><strong>Assessment:</strong> The participant's responses do not indicate significant psychopathic tendencies. Their decision-making generally shows consideration for others and ethical principles.</p>";
    }

    hrResultHtml += "<p><strong>Recommendation:</strong> ";
    if (psychopathicPercentage > 60) {
        hrResultHtml += "Consider additional psychological evaluation before placing this individual in leadership roles. Close monitoring and mentoring may be necessary if already in a leadership position.</p>";
    } else if (psychopathicPercentage > 30) {
        hrResultHtml += "Provide training on empathy and ethical decision-making. Consider pairing with a mentor who demonstrates strong ethical leadership.</p>";
    } else {
        hrResultHtml += "No specific intervention needed regarding psychopathic tendencies. Continue to support and develop their ethical leadership skills.</p>";
    }

    document.getElementById('hrDetails').innerHTML = hrResultHtml;
    document.getElementById('hrDetails').style.display = 'block';
}

//
// Make necessary functions and variables available globally
//

window.startAssessment = startAssessment;
window.checkHRCode = checkHRCode;
window.makeChoice = makeChoice;  // If this is called from HTML
window.startFlowOptimizationDrillDown = startFlowOptimizationDrillDown;
window.answerFlowOptimizationQuestion = answerFlowOptimizationQuestion;

// If you have any initialization code, put it here
// For example, if you want to set up event listeners when the page loads

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for buttons
    document.getElementById('startButton').addEventListener('click', startAssessment);
    document.getElementById('hrAccessButton').addEventListener('click', checkHRCode);

    // Add event delegation for dynamically created buttons
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

    // Any other initialization code can go here
});






