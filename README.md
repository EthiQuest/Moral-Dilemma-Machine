# Moral Dilemma Machine

## Overview
The Moral Dilemma Machine is an interactive web application designed to assess ethical decision-making in leadership scenarios. It presents users with a series of moral dilemmas and evaluates their choices based on the Six Pillars of Character: Trustworthiness, Respect, Responsibility, Fairness, Caring, and Citizenship.

## Features
- Customizable number of scenarios (up to 50)
- Evaluation based on the Six Pillars of Character
- Visual representation of results using a radar chart
- Hidden HR assessment for psychopathic tendencies
- Mobile-friendly design

## How It Works
1. Users select the number of scenarios they want to face.
2. The app presents a series of moral dilemmas with multiple-choice answers.
3. Each choice impacts the user's score across the Six Pillars of Character.
4. After completing all scenarios, users receive a detailed assessment of their ethical leadership style.
5. Results are displayed both textually and visually through a radar chart.

## Technical Details
- Built with HTML, CSS, and JavaScript
- Uses Chart.js for data visualization
- Implements Progressive Web App (PWA) features for mobile use


## Structure Of The Repository

/app-root-directory 
│ 
├── /charts 
│   ├── createImpactChart.js 
│   └── createRadarChart.js 
│ 
├── /flowOptimization 
│   ├── answerFlowOptimizationQuestion.js
│   ├── presentFlowOptimizationQuestion.js
│   └── showFlowOptimizationResults.js
│
├── /modals
│   └── openModalWithDetails.js
│
├── /utils
│   ├── capitalizeFirstLetter.js
│   ├── createSectionHtml.js
│   └── resetScores.js
│
├── app.js
├── index.html
├── main.js
└── styles.css


## Installation
No installation required. Access the app through a web browser at [your-github-username].github.io/Moral-Dilemma-Machine

## Usage
1. Open the app in a web browser.
2. Choose the number of scenarios you want to face.
3. Read each scenario carefully and select your response.
4. After completing all scenarios, review your ethical leadership profile.

## For HR Professionals
There is a hidden feature for HR professionals to access a more detailed assessment, including potential psychopathic tendencies. To access this:
1. Complete the assessment.
2. On the results page, enter the code "HR1234" in the provided input field.

## Contributing
Contributions to improve the Moral Dilemma Machine are welcome. Please feel free to fork the repository and submit pull requests.

## License
MIT License 

## Contact
Søren Porskrog 
porskrog@flow.camp 
