// ======================================
// FlyDNA Renderer
// ======================================

function renderAggregate(data) {

    document.getElementById("fd-total").innerText =
        data.totalResponses || 0;

    document.getElementById("fd-intensity").innerText =
        (data.avgIntensity || 0) + " / 10";

    document.getElementById("fd-dominant").innerText =
        data.dominantEmotion || "-";

    const breakdown =
        document.getElementById("fd-breakdown");

    breakdown.innerHTML = "";

    if (!data.emotionBreakdown)
        return;

    const emotions =
        Object.entries(data.emotionBreakdown);

    emotions.sort((a, b) => b[1] - a[1]);

    emotions.forEach(([emotion, count]) => {

        const pct = Math.round(
            (count / data.totalResponses) * 100
        );

        breakdown.innerHTML += `

<div class="emotionRow">

    <div
        style="
        display:flex;
        justify-content:space-between;
        margin-bottom:4px;">

        <span>${emotion}</span>

        <strong>${pct}%</strong>

    </div>

    <div
        style="
        width:100%;
        height:10px;
        background:#2b2b38;
        border-radius:10px;
        overflow:hidden;">

        <div
            style="
            width:${pct}%;
            height:100%;
            background:linear-gradient(
                90deg,
                #3b82f6,
                #06b6d4
            );">

        </div>

    </div>

</div>

`;

    });

}
