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
    {
        scenario: "You discover a minor accounting error that would increase profits if left uncorrected. What do you do?",
        options: [
            {
                text: "Correct the error immediately, even if it reduces profits.",
                scores: { Trustworthiness: 3, Respect: 1, Responsibility: 3, Fairness: 3, Caring: 1, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Ignore the error since it benefits the company and is unlikely to be noticed.",
                scores: { Trustworthiness: -3, Respect: 0, Responsibility: -2, Fairness: -3, Caring: -1, Citizenship: -2 },
                psychopathic: 2
            },
            {
                text: "Consult with your team before making a decision.",
                scores: { Trustworthiness: 1, Respect: 2, Responsibility: 1, Fairness: 1, Caring: 1, Citizenship: 2 },
                psychopathic: 0
            }
        ]
    },
    {
        scenario: "A talented employee asks for a raise you know the company can't afford. How do you handle it?",
        options: [
            {
                text: "Deny the raise but offer other non-monetary benefits.",
                scores: { Trustworthiness: 1, Respect: 1, Responsibility: 2, Fairness: 1, Caring: 1, Citizenship: 1 },
                psychopathic: 0
            },
            {
                text: "Lie about the company's financial situation to avoid conflict.",
                scores: { Trustworthiness: -3, Respect: -1, Responsibility: -2, Fairness: -2, Caring: -1, Citizenship: -1 },
                psychopathic: 2
            },
            {
                text: "Be honest about the situation and risk losing the employee.",
                scores: { Trustworthiness: 3, Respect: 2, Responsibility: 2, Fairness: 2, Caring: 0, Citizenship: 1 },
                psychopathic: 0
            }
        ]
    },
    {
        scenario: "You overhear a racist comment from a high-performing employee. What action do you take?",
        options: [
            {
                text: "Immediately confront the employee and issue a warning.",
                scores: { Trustworthiness: 2, Respect: 2, Responsibility: 3, Fairness: 3, Caring: 1, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Ignore it to avoid conflict with a valuable team member.",
                scores: { Trustworthiness: -2, Respect: -3, Responsibility: -3, Fairness: -3, Caring: -2, Citizenship: -3 },
                psychopathic: 2
            },
            {
                text: "Organize a company-wide diversity training without singling anyone out.",
                scores: { Trustworthiness: 1, Respect: 2, Responsibility: 1, Fairness: 1, Caring: 2, Citizenship: 3 },
                psychopathic: 0
            }
        ]
    },
    {
        scenario: "A client asks you to lie to their stakeholders about project progress. How do you respond?",
        options: [
            {
                text: "Refuse and explain that it goes against your ethical principles.",
                scores: { Trustworthiness: 3, Respect: 1, Responsibility: 3, Fairness: 3, Caring: 1, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Agree to avoid losing the client's business.",
                scores: { Trustworthiness: -3, Respect: -1, Responsibility: -3, Fairness: -3, Caring: -1, Citizenship: -2 },
                psychopathic: 2
            },
            {
                text: "Suggest an alternative that doesn't involve lying but still addresses their concerns.",
                scores: { Trustworthiness: 2, Respect: 2, Responsibility: 2, Fairness: 2, Caring: 2, Citizenship: 2 },
                psychopathic: 0
            }
        ]
    },
    {
        scenario: "You notice a colleague taking office supplies home for personal use. What do you do?",
        options: [
            {
                text: "Report the colleague to management immediately.",
                scores: { Trustworthiness: 2, Respect: -1, Responsibility: 3, Fairness: 2, Caring: -1, Citizenship: 1 },
                psychopathic: 1
            },
            {
                text: "Confront the colleague privately and ask them to stop.",
                scores: { Trustworthiness: 2, Respect: 2, Responsibility: 2, Fairness: 2, Caring: 2, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Ignore it as it's a minor issue.",
                scores: { Trustworthiness: -2, Respect: 0, Responsibility: -2, Fairness: -2, Caring: 0, Citizenship: -1 },
                psychopathic: 1
            }
        ]
    },
    {
        scenario: "Your company is considering outsourcing jobs to cut costs, potentially leading to local layoffs. What's your stance?",
        options: [
            {
                text: "Support outsourcing to improve company profits and competitiveness.",
                scores: { Trustworthiness: 0, Respect: -2, Responsibility: 1, Fairness: -2, Caring: -3, Citizenship: -2 },
                psychopathic: 2
            },
            {
                text: "Oppose outsourcing and advocate for finding internal efficiency improvements.",
                scores: { Trustworthiness: 1, Respect: 2, Responsibility: 1, Fairness: 2, Caring: 3, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Suggest a gradual transition with support for affected employees.",
                scores: { Trustworthiness: 2, Respect: 1, Responsibility: 2, Fairness: 1, Caring: 2, Citizenship: 1 },
                psychopathic: 1
            }
        ]
    },
    {
        scenario: "You discover that a popular product your company sells has a potential safety issue. How do you proceed?",
        options: [
            {
                text: "Immediately halt sales and issue a public recall.",
                scores: { Trustworthiness: 3, Respect: 2, Responsibility: 3, Fairness: 2, Caring: 3, Citizenship: 3 },
                psychopathic: 0
            },
            {
                text: "Quietly fix the issue in future production without a public announcement.",
                scores: { Trustworthiness: -2, Respect: -1, Responsibility: -1, Fairness: -2, Caring: -2, Citizenship: -2 },
                psychopathic: 2
            },
            {
                text: "Conduct more testing before making a decision.",
                scores: { Trustworthiness: 1, Respect: 1, Responsibility: 1, Fairness: 1, Caring: 1, Citizenship: 1 },
                psychopathic: 1
            }
        ]
    },
    {
        scenario: "An employee is struggling with mental health issues affecting their work. How do you address this?",
        options: [
            {
                text: "Begin the process of terminating their employment.",
                scores: { Trustworthiness: 1, Respect: -3, Responsibility: 1, Fairness: -2, Caring: -3, Citizenship: -2 },
                psychopathic: 2
            },
            {
                text: "Offer support and resources, and temporarily reassign some duties.",
                scores: { Trustworthiness: 1, Respect: 3, Responsibility: 1, Fairness: 1, Caring: 3, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Maintain performance expectations but extend deadlines.",
                scores: { Trustworthiness: 2, Respect: 1, Responsibility: 2, Fairness: 2, Caring: 1, Citizenship: 1 },
                psychopathic: 1
            }
        ]
    },
    {
        scenario: "You have inside information that your company's stock will likely drop. What do you do?",
        options: [
            {
                text: "Sell your company stock before the drop.",
                scores: { Trustworthiness: -3, Respect: -1, Responsibility: -3, Fairness: -3, Caring: -1, Citizenship: -2 },
                psychopathic: 2
            },
            {
                text: "Hold your stock and don't act on the information.",
                scores: { Trustworthiness: 3, Respect: 1, Responsibility: 3, Fairness: 3, Caring: 1, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Quietly advise close colleagues to sell their stock.",
                scores: { Trustworthiness: -2, Respect: 1, Responsibility: -2, Fairness: -2, Caring: 1, Citizenship: -1 },
                psychopathic: 1
            }
        ]
    },
    {
        scenario: "You notice a colleague is struggling with addiction, affecting their work. What action do you take?",
        options: [
            {
                text: "Report them to HR immediately.",
                scores: { Trustworthiness: 1, Respect: -1, Responsibility: 2, Fairness: 1, Caring: 0, Citizenship: 1 },
                psychopathic: 1
            },
            {
                text: "Approach them privately and offer support and resources.",
                scores: { Trustworthiness: 2, Respect: 3, Responsibility: 2, Fairness: 1, Caring: 3, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Ignore it as it's not your responsibility.",
                scores: { Trustworthiness: -1, Respect: -2, Responsibility: -2, Fairness: -1, Caring: -3, Citizenship: -2 },
                psychopathic: 2
            }
        ]
    },
    {
        scenario: "A whistleblower in your department reports unethical practices. How do you handle this?",
        options: [
            {
                text: "Fully support the investigation and protect the whistleblower's identity.",
                scores: { Trustworthiness: 3, Respect: 2, Responsibility: 3, Fairness: 3, Caring: 2, Citizenship: 3 },
                psychopathic: 0
            },
            {
                text: "Conduct an internal investigation without involving higher management.",
                scores: { Trustworthiness: 1, Respect: 1, Responsibility: 1, Fairness: 1, Caring: 1, Citizenship: 1 },
                psychopathic: 1
            },
            {
                text: "Discourage the whistleblower and try to minimize the issue.",
                scores: { Trustworthiness: -3, Respect: -2, Responsibility: -3, Fairness: -3, Caring: -2, Citizenship: -3 },
                psychopathic: 2
            }
        ]
    },
    {
        scenario: "Your company is considering a merger that would lead to job losses. You're asked to keep it confidential. What do you do?",
        options: [
            {
                text: "Maintain strict confidentiality as requested.",
                scores: { Trustworthiness: 3, Respect: 1, Responsibility: 2, Fairness: 0, Caring: -1, Citizenship: 1 },
                psychopathic: 1
            },
            {
                text: "Inform your team to allow them to prepare for potential job losses.",
                scores: { Trustworthiness: -2, Respect: 2, Responsibility: -1, Fairness: 1, Caring: 2, Citizenship: 1 },
                psychopathic: 0
            },
            {
                text: "Leak the information anonymously to the press.",
                scores: { Trustworthiness: -3, Respect: -1, Responsibility: -2, Fairness: 1, Caring: 1, Citizenship: -1 },
                psychopathic: 2
            }
        ]
    },
    {
        scenario: "A team member proposes an idea that you know is yours from a previous job. How do you respond?",
        options: [
            {
                text: "Confront the team member about stealing your idea.",
                scores: { Trustworthiness: 1, Respect: -2, Responsibility: 1, Fairness: 1, Caring: -2, Citizenship: -1 },
                psychopathic: 1
            },
            {
                text: "Quietly support the idea without mentioning its origin.",
                scores: { Trustworthiness: 1, Respect: 2, Responsibility: 1, Fairness: 1, Caring: 2, Citizenship: 2 },
                psychopathic: 0
            },
            {
                text: "Claim credit for the idea yourself.",
                scores: { Trustworthiness: -2, Respect: -2, Responsibility: -1, Fairness: -2, Caring: -2, Citizenship: -2 },
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