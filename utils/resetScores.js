import { scores } from '../scores.js';

export function resetScores() {
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