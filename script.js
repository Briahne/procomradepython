// ProComrade Python Matrix - Chapter 1 Logic (Sheng/English Sitcom Parody Edition)
const quizData = [
    {
        question: "Comrade! Unataka kuanza hii matrix lakini unakutana na hii expression kwa interactive shell: 2 ** 3. Kitu wa kwanza, nini itakuwa output hapa kabla haujajua coding vizuri?",
        options: ["6 (Ju 2 times 3 si ni sita, ama?)", "8 (Ju ni exponentiation power matrix, buda!)", "5 (Kuongeza tu kawaida)", "SyntaxError (Hizo nyota mbili zinafanana na macho ya mlevi)"],
        correct: 1,
        feedback: "Enyewe umechagua poa! ** ni exponent math operator kwa Python. Zile zote zingine ni math za shule ya msingi!"
    },
    {
        question: "Imagine unafanya kibarua ya kucalculate change ya msabato fulani mkorofi, na unatumia 22 % 8 kwa Python code yako. Hii modulus operator itakuletea nini kama jibu?",
        options: ["2.75 (Normal division)", "2 (The floored quotient)", "6 (The remainder left over)", "Kitu free ya ziada"],
        correct: 2,
        feedback: "Manze, % ni Modulus operator! Inakupa ile remainder pekee yake baada ya division. Sasa huyo msabato hawezi kukuibia!"
    },
    {
        question: "Umeamua kuandika variable name ya kwanza kwa script yako ndio uweke siri zako. Python itakukubalia jina gani hapa bila kuleta makasiriko na crash?",
        options: ["1st_comrade_name (Kuanza na namba)", "my-secret-ledger (Kuweka mikwaju katikati)", "comrade_status_2013 (Valid string layout)", "while (Jina maalum ya flow control)"],
        correct: 2,
        feedback: "Safii! Variable names lazima zianze na letter ama underscore, na haziwezi kutumia Python keywords kama 'while' au symbols!"
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackBox = document.getElementById("feedback-box");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    feedbackBox.classList.add("hidden");
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";

    let currentQuiz = quizData[currentQuestionIndex];
    questionText.innerText = currentQuiz.question;

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    let currentQuiz = quizData[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll("button");
    
    // Disable all options after clicking
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.correct) {
        userScore++;
        feedbackBox.innerHTML = `<strong>CORRECT!</strong> ${currentQuiz.feedback}`;
        feedbackBox.className = "feedback success-box";
    } else {
        feedbackBox.innerHTML = `<strong>WAKUSHUKISHWA!</strong> ${currentQuiz.feedback}`;
        feedbackBox.className = "feedback error-box";
    }

    feedbackBox.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showReportCard();
    }
});

function showReportCard() {
    questionText.innerText = "🚨 LEDGER ASSESSMENT MATRIX COMPLETE! 🚨";
    
    let grade = "";
    let commentary = "";
    if (userScore === quizData.length) {
        grade = "A+ (GENIUS COMRADE)";
        commentary = "Enyewe wewe si fala! Umejua expressions zote kama mzee wa mtaa.";
    } else if (userScore >= 1) {
        grade = "C (SURVIVAL MODE)";
        commentary = "Umejaribu lakini bado unahitaji kusoma hizi basics kabla AI ichukue kazi yako.";
    } else {
        grade = "F (DISASTER MATRIX)";
        commentary = "Hii ni aibu kubwa! Hata kompyuta inakucheka sasa hivi. Reruns zinakungoja!";
    }

    optionsContainer.innerHTML = `
        <div class="report-card">
            <h3>SCORE: ${userScore} / ${quizData.length}</h3>
            <h4>GRADE: ${grade}</h4>
            <p>${commentary}</p>
            <button onclick="location.reload()" class="comic-btn">TRY AGAIN, FRESH START</button>
        </div>
    `;
    nextBtn.classList.add("hidden");
}

// Initial fire up
document.addEventListener("DOMContentLoaded", loadQuestion);
