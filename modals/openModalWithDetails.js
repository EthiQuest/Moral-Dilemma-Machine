export function openModalWithDetails(questionIndex) {
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