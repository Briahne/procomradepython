// Game chapters mapped perfectly to Automate the Boring Stuff patterns
const matrixChapters = [
    {
        id: 1,
        title: "Chapter 1: Python Basics & Math Operators",
        readingText: "<p><strong>The Core Logic:</strong> Programming is simply entering instructions for your machine to process. In Python, math expressions reduce complex lines down to a single value. Every operation uses strict precedence constraints similar to normal algebra rules.</p><div class='sitcom-example'><h4>🎬 Sitcom Case Ledger: The Bad Math Broker</h4><p>Imagine you are trying to calculate the remainder of change after splitting a ledger cash pool among your local crew. Instead of manually breaking your head, you fire up the Python interactive shell.</p><p>If you run <code>22 % 8</code>, Python calculates the clean division and returns the remaining leftover fraction, which is <strong>6</strong>! If you tell your partner that <code>2 ** 3</code> is 6, they will look at you sideways because the exponent double-star evaluates strictly to <strong>8</strong> (2 &times; 2 &times; 2).</p></div>",
        questions: [
            { q: "What does the expression 22 // 8 evaluate to in Python?", o: ["2.75 (Precise float)", "2 (Floored whole quotient integer)", "6 (Modulus remainder)", "SyntaxError"], c: 1, f: "Correct! // drops the decimal chunk completely, leaving a clean integer!" },
            { q: "Which data type is a value enclosed in quotes like '42' categorized under?", o: ["Integer", "Float", "String literal layout", "Boolean flag"], c: 2, f: "Perfect! Quotes always designate a String data structure layer." }
        ]
    },
    {
        id: 2,
        title: "Chapter 2: Flow Control Matrix",
        readingText: "<p><strong>The Core Logic:</strong> Flow control statements decide exactly which lines of source code execute under varying conditions. It works exactly like a blueprint workflow branching path using Boolean truth values (True or False).</p><div class='sitcom-example'><h4>🎬 Sitcom Case Ledger: The Security Vault Entry</h4><p>Think of an <code>if</code> block like an entry bouncer. If your evaluation condition checks out, you enter the security room block. If you supply an invalid input, the script falls directly down into the fallback backup alternative route: the <code>else</code> node block statement.</p></div>",
        questions: [
            { q: "Which conditional component acts as a cascading sequential evaluation statement matching multiple unique check rules?", o: ["else block", "elif statement configuration", "while continuous loop loop", "break system trigger"], c: 1, f: "Spot on! elif executes cleanly sequentially if previous check parameters return False." }
        ]
    },
    {
        id: 3,
        title: "Chapter 3: Micro-Functions & Local Scopes",
        readingText: "<p><strong>The Core Logic:</strong> Functions help you organize messy copy-pasted blocks into clean, reusable shortcuts. When you pass information inside parameters, they only live inside that local function block layout execution lifecycle.</p><div class='sitcom-example'><h4>🎬 Sitcom Case Ledger: The Secret Whispering Intern</h4><p>Imagine your intern defines a variable inside a local scope named <code>def vault_code(): password = 'Sheng2013'</code>. If you try to print that password outside the function in your global scope, Python crashes with a NameError! Global code cannot read local parameters—what happens in the local scope, stays in the local scope!</p></div>",
        questions: [
            { q: "What runtime error occurs if you try to print a local variable from your global main script layer?", o: ["SyntaxError", "TypeError", "NameError (Variable structure unknown globally)", "ZeroDivisionError"], c: 2, f: "Bingo! The global layer has no idea that local variable entry exists!" }
        ]
    },
    {
        id: 4,
        title: "Chapter 4: Lists, Index Arrays & Nested Loop Rigs",
        readingText: "<p><strong>The Core Logic:</strong> A list is a single ordered collection sequence container holding multiple data pieces. When you nest loops inside lists, you scan through multidimensional spaces item by item—crucial for processing coordinates or graphic templates!</p><div class='sitcom-example'><h4>🎬 Sitcom Case Ledger: The Crew Inventory Roll Call</h4><p>Let's log your crew assets into a structured Python array sequence container: <code>crew = ['Brahne', 'Mgenge', 'Shujaa']</code>. Indexes always start from zero! So <code>crew</code> fetches 'Brahne' directly. If you call a negative item index like <code>crew[-1]</code>, Python counts backwards from the tail end and drops 'Shujaa' into your console runtime!</p></div>",
        questions: [
            { q: "Given inventory = ['oil', 'wire', 'lens'], what item does inventory[-2] target directly?", o: ["oil", "wire (Counting one position backwards from tail index bounds)", "lens", "IndexError"], c: 1, f: "Safi! Negative indexes count cleanly from the back right-hand side edge container margins." },
            { q: "If you run an inner loop statement completely nested inside an outer loop block matrix, how do executions cycle?", o: ["They run concurrently side by side", "The inner loop runs completely from start to finish for EVERY single cycle of the outer loop", "The outer loop overrides and breaks execution", "The script triggers a forced SyntaxError crash node"], c: 1, f: "Perfect execution! Nested loop architectures scan tables and matrices line-by-item systematically!" }
        ]
    },
    {
        id: 5,
        title: "Chapter 5: Dictionaries & Structured Matrix Ledger Entities",
        readingText: "<p><strong>The Core Logic:</strong> Dictionaries differ from index collections because they store elements inside absolute custom Key-Value pairings instead of relying on linear row number sequences. Keys can be customized string layout values or distinct signature parameters.</p><div class='sitcom-example'><h4>🎬 Sitcom Case Ledger: The Crew Dossier Profile Lookup</h4><p>If you build a database profile dictionary: <code>comrade = {'alias': 'Brahne', 'role': 'Lead Programmer', 'level': 99}</code>, you do not look up inputs using numbers. Calling <code>comrade['role']</code> instantly extracts 'Lead Programmer' from your profile object layer without running an extensive processing loop grid scan!</p></div>",
        questions: [
            { q: "Which dictionary tool allows you to safely check for keys and supply a standard safe fallback value if that key property parameter does not exist?", o: ["The index retrieval check method", "The direct bracket mapping call layout", "The get() method configuration block template", "The setdefault() sequence loop routine"], c: 2, f: "Master execution! .get('key', default) guarantees data delivery workflows safely without causing system exceptions!" }
        ]
    }
];

let activeUser = null;
let chosenAvatarId = null;
let activeChapterIndex = 0;
let currentQuestionIndex = 0;
let chapterScore = 0;

document.addEventListener("DOMContentLoaded", () => {
    const cachedUser = localStorage.getItem("procomrade_session");
    if (cachedUser) {
        activeUser = JSON.parse(cachedUser);
        activeChapterIndex = (activeUser.currentChapter || 1) - 1;
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

async function handleRegistration() {
    const userIn = document.getElementById("username").value.trim();
    const passIn = document.getElementById("password").value;

    if (!chosenAvatarId) {
        alert("🚨 Stop Comrade! Select an avatar first!");
        return;
    }

    try {
        const response = await fetch('/api/matrix/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userIn, password: passIn, avatar: chosenAvatarId })
        });
        const result = await response.json();
        if (response.ok && result.success) {
            activeUser = result.user;
            localStorage.setItem("procomrade_session", JSON.stringify(activeUser));
            activeChapterIndex = (activeUser.currentChapter || 1) - 1;
            showGameDashboard();
        } else {
            alert(result.msg || "🚨 Connection failed!");
        }
    } catch (err) {
        alert("🚨 Network timeout or server lag!");
    }
}

function showAuthDashboard() {
    document.getElementById("auth-view").classList.remove("hidden");
    document.getElementById("game-view").classList.add("hidden");
}

function showGameDashboard() {
    document.getElementById("auth-view").classList.add("hidden");
    document.getElementById("game-view").classList.remove("hidden");
    document.getElementById("user-display").innerText = "Comrade: " + activeUser.username;
    loadActiveChapterStage();
}

function handleLogout() {
    localStorage.removeItem("procomrade_session");
    activeUser = null;
    showAuthDashboard();
}

function loadActiveChapterStage() {
    if (activeChapterIndex >= matrixChapters.length) {
        activeChapterIndex = matrixChapters.length - 1;
    }
    const activeData = matrixChapters[activeChapterIndex];
    document.getElementById("chapter-header-badge").innerText = "STAGE PROGRESION - ID: " + activeData.id;
    document.getElementById("reading-title").innerText = activeData.title + " - The Story Mode Dossier";
    document.getElementById("reading-body").innerHTML = activeData.readingText;
    document.getElementById("reading-panel").classList.remove("hidden");
    document.getElementById("quiz-panel").classList.add("hidden");
}

function startChapterQuiz() {
    document.getElementById("reading-panel").classList.add("hidden");
