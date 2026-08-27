// ======================================
// FlyDNA Application
// ======================================

const params = new URLSearchParams(window.location.search);

const TRACK_ID = params.get("track") || "unknown";
const TRACK_TITLE = decodeURIComponent(params.get("title") || "Unknown Track");
const SOURCE = params.get("source") || "music";

window.onload = () => {

    document.getElementById("app").innerHTML = `

<div class="flydna-card">

<h1>🧬 FlyDNA</h1>

<div class="subtitle">

How did this track make you feel?

</div>

<div class="section">

<h2>${TRACK_TITLE}</h2>

</div>

<div class="section">

<h2>Intensity</h2>

<div class="intensityValue" id="intensityValue">5</div>

<div class="slider">

<input
type="range"
id="intensity"
min="1"
max="10"
value="5">

</div>

</div>

<div class="section">

<h2>Emotions</h2>

<div
id="emotionContainer"
class="emotions">

</div>

</div>

<button id="submitBtn">

Submit my FlyDNA

</button>

<div class="stats">

<div class="stat">

<span>Total Responses</span>

<strong id="fd-total">0</strong>

</div>

<div class="stat">

<span>Average Intensity</span>

<strong id="fd-intensity">0</strong>

</div>

<div class="stat">

<span>Dominant Emotion</span>

<strong id="fd-dominant">-</strong>

</div>

<div id="fd-breakdown"></div>

</div>

</div>

`;

    renderEmotions();

    const slider = document.getElementById("intensity");

    slider.oninput = () => {

        document.getElementById("intensityValue").innerHTML = slider.value;

    };

    document
        .getElementById("submitBtn")
        .onclick = () => {

            submitVote({

                trackId: TRACK_ID,

                title: TRACK_TITLE,

                source: SOURCE,

                intensity: Number(slider.value),

                emotions: selectedEmotions

            });

        };

    requestAggregate(TRACK_ID, SOURCE);

};
