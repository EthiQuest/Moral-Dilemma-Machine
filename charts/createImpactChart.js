import { openModalWithDetails } from '../modals/openModalWithDetails.js';

export function createImpactChart(canvasId, impacts, pillars) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const datasets = impacts.map((impact, index) => ({
        label: `Q${index + 1}`,
        data: pillars.map(pillar => impact.impacts[pillar] || 0),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
    }));

    const impactChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pillars,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
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
        }
    });

    ctx.canvas.addEventListener('click', function(evt) {
        const points = impactChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        if (points.length) {
            const firstPoint = points[0];
            const selectedIndex = firstPoint.datasetIndex;
            openModalWithDetails(selectedIndex);
        }
    });
}