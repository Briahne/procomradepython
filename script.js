// Game chapters mapped perfectly to Automate the Boring Stuff patterns
const matrixChapters = [
    {
        id: 1,
        title: "Chapter 1: Python Basics & Math Operators",
        readingText: `
            <p><strong>The Core Logic:</strong> Programming is simply entering instructions for your machine to process. In Python, math expressions reduce complex lines down to a single value. Every operation uses strict precedence constraints similar to normal algebra rules.</p>
            <div class="sitcom-example">
                <h4>🎬 Sitcom Case Ledger: The Bad Math Broker</h4>
                <p>Imagine you are trying to calculate the remainder of change after splitting a ledger cash pool among your local crew. Instead of manually breaking your head, you fire up the Python interactive shell.</p>
                <p>If you run <code>22 % 8</code>, Python calculates the clean division and returns the remaining leftover fraction, which is <strong>6</strong>! If you tell your partner that <code>2 ** 3</code> is 6, they will look at you sideways because the exponent double-star evaluates strictly to <strong>8</strong> (2 &times; 2 &times; 2).</p>
            </div>
        `,
        questions: [
            { q: "What does the expression 22 // 8 evaluate to in Python?", o: ["2.75 (Precise float)", "2 (Floored whole quotient integer)", "6 (Modulus remainder)", "SyntaxError"], c: 1, f: "Correct! // drops the decimal chunk completely, leaving a clean integer!" },
            { q: "Which data type is a value enclosed in quotes like '42' categorized under?", o: ["Integer", "Float", "String literal layout", "Boolean flag"], c: 2, f: "Perfect! Quotes always designate a String data structure layer." }
        ]
    },
    {
        id: 2,
        title: "Chapter 2: Flow Control Matrix",
        readingText: `
            <p><strong>The Core Logic:</strong> Flow control statements decide exactly which lines of source code execute under varying conditions. It works exactly like a blueprint workflow branching path using Boolean truth values (True or False).</p>
            <div class="sitcom-example">
                <h4>🎬 Sitcom Case Ledger: The Security Vault Entry</h4>
                <p>Think of an <code>if</code> block like an entry bouncer. If your evaluation condition checks out, you enter the security room block. If you supply an invalid input, the script falls directly down into the fallback backup alternative route: the <code>else</code> node block statement.</p>
            </div>
        `,
        questions: [
            { q: "Which conditional component acts as a cascading sequential evaluation statement matching multiple unique check rules?", o: ["else block", "elif statement configuration", "while continuous loop loop", "break system trigger"], c: 1, f: "Spot on! elif executes cleanly sequentially if previous check parameters return False." }
        ]
    }
];

let activeUser = null;
let chosenAvatarId = null;
let activeChapterIndex = 0;
let currentQuestionIndex = 0;
let chapterScore = 0;

// Application Initialization Lifecycle Check
document.addEventListener("DOMContentLoaded", () => {
    const cachedUser = localStorage.getItem("procomrade_session");
    if (cachedUser) {
        activeUser = JSON.parse(cachedUser);
        showGameDashboard();
    } else {
        showAuthDashboard();
    }
});

function selectAvatar(element) {
    document.querySelectorAll('.avatar-slot').forEach(slot => slot.classList.remove('selected'));
    element.classList.add('selected');
    chosenAvatarId = element.getAttribute('data-id');
}

function handleRegistration() {
    const userIn = document.getElementById("username").value.trim();
    const passIn = document.getElementById("password").value;

    if (!chosenAvatarId) {
        alert("🚨 Stop Comrade! Select a vector blueprint slot design template first!");
        return;
    }

    activeUser = { username: userIn, avatar: chosenAvatarId, currentChapter: 1 };
    localStorage.setItem("procomrade_session", JSON.stringify(activeUser));
    showGameDashboard();
}

function showAuthDashboard() {
    document.getElementById("auth-view").classList.remove("hidden");
    document.getElementById("game-view").classList.add("hidden");
}

function showGameDashboard() {
    document.getElementById("auth-view").classList.add("hidden");
    document.getElementById("game-view").classList.remove("hidden");
    document.getElementById("user-display").innerText = `Comrade Ledger User: ${activeUser.username}`;
    
    // Injected Vector Rig Layout Dynamic Setup
    document.getElementById("active-avatar-rig").innerHTML = `
        <div class="vector-rig miniature"><div class="layer eyelids"></div><div class="layer pupil"></div><div class="layer mouth"></div></div>
    `;
    
    loadActiveChapterStage();
}

function handleLogout() {
    localStorage.removeItem("procomrade_session");
    activeUser = null;
    showAuthDashboard();
}

function loadActiveChapterStage() {
    const activeData = matrixChapters[activeChapterIndex];
    document.getElementById("chapter-header-badge").innerText = activeData.title;
    document.getElementById("reading-title").innerText = `${activeData.title} - The Story Mode Dossier`;
    document.getElementById("reading-body").innerHTML = activeData.readingText;
    
    document.getElementById("reading-panel").classList.remove("hidden");
    document.getElementById("quiz-panel").classList.add("hidden");
}

function startChapterQuiz() {
    document.getElementById("reading-panel").classList.add("hidden");
    document.getElementById("quiz-panel").classList.remove("hidden");
    currentQuestionIndex = 0;
    chapterScore = 0;
    renderQuestionInConsole();
}

function renderQuestionInConsole() {
    const feedbackBox = document.getElementById("feedback-box");
    const nextBtn = document.getElementById("next-btn");
    const optionsContainer = document.getElementById("options-container");
    
    feedbackBox.classList.add("hidden");
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const activeQuestions = matrixChapters[activeChapterIndex].questions;
    const activeQ = activeQuestions[currentQuestionIndex];

    document.getElementById("question-text").innerText = activeQ.q;

    activeQ.o.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => processAnswerSelection(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function processAnswerSelection(selectedIdx, clickedBtn) {
    const activeQuestions = matrixChapters[activeChapterIndex].questions;
    const activeQ = activeQuestions[currentQuestionIndex];
    const feedbackBox = document.getElementById("feedback-box");
    const nextBtn = document.getElementById("next-btn");

    document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);

    if (selectedIdx === activeQ.c) {
        chapterScore++;
        feedbackBox.innerHTML = `<strong>CORRECT LEDGER ENTRY!</strong> ${activeQ.f}`;
        feedbackBox.className = "feedback success-box";
    } else {
        feedbackBox.innerHTML = `<strong>MATRIX ALARM INTRUSION!</strong> ${activeQ.f}`;
        feedbackBox.className = "feedback error-box";
    }

    feedbackBox.classList.remove("hidden");
    nextBtn.classList.remove("hidden");

    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < activeQuestions.length) {
            renderQuestionInConsole();
        } else {
            concludeChapterAssessment();
        }
    };
}

function concludeChapterAssessment() {
    const activeQuestions = matrixChapters[activeChapterIndex].questions;
    const targetPercent = (chapterScore / activeQuestions.length) * 100;
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");
    nextBtn.classList.add("hidden");

    if (targetPercent >= 70) {
        document.getElementById("question-text").innerText = "🎉 CHAPTER UNLOCKED & CLEARED! 🎉";
        optionsContainer.innerHTML = `
            <div class="report-card">
                <h3>Final Score Precision: ${chapterScore} / ${activeQuestions.length} (${targetPercent.toFixed(0)}%)</h3>
                <p>Status: Unlocked access terminal threshold criteria met!</p>
                <button onclick="advanceNextChapterIndex()" class="comic-btn">PROCEED TO NEXT MATRIX ROUTINE</button>
            </div>
        `;
    } else {
        document.getElementById("question-text").innerText = "🚨 CRITICAL CRASH: ACCESS SUSPENDED 🚨";
        optionsContainer.innerHTML = `
            <div class="report-card">
                <h3>Final Score Precision: ${chapterScore} / ${activeQuestions.length} (${targetPercent.toFixed(0)}%)</h3>
                <p>Status: Under 70% threshold parameter benchmark score requirement. You need to read the dossier again!</p>
                <button onclick="loadActiveChapterStage()" class="comic-btn">RELOAD READING LOG ARCHIVES</button>
            </div>
        `;
    }
}

function advanceNextChapterIndex() {
    if (activeChapterIndex + 1 < matrixChapters.length) {
        activeChapterIndex++;
        loadActiveChapterStage();
    } else {
        document.getElementById("question-text").innerText = "🏁 SYSTEM TERMINAL MASTERED 🏁";
        document.getElementById("options-container").innerHTML = "<p>Congratulations Comrade, you have successfully cleared the current progression bounds!</p>";
    }
}
