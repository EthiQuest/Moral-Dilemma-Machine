// dilemmas.js 

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

export default dilemmaPool;