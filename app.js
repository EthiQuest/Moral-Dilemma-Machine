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
    for (let pillar in pillars) {
        pillars[pillar] = 0;
    }

    psychopathicScore = 0;

    for (let score in leanScores) {
        leanScores[score] = 0;
    }
    for (let score in teamScores) {
        teamScores[score] = 0;
    }
}

function presentDilemma() {
    if (currentDilemma >= totalDilemmas) {
        showResults();
        return;
    }

    document.getElementById('progress').innerHTML = `<i class="fas fa-tasks"></i> Scenario ${currentDilemma + 1} of ${totalDilemmas}`;

    const dilemma = dilemmaPool[currentDilemma];
    document.getElementById('scenario').innerHTML = `<p><i class="fas fa-exclamation-circle"></i> ${dilemma.scenario}</p>`;
    const optionsHtml = dilemma.options.map((option, index) => 
        `<button ontouchstart="this.classList.add('active')" ontouchend="this.classList.remove('active');makeChoice(${index})" class="icon-text"><i class="fas fa-check-circle"></i> ${option.text}</button>`
    ).join('');
    document.getElementById('options').innerHTML = optionsHtml;
}

function makeChoice(choiceIndex) {
    const dilemma = dilemmaPool[currentDilemma];
    const chosenOption = dilemma.options[choiceIndex];
    for (const [pillar, score] of Object.entries(chosenOption.scores)) {
        pillars[pillar] += score;
    }

    psychopathicScore += chosenOption.psychopathic;

    for (const [leanScore, score] of Object.entries(chosenOption.scores)) {
        leanScores[leanScore] += score;
    }

    for (const [teamScore, score] of Object.entries(chosenOption.scores)) {
        teamScores[teamScore] += score;
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
    let resultHtml = "<h2><i class='fas fa-chart-bar'></i> Your Leadership Style Assessment:</h2>";
    let totalScore = 0;
    let chartData = [];
    
    const maxPossibleScore = totalDilemmas * 3;
    const minPossibleScore = totalDilemmas * -3;
    
    for (const [pillar, score] of Object.entries(pillars)) {
        const normalizedScore = ((score - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * 100;
        const percentage = normalizedScore.toFixed(2);
        resultHtml += `<p><i class="fas fa-star"></i> ${pillar}: ${score} (${percentage}%)</p>`;
        totalScore += score;
        chartData.push(parseFloat(percentage));
    }

    let overallPercentage = ((totalScore - (minPossibleScore * 6)) / ((maxPossibleScore - minPossibleScore) * 6)) * 100;
    let overallAssessment = "";
    if (overallPercentage > 80) {
        overallAssessment = "Your decisions demonstrate a very strong ethical leadership style.";
    } else if (overallPercentage > 60) {
        overallAssessment = "Your decisions show a good ethical leadership approach, with some room for improvement.";
    } else if (overallPercentage > 40) {
        overallAssessment = "Your decisions demonstrate a mixed ethical approach. There's significant room for improvement in ethical leadership.";
    } else if (overallPercentage > 20) {
        overallAssessment = "Your decisions often prioritize other factors over ethical considerations. This approach carries ethical risks in leadership.";
    } else {
        overallAssessment = "Your decisions consistently demonstrate a disregard for ethical leadership principles. This approach carries significant risks and is not recommended.";
    }

    resultHtml += `<p><strong><i class="fas fa-poll"></i> Overall Score:</strong> ${totalScore} (${overallPercentage.toFixed(2)}%)</p>`;
    resultHtml += `<p><strong><i class="fas fa-comment-alt"></i> Overall Assessment:</strong> ${overallAssessment}</p>`;

    let psychopathicPercentage = (psychopathicScore / (totalDilemmas * 2)) * 100;
    if (psychopathicPercentage > 70) {
        resultHtml += "<p><strong><i class='fas fa-exclamation-triangle'></i> Note:</strong> Your decision-making style shows a significant tendency towards detachment and self-interest, which may be perceived negatively in leadership roles.</p>";
    } else if (psychopathicPercentage > 40) {
        resultHtml += "<p><strong><i class='fas fa-info-circle'></i> Note:</strong> Your decisions sometimes reflect a lack of empathy or consideration for others, which could impact your effectiveness as a leader.</p>";
    }

    document.getElementById('result').innerHTML = resultHtml;
    document.getElementById('game').style.display = 'none';
    document.getElementById('hrAccess').style.display = 'block';

    createEthicalRadarChart(chartData);
    createLeanRadarChart();
    createTeamRadarChart();

    // Add textual results for new metrics
    resultHtml += "<h3>Lean Leadership and Flow:</h3>";
    for (const [metric, score] of Object.entries(leanScores)) {
        resultHtml += `<p><strong>${metric}:</strong> ${score}</p>`;
    }

    resultHtml += "<h3>Team and Psychological Safety:</h3>";
    for (const [metric, score] of Object.entries(teamScores)) {
        resultHtml += `<p><strong>${metric}:</strong> ${score}</p>`;
    }

    document.getElementById('result').innerHTML = resultHtml;
}
}

function createEthicalRadarChart(data) {
    const ctx = document.getElementById('ethicalRadarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Trustworthiness', 'Respect', 'Responsibility', 'Fairness', 'Caring', 'Citizenship'],
            datasets: [{
                label: 'Ethical Leadership Profile',
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
                    suggestedMax: 100
                }
            }
        }
    });
}

function createLeanRadarChart() {
    const ctx = document.getElementById('leanRadarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Value Stream Optimization', 'Continuous Improvement', 'Waste Reduction', 'Flow Efficiency'],
            datasets: [{
                label: 'Lean Leadership Profile',
                data: Object.values(leanScores),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
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
                    suggestedMax: 100
                }
            }
        }
    });
}

function createTeamRadarChart() {
    const ctx = document.getElementById('teamRadarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Psychological Safety', 'Conflict Resolution', 'Collaborative Culture', 'Employee Empowerment'],
            datasets: [{
                label: 'Team Leadership Profile',
                data: Object.values(teamScores),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
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
                    suggestedMax: 100
                }
            }
        }
    });
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
    
    let psychopathicPercentage = (psychopathicScore / (totalDilemmas * 2)) * 100;
    hrResultHtml += `<p><strong><i class='fas fa-brain'></i> Psychopathic Tendency Score:</strong> ${psychopathicScore} out of ${totalDilemmas * 2} (${psychopathicPercentage.toFixed(2)}%)</p>`;
    
    if (psychopathicPercentage > 70) {
        hrResultHtml += "<p><strong><i class='fas fa-exclamation-circle'></i> Assessment:</strong> The participant's responses show a high level of psychopathic tendencies. Their decision-making demonstrates significant lack of empathy, manipulativeness, and disregard for others' wellbeing. This individual may pose serious risks in leadership positions.</p>";
    } else if (psychopathicPercentage > 40) {
        hrResultHtml += "<p><strong><i class='fas fa-exclamation-triangle'></i> Assessment:</strong> The participant's responses indicate moderate psychopathic tendencies. Their decisions often lack empathy and consideration for others. This could lead to problematic leadership behaviors and should be addressed.</p>";
    } else {
        hrResultHtml += "<p><strong><i class='fas fa-check-circle'></i> Assessment:</strong> The participant's responses do not indicate significant psychopathic tendencies. Their decision-making generally shows consideration for others and ethical principles.</p>";
    }

    hrResultHtml += "<p><strong><i class='fas fa-clipboard-list'></i> Recommendation:</strong> ";
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