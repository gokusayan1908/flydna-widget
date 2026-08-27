// ======================================
// FlyDNA Renderer
// ======================================

function renderAggregate(data) {

    const total = document.getElementById("fd-total");
    const intensity = document.getElementById("fd-intensity");
    const dominant = document.getElementById("fd-dominant");
    const emotions = document.getElementById("fd-breakdown");

    if (!total) return;

    total.textContent = data.totalResponses ?? 0;
    intensity.textContent = data.avgIntensity ?? 0;
    dominant.textContent = data.dominantEmotion || "-";

    emotions.innerHTML = "";

    if (!data.emotionBreakdown) return;

    Object.entries(data.emotionBreakdown).forEach(([emotion, value]) => {

        const row = document.createElement("div");
        row.className = "emotionRow";

        row.innerHTML = `
            <span>${emotion}</span>
            <span>${value}</span>
        `;

        emotions.appendChild(row);

    });

}
