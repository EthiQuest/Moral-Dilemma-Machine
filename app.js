const HR_SECRET_CODE = 'HR1234';
let currentDilemma = 0;
let totalDilemmas = 20;
const pillars = {
    "Trustworthiness": 0,
    "Respect": 0,
    "Responsibility": 0,
    "Fairness": 0,
    "Caring": 0,
    "Citizenship": 0
};
let psychopathicScore = 0;

const dilemmaPool = [
    {
        scenario: "An employee consistently arrives late but produces high-quality work. How do you respond?",
        options: [
            {
                text: "Strictly enforce punctuality rules and issue a formal warning.",
                scores: { Trustworthiness: 2, Respect: -1, Responsibility: 2, Fairness: 1, Caring: -2, Citizenship: 0 },
                psychopathic: 1
            },
            {
                text: "Have a private conversation to understand the reasons and find a solution.",
                scores: { Trustworthiness: 1, Respect: 3, Responsibility: 1, Fairness: 0, Caring: 3, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Ignore the tardiness as long as work quality remains high.",
                scores: { Trustworthiness: -2, Respect: 1, Responsibility: -3, Fairness: -2, Caring: 0, Citizenship: -1 },
                psychopathic: 2
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
}

function presentDilemma() {
    if (currentDilemma >= totalDilemmas) {
        showResults();
        return;
    }

    document.getElementById('progress').innerHTML = `Scenario ${currentDilemma + 1} of ${totalDilemmas}`;

    const dilemma = dilemmaPool[currentDilemma];
    document.getElementById('scenario').innerHTML = `<p>${dilemma.scenario}</p>`;
    const optionsHtml = dilemma.options.map((option, index) => 
        `<button ontouchstart="this.classList.add('active')" ontouchend="this.classList.remove('active');makeChoice(${index})">${option.text}</button>`
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
    currentDilemma++;
    
    if (currentDilemma >= totalDilemmas) {
        showResults();
    } else {
        presentDilemma();
    }
}

function showResults() {
    console.log("Showing results");
    let resultHtml = "<h2>Your Leadership Style Assessment:</h2>";
    let totalScore = 0;
    let chartData = [];
    
    const maxPossibleScore = totalDilemmas * 3;
    const minPossibleScore = totalDilemmas * -3;
    
    for (const [pillar, score] of Object.entries(pillars)) {
        const normalizedScore = ((score - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * 100;
        const percentage = normalizedScore.toFixed(2);
        resultHtml += `<p>${pillar}: ${score} (${percentage}%)</p>`;
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

    resultHtml += `<p><strong>Overall Score:</strong> ${totalScore} (${overallPercentage.toFixed(2)}%)</p>`;
    resultHtml += `<p><strong>Overall Assessment:</strong> ${overallAssessment}</p>`;

    let psychopathicPercentage = (psychopathicScore / (totalDilemmas * 2)) * 100;
    if (psychopathicPercentage > 70) {
        resultHtml += "<p><strong>Note:</strong> Your decision-making style shows a significant tendency towards detachment and self-interest, which may be perceived negatively in leadership roles.</p>";
    } else if (psychopathicPercentage > 40) {
        resultHtml += "<p><strong>Note:</strong> Your decisions sometimes reflect a lack of empathy or consideration for others, which could impact your effectiveness as a leader.</p>";
    }

    document.getElementById('result').innerHTML = resultHtml;
    document.getElementById('game').style.display = 'none';
    document.getElementById('hrAccess').style.display = 'block';

    createRadarChart(chartData);
}

function createRadarChart(data) {
    const ctx = document.getElementById('radarChart').getContext('2d');
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

function checkHRCode() {
    const inputCode = document.getElementById('hrCodeInput').value;
    if (inputCode === HR_SECRET_CODE) {
        showHRDetails();
    } else {
        alert("Incorrect HR code. Access denied.");
    }
}

function showHRDetails() {
    let hrResultHtml = "<h2>HR Detailed Assessment Results</h2>";
    
    let psychopathicPercentage = (psychopathicScore / (totalDilemmas * 2)) * 100;
    hrResultHtml += `<p><strong>Psychopathic Tendency Score:</strong> ${psychopathicScore} out of ${totalDilemmas * 2} (${psychopathicPercentage.toFixed(2)}%)</p>`;
    
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