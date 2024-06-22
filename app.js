const HR_SECRET_CODE = 'HR1234';
let currentDilemma = 0;
let totalDilemmas = 20;
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
    psychopathic: 0
};

const dilemmaPool = [
    {
        scenario: "Your team is consistently missing deadlines. How do you address this issue?",
        options: [
            {
                text: "Implement stricter monitoring and penalties for missed deadlines.",
                scores: {
                    pillars: { trustworthiness: 1, respect: -2, responsibility: 1, fairness: 0, caring: -2, citizenship: -1 },
                    lean: { valueStreamOptimization: -1, continuousImprovement: 0, wasteReduction: 1, flowEfficiency: -2 },
                    team: { psychologicalSafety: -3, conflictResolution: -2, collaborativeCulture: -2, employeeEmpowerment: -3 },
                    psychopathic: 1
                }
            },
            {
                text: "Conduct a team workshop to identify bottlenecks and improve processes.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 2, responsibility: 2, fairness: 2, caring: 2, citizenship: 2 },
                    lean: { valueStreamOptimization: 3, continuousImprovement: 3, wasteReduction: 2, flowEfficiency: 3 },
                    team: { psychologicalSafety: 2, conflictResolution: 2, collaborativeCulture: 3, employeeEmpowerment: 2 },
                    psychopathic: 0
                }
            },
            {
                text: "Extend all deadlines to ensure they're always met.",
                scores: {
                    pillars: { trustworthiness: -1, respect: 1, responsibility: -2, fairness: 0, caring: 1, citizenship: -1 },
                    lean: { valueStreamOptimization: -2, continuousImprovement: -1, wasteReduction: -2, flowEfficiency: -1 },
                    team: { psychologicalSafety: 1, conflictResolution: 0, collaborativeCulture: -1, employeeEmpowerment: -1 },
                    psychopathic: 1
                }
            }
        ]
    },
    {
        scenario: "A high-performing employee consistently undermines their colleagues. How do you address this?",
        options: [
            {
                text: "Ignore the behavior as long as their performance remains high.",
                scores: {
                    pillars: { trustworthiness: -2, respect: -2, responsibility: -1, fairness: -3, caring: -2, citizenship: -2 },
                    lean: { valueStreamOptimization: -1, continuousImprovement: -2, wasteReduction: 0, flowEfficiency: -2 },
                    team: { psychologicalSafety: -3, conflictResolution: -2, collaborativeCulture: -3, employeeEmpowerment: -1 },
                    psychopathic: 2
                }
            },
            {
                text: "Have a private conversation about the importance of teamwork and set clear expectations.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 2, responsibility: 2, fairness: 2, caring: 2, citizenship: 2 },
                    lean: { valueStreamOptimization: 1, continuousImprovement: 2, wasteReduction: 1, flowEfficiency: 2 },
                    team: { psychologicalSafety: 2, conflictResolution: 2, collaborativeCulture: 3, employeeEmpowerment: 1 },
                    psychopathic: 0
                }
            },
            {
                text: "Publicly reprimand the employee to set an example for others.",
                scores: {
                    pillars: { trustworthiness: 1, respect: -2, responsibility: 1, fairness: 0, caring: -2, citizenship: 0 },
                    lean: { valueStreamOptimization: 0, continuousImprovement: -1, wasteReduction: 0, flowEfficiency: -1 },
                    team: { psychologicalSafety: -2, conflictResolution: -1, collaborativeCulture: -2, employeeEmpowerment: -2 },
                    psychopathic: 1
                }
            }
        ]
    },
    {
        scenario: "You discover a minor flaw in a product that's about to ship. Fixing it would cause a significant delay. What do you do?",
        options: [
            {
                text: "Ship the product as is to meet the deadline.",
                scores: {
                    pillars: { trustworthiness: -2, respect: -1, responsibility: -2, fairness: -1, caring: -2, citizenship: -2 },
                    lean: { valueStreamOptimization: -1, continuousImprovement: -2, wasteReduction: 1, flowEfficiency: 2 },
                    team: { psychologicalSafety: -1, conflictResolution: 0, collaborativeCulture: -1, employeeEmpowerment: -1 },
                    psychopathic: 2
                }
            },
            {
                text: "Delay the shipment to fix the flaw, prioritizing quality.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 1, responsibility: 2, fairness: 2, caring: 2, citizenship: 2 },
                    lean: { valueStreamOptimization: 1, continuousImprovement: 2, wasteReduction: -1, flowEfficiency: -2 },
                    team: { psychologicalSafety: 2, conflictResolution: 1, collaborativeCulture: 1, employeeEmpowerment: 1 },
                    psychopathic: 0
                }
            },
            {
                text: "Ship the product but don't disclose the flaw to customers.",
                scores: {
                    pillars: { trustworthiness: -3, respect: -2, responsibility: -3, fairness: -2, caring: -3, citizenship: -3 },
                    lean: { valueStreamOptimization: 0, continuousImprovement: -3, wasteReduction: 1, flowEfficiency: 2 },
                    team: { psychologicalSafety: -2, conflictResolution: -1, collaborativeCulture: -2, employeeEmpowerment: -2 },
                    psychopathic: 3
                }
            }
        ]
    },
    {
        scenario: "An employee comes to you with an innovative idea that could streamline operations but would require significant changes. How do you respond?",
        options: [
            {
                text: "Dismiss the idea to avoid disrupting current processes.",
                scores: {
                    pillars: { trustworthiness: -1, respect: -2, responsibility: -1, fairness: -1, caring: -1, citizenship: -1 },
                    lean: { valueStreamOptimization: -2, continuousImprovement: -3, wasteReduction: -2, flowEfficiency: -2 },
                    team: { psychologicalSafety: -2, conflictResolution: 0, collaborativeCulture: -2, employeeEmpowerment: -3 },
                    psychopathic: 1
                }
            },
            {
                text: "Encourage the employee to develop a detailed proposal and implementation plan.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 2, responsibility: 2, fairness: 2, caring: 2, citizenship: 2 },
                    lean: { valueStreamOptimization: 2, continuousImprovement: 3, wasteReduction: 2, flowEfficiency: 2 },
                    team: { psychologicalSafety: 3, conflictResolution: 1, collaborativeCulture: 2, employeeEmpowerment: 3 },
                    psychopathic: 0
                }
            },
            {
                text: "Implement the idea immediately without further consultation.",
                scores: {
                    pillars: { trustworthiness: 0, respect: -1, responsibility: 1, fairness: -1, caring: 0, citizenship: 0 },
                    lean: { valueStreamOptimization: 1, continuousImprovement: 1, wasteReduction: 1, flowEfficiency: 1 },
                    team: { psychologicalSafety: 1, conflictResolution: -1, collaborativeCulture: -1, employeeEmpowerment: 1 },
                    psychopathic: 1
                }
            }
        ]
    },
    {
        scenario: "You notice that a colleague is struggling with their workload, affecting team performance. What action do you take?",
        options: [
            {
                text: "Do nothing, as it's not your responsibility to manage their work.",
                scores: {
                    pillars: { trustworthiness: -1, respect: -2, responsibility: -2, fairness: -1, caring: -3, citizenship: -2 },
                    lean: { valueStreamOptimization: -2, continuousImprovement: -2, wasteReduction: -2, flowEfficiency: -3 },
                    team: { psychologicalSafety: -2, conflictResolution: -2, collaborativeCulture: -3, employeeEmpowerment: -1 },
                    psychopathic: 2
                }
            },
            {
                text: "Offer to help and propose ways to redistribute the workload within the team.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 3, responsibility: 2, fairness: 2, caring: 3, citizenship: 3 },
                    lean: { valueStreamOptimization: 2, continuousImprovement: 2, wasteReduction: 2, flowEfficiency: 3 },
                    team: { psychologicalSafety: 3, conflictResolution: 2, collaborativeCulture: 3, employeeEmpowerment: 2 },
                    psychopathic: 0
                }
            },
            {
                text: "Report their underperformance to management for disciplinary action.",
                scores: {
                    pillars: { trustworthiness: 1, respect: -2, responsibility: 1, fairness: -1, caring: -2, citizenship: -1 },
                    lean: { valueStreamOptimization: -1, continuousImprovement: -1, wasteReduction: 0, flowEfficiency: -1 },
                    team: { psychologicalSafety: -3, conflictResolution: -2, collaborativeCulture: -2, employeeEmpowerment: -2 },
                    psychopathic: 1
                }
            }
        ]
    },
    {
        scenario: "Your team has been working overtime for weeks to meet a deadline. The client now wants to move the deadline up even further. How do you handle this?",
        options: [
            {
                text: "Agree to the new deadline without consulting your team.",
                scores: {
                    pillars: { trustworthiness: -1, respect: -3, responsibility: -2, fairness: -2, caring: -3, citizenship: -1 },
                    lean: { valueStreamOptimization: -2, continuousImprovement: -1, wasteReduction: -2, flowEfficiency: -2 },
                    team: { psychologicalSafety: -3, conflictResolution: -2, collaborativeCulture: -3, employeeEmpowerment: -3 },
                    psychopathic: 2
                }
            },
            {
                text: "Negotiate with the client for a more reasonable timeline, considering your team's wellbeing.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 3, responsibility: 2, fairness: 3, caring: 3, citizenship: 2 },
                    lean: { valueStreamOptimization: 2, continuousImprovement: 1, wasteReduction: 1, flowEfficiency: 2 },
                    team: { psychologicalSafety: 3, conflictResolution: 2, collaborativeCulture: 2, employeeEmpowerment: 2 },
                    psychopathic: 0
                }
            },
            {
                text: "Demand that your team works even longer hours to meet the new deadline.",
                scores: {
                    pillars: { trustworthiness: 0, respect: -2, responsibility: 1, fairness: -2, caring: -3, citizenship: -1 },
                    lean: { valueStreamOptimization: 1, continuousImprovement: -1, wasteReduction: -1, flowEfficiency: 0 },
                    team: { psychologicalSafety: -2, conflictResolution: -1, collaborativeCulture: -2, employeeEmpowerment: -2 },
                    psychopathic: 1
                }
            }
        ]
    },
    {
        scenario: "You discover that a team member has been falsifying their timesheet, claiming more hours than they've worked. How do you address this?",
        options: [
            {
                text: "Immediately terminate their employment without further investigation.",
                scores: {
                    pillars: { trustworthiness: 1, respect: -2, responsibility: 1, fairness: -1, caring: -2, citizenship: 0 },
                    lean: { valueStreamOptimization: -1, continuousImprovement: -1, wasteReduction: 1, flowEfficiency: -1 },
                    team: { psychologicalSafety: -2, conflictResolution: -2, collaborativeCulture: -1, employeeEmpowerment: -1 },
                    psychopathic: 1
                }
            },
            {
                text: "Investigate the situation, discuss it with the employee, and give them a chance to explain.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 2, responsibility: 2, fairness: 3, caring: 2, citizenship: 2 },
                    lean: { valueStreamOptimization: 1, continuousImprovement: 2, wasteReduction: 1, flowEfficiency: 1 },
                    team: { psychologicalSafety: 2, conflictResolution: 3, collaborativeCulture: 2, employeeEmpowerment: 1 },
                    psychopathic: 0
                }
            },
            {
                text: "Ignore the issue to avoid conflict and maintain team stability.",
                scores: {
                    pillars: { trustworthiness: -3, respect: -1, responsibility: -3, fairness: -3, caring: -1, citizenship: -2 },
                    lean: { valueStreamOptimization: -2, continuousImprovement: -2, wasteReduction: -2, flowEfficiency: -1 },
                    team: { psychologicalSafety: -1, conflictResolution: -2, collaborativeCulture: -2, employeeEmpowerment: -1 },
                    psychopathic: 2
                }
            }
        ]
    },
    {
        scenario: "Your company is considering outsourcing a department to cut costs, which would result in layoffs. You have inside information about this. How do you handle it?",
        options: [
            {
                text: "Keep the information confidential as instructed by upper management.",
                scores: {
                    pillars: { trustworthiness: 1, respect: -1, responsibility: 1, fairness: -2, caring: -2, citizenship: -1 },
                    lean: { valueStreamOptimization: 0, continuousImprovement: -1, wasteReduction: 1, flowEfficiency: 0 },
                    team: { psychologicalSafety: -2, conflictResolution: -1, collaborativeCulture: -2, employeeEmpowerment: -2 },
                    psychopathic: 1
                }
            },
            {
                text: "Discreetly warn the affected employees so they can prepare.",
                scores: {
                    pillars: { trustworthiness: -1, respect: 2, responsibility: -1, fairness: 1, caring: 3, citizenship: 1 },
                    lean: { valueStreamOptimization: -1, continuousImprovement: 0, wasteReduction: -1, flowEfficiency: -1 },
                    team: { psychologicalSafety: 1, conflictResolution: 0, collaborativeCulture: 1, employeeEmpowerment: 2 },
                    psychopathic: 0
                }
            },
            {
                text: "Argue against the outsourcing decision, presenting the value of keeping the department in-house.",
                scores: {
                    pillars: { trustworthiness: 2, respect: 2, responsibility: 2, fairness: 2, caring: 2, citizenship: 3 },
                    lean: { valueStreamOptimization: 1, continuousImprovement: 2, wasteReduction: 0, flowEfficiency: 1 },
                    team: { psychologicalSafety: 2, conflictResolution: 1, collaborativeCulture: 2, employeeEmpowerment: 2 },
                    psychopathic: 0
                }
            }
        ]
    },
    // Add more dilemmas here...
];

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

function presentDilemma() {
    if (currentDilemma >= totalDilemmas) {
        showResults();
        return;
    }

    document.getElementById('progress').innerHTML = `<i class="fas fa-tasks"></i> Scenario ${currentDilemma + 1} of ${totalDilemmas}`;

    const dilemma = dilemmaPool[currentDilemma % dilemmaPool.length];
    document.getElementById('scenario').innerHTML = `<p><i class="fas fa-exclamation-circle"></i> ${dilemma.scenario}</p>`;
    const optionsHtml = dilemma.options.map((option, index) => 
        `<button ontouchstart="this.classList.add('active')" ontouchend="this.classList.remove('active');makeChoice(${index})" class="icon-text"><i class="fas fa-check-circle"></i> ${option.text}</button>`
    ).join('');
    document.getElementById('options').innerHTML = optionsHtml;
}

function makeChoice(choiceIndex) {
    const dilemma = dilemmaPool[currentDilemma % dilemmaPool.length];
    const chosenOption = dilemma.options[choiceIndex];
    
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
}


function showResults() {
    console.log("Showing results");
    let resultHtml = "<h2><i class='fas fa-chart-bar'></i> Your Leadership Style Assessment</h2>";

    // Ethical Leadership Section
    resultHtml += createSectionHtml("Ethical Leadership", scores.pillars, 'radarChart');

    // Lean Leadership Section
    resultHtml += createSectionHtml("Lean Leadership", scores.lean, 'leanRadarChart');

    // Team Leadership Section
    resultHtml += createSectionHtml("Team Leadership", scores.team, 'teamRadarChart');

    // Psychopathic Tendency
    const psychopathicPercentage = (scores.psychopathic / (totalDilemmas * 2)) * 100;
    resultHtml += "<h3>Psychopathic Tendency</h3>";
    resultHtml += `<p><strong>Score:</strong> ${scores.psychopathic} out of ${totalDilemmas * 2} (${psychopathicPercentage.toFixed(2)}%)</p>`;
    if (psychopathicPercentage > 70) {
        resultHtml += "<p><strong><i class='fas fa-exclamation-triangle'></i> Note:</strong> Your decision-making style shows a significant tendency towards detachment and self-interest, which may be perceived negatively in leadership roles.</p>";
    } else if (psychopathicPercentage > 40) {
        resultHtml += "<p><strong><i class='fas fa-info-circle'></i> Note:</strong> Your decisions sometimes reflect a lack of empathy or consideration for others, which could impact your effectiveness as a leader.</p>";
    } else {
        resultHtml += "<p><strong><i class='fas fa-check-circle'></i> Note:</strong> Your decisions generally reflect empathy and consideration for others, which is positive for leadership roles.</p>";
    }

    document.getElementById('result').innerHTML = resultHtml;
    document.getElementById('game').style.display = 'none';
    document.getElementById('hrAccess').style.display = 'block';

    createRadarChart('radarChart', Object.keys(scores.pillars), Object.values(scores.pillars), 'Ethical Leadership Profile');
    createRadarChart('leanRadarChart', Object.keys(scores.lean), Object.values(scores.lean), 'Lean Leadership Profile');
    createRadarChart('teamRadarChart', Object.keys(scores.team), Object.values(scores.team), 'Team Leadership Profile');
}

function createSectionHtml(title, scoreObj, chartId) {
    let sectionHtml = `<h3>${title}</h3>`;
    let totalScore = 0;
    const maxPossibleScore = totalDilemmas * 3 * Object.keys(scoreObj).length;

    for (const [metric, score] of Object.entries(scoreObj)) {
        const normalizedScore = ((score + totalDilemmas * 3) / (totalDilemmas * 6)) * 100;
        sectionHtml += `<p><strong>${metric}:</strong> ${score} (${normalizedScore.toFixed(2)}%)</p>`;
        totalScore += score;
    }

    const overallPercentage = ((totalScore + maxPossibleScore / 2) / maxPossibleScore) * 100;
    sectionHtml += `<p><strong>Overall ${title} Score:</strong> ${totalScore} out of ${maxPossibleScore} (${overallPercentage.toFixed(2)}%)</p>`;
    sectionHtml += `<canvas id="${chartId}" width="400" height="400"></canvas>`;

    return sectionHtml;
}

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
                    suggestedMin: -totalDilemmas * 3,
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkHRCode() {
    const inputCode = document.getElementById('hrCodeInput').value;
    if (inputCode === HR_SECRET_CODE) {
        showHRDetails();
    } else {
        alert("Incorrect HR code. Access denied.");
    }
}

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