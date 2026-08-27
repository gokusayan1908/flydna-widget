// ======================================
// FlyDNA Emotions v1.1
// ======================================

const emotions = [

    {
        name: "Love",
        emoji: "❤️"
    },

    {
        name: "Energy",
        emoji: "⚡"
    },

    {
        name: "Joy",
        emoji: "😊"
    },

    {
        name: "Sadness",
        emoji: "😢"
    },

    {
        name: "Nostalgia",
        emoji: "🌌"
    },

    {
        name: "Passion",
        emoji: "🔥"
    },

    {
        name: "Peace",
        emoji: "🕊️"
    },

    {
        name: "Hope",
        emoji: "✨"
    },

    {
        name: "Celebration",
        emoji: "🎉"
    },

    {
        name: "Cinematic",
        emoji: "🎬"
    }

];

let selectedEmotions = [];

// ======================================
// Render emotions
// ======================================

function renderEmotions() {

    const container =
        document.getElementById("emotionContainer");

    if (!container) {

        console.error(
            "FlyDNA: emotionContainer not found"
        );

        return;

    }

    // ----------------------------------
    // Compact responsive grid
    // ----------------------------------

    container.style.setProperty(
        "display",
        "grid",
        "important"
    );

    container.style.setProperty(
        "grid-template-columns",
        "repeat(auto-fit, minmax(130px, 1fr))",
        "important"
    );

    container.style.setProperty(
        "gap",
        "10px",
        "important"
    );

    container.style.setProperty(
        "width",
        "100%",
        "important"
    );

    container.style.setProperty(
        "box-sizing",
        "border-box",
        "important"
    );

    container.innerHTML = "";

    selectedEmotions = [];

    updateEmotionCounter();

    emotions.forEach((emotion) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "emotion-btn";

        button.dataset.emotion =
            emotion.name;

        button.setAttribute(
            "aria-pressed",
            "false"
        );

        // ----------------------------------
        // Content
        // ----------------------------------

        button.innerHTML = `
            <span class="emotion-emoji">
                ${emotion.emoji}
            </span>

            <span class="emotion-name">
                ${emotion.name}
            </span>
        `;

        // ----------------------------------
        // Force compact dimensions
        // ----------------------------------

        button.style.setProperty(
            "width",
            "100%",
            "important"
        );

        button.style.setProperty(
            "min-width",
            "0",
            "important"
        );

        button.style.setProperty(
            "height",
            "50px",
            "important"
        );

        button.style.setProperty(
            "padding",
            "8px 12px",
            "important"
        );

        button.style.setProperty(
            "box-sizing",
            "border-box",
            "important"
        );

        button.style.setProperty(
            "display",
            "flex",
            "important"
        );

        button.style.setProperty(
            "align-items",
            "center",
            "important"
        );

        button.style.setProperty(
            "justify-content",
            "center",
            "important"
        );

        button.style.setProperty(
            "gap",
            "7px",
            "important"
        );

        button.style.setProperty(
            "border-radius",
            "12px",
            "important"
        );

        button.style.setProperty(
            "border",
            "1px solid rgba(255,255,255,0.10)",
            "important"
        );

        button.style.setProperty(
            "background",
            "rgba(255,255,255,0.045)",
            "important"
        );

        button.style.setProperty(
            "color",
            "#ffffff",
            "important"
        );

        button.style.setProperty(
            "font-size",
            "14px",
            "important"
        );

        button.style.setProperty(
            "font-weight",
            "500",
            "important"
        );

        button.style.setProperty(
            "cursor",
            "pointer",
            "important"
        );

        button.style.setProperty(
            "transition",
            "all 0.2s ease",
            "important"
        );

        // ----------------------------------
        // Click
        // ----------------------------------

        button.addEventListener(
            "click",
            function () {

                const index =
                    selectedEmotions.indexOf(
                        emotion.name
                    );

                console.log(
                    "FlyDNA emotion clicked:",
                    emotion.name
                );

                // ------------------------------
                // Deselect
                // ------------------------------

                if (index !== -1) {

                    selectedEmotions.splice(
                        index,
                        1
                    );

                    setButtonState(
                        button,
                        emotion,
                        false
                    );

                    updateEmotionCounter();

                    console.log(
                        "FlyDNA selected emotions:",
                        selectedEmotions
                    );

                    return;

                }

                // ------------------------------
                // Maximum 3
                // ------------------------------

                if (
                    selectedEmotions.length >= 3
                ) {

                    console.log(
                        "FlyDNA: maximum of 3 emotions reached"
                    );

                    button.animate(
                        [
                            {
                                transform:
                                    "translateX(-4px)"
                            },

                            {
                                transform:
                                    "translateX(4px)"
                            },

                            {
                                transform:
                                    "translateX(-4px)"
                            },

                            {
                                transform:
                                    "translateX(0)"
                            }
                        ],
                        {
                            duration: 180
                        }
                    );

                    return;

                }

                // ------------------------------
                // Select
                // ------------------------------

                selectedEmotions.push(
                    emotion.name
                );

                setButtonState(
                    button,
                    emotion,
                    true
                );

                updateEmotionCounter();

                console.log(
                    "FlyDNA selected emotions:",
                    selectedEmotions
                );

            }
        );

        container.appendChild(button);

    });

    console.log(
        "FlyDNA emotions rendered:",
        emotions.length
    );

}

// ======================================
// Button state
// ======================================

function setButtonState(
    button,
    emotion,
    selected
) {

    const emoji =
        selected
            ? "✓ " + emotion.emoji
            : emotion.emoji;

    button.innerHTML = `
        <span class="emotion-emoji">
            ${emoji}
        </span>

        <span class="emotion-name">
            ${emotion.name}
        </span>
    `;

    button.setAttribute(
        "aria-pressed",
        selected
            ? "true"
            : "false"
    );

    if (selected) {

        button.style.setProperty(
            "background",
            "linear-gradient(135deg, #2563eb, #7c3aed)",
            "important"
        );

        button.style.setProperty(
            "border",
            "1px solid rgba(255,255,255,0.7)",
            "important"
        );

        button.style.setProperty(
            "box-shadow",
            "0 0 0 2px rgba(124,58,237,0.25)",
            "important"
        );

        button.style.setProperty(
            "transform",
            "scale(1.02)",
            "important"
        );

        button.style.setProperty(
            "font-weight",
            "700",
            "important"
        );

    } else {

        button.style.setProperty(
            "background",
            "rgba(255,255,255,0.045)",
            "important"
        );

        button.style.setProperty(
            "border",
            "1px solid rgba(255,255,255,0.10)",
            "important"
        );

        button.style.setProperty(
            "box-shadow",
            "none",
            "important"
        );

        button.style.setProperty(
            "transform",
            "scale(1)",
            "important"
        );

        button.style.setProperty(
            "font-weight",
            "500",
            "important"
        );

    }

}

// ======================================
// Emotion counter
// ======================================

function updateEmotionCounter() {

    const counter =
        document.getElementById(
            "emotionCounter"
        );

    if (!counter) return;

    const count =
        selectedEmotions.length;

    counter.textContent =
        `${count} / 3 selected`;

}
