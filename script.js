document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const setupContainer = document.getElementById('setup-container');
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-button');
    const tableCardsContainer = document.getElementById('table-cards-container');
    const problemsCardsContainer = document.getElementById('problems-cards-container');
    const scenarioCardsContainer = document.getElementById('scenario-cards-container');
    const selectAllTablesBtn = document.getElementById('select-all-tables');
    const problemText = document.getElementById('problem-text');
    const answerCardsContainer = document.getElementById('answer-cards-container');
    const feedbackText = document.getElementById('feedback-text');
    const progressBar = document.getElementById('progress-bar');
    const sceneContainer = document.getElementById('scene-container');
    const restartButton = document.getElementById('restart-button');
    const homeButton = document.getElementById('home-button');
    const timerDisplay = document.getElementById('timer-display');
    const summaryContainer = document.getElementById('summary-container');
    const summaryScore = document.getElementById('summary-score');
    const summaryTotalCorrect = document.getElementById('summary-total-correct');
    const summaryTotalIncorrect = document.getElementById('summary-total-incorrect');
    const summaryDetailedErrors = document.getElementById('summary-detailed-errors');
    const detailedErrorsList = document.getElementById('detailed-errors-list');
    const summaryTablePerformance = document.getElementById('summary-table-performance');
    const tableProgressBars = document.getElementById('table-progress-bars');
    const summaryMessage = document.getElementById('summary-message');
    const summaryRestartButton = document.getElementById('summary-restart-button');
    const summaryHomeButton = document.getElementById('summary-home-button');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    // --- Scenario Definitions ---
    const scenarios = [
        {
            id: 'ship',
            name: 'Barco al Muelle',
            description: 'Ayuda al barco a llegar al muelle.',
            svgContent: `
                <svg id="scene-svg" viewBox="0 0 250 150" width="250" height="150">
                    <!-- Agua -->
                    <rect x="0" y="80" width="250" height="70" fill="#3498db" />
                    <!-- Muelle -->
                    <rect x="200" y="70" width="50" height="80" fill="#8B4513" />
                    <!-- Barco -->
                    <g id="movable-element" transform="translate(0,0)">
                        <rect x="10" y="60" width="40" height="20" fill="#e74c3c" />
                        <polygon points="10,60 0,50 0,80 10,80" fill="#e74c3c" />
                        <rect x="25" y="45" width="5" height="15" fill="#7f8c8d" />
                        <polygon points="25,45 35,45 30,30" fill="#7f8c8d" />
                    </g>
                    <!-- Olas/Salpicaduras (feedback) -->
                    <g id="feedback-element" opacity="0">
                        <circle cx="50" cy="85" r="3" fill="white" opacity="0.7" />
                        <circle cx="55" cy="80" r="2" fill="white" opacity="0.7" />
                    </g>
                </svg>
            `,
            maxTravel: 160,
            winMessage: "¡CONECTADO! ¡Excelente trabajo!",
            loseMessage: "¡Casi! Vuelve a intentarlo.",
            movementType: 'translateX'
        },
        {
            id: 'robot',
            name: 'Robot a la Carga',
            description: 'Conecta al robot a su cargador.',
            svgContent: `
                <svg id="scene-svg" viewBox="0 0 250 150" width="250" height="150">
                    <!-- Fondo -->
                    <rect x="0" y="0" width="250" height="150" fill="#f0f0f0" />
                    <!-- Cargador -->
                    <rect x="200" y="60" width="30" height="30" fill="#4CAF50" />
                    <rect x="210" y="50" width="10" height="10" fill="#4CAF50" />
                    <!-- Robot -->
                    <g id="movable-element" transform="translate(0,0)">
                        <rect x="10" y="70" width="30" height="30" fill="#9E9E9E" />
                        <circle cx="25" cy="65" r="5" fill="#FFEB3B" />
                        <rect x="15" y="100" width="5" height="10" fill="#9E9E9E" />
                        <rect x="30" y="100" width="5" height="10" fill="#9E9E9E" />
                    </g>
                    <!-- Chispas (feedback) -->
                    <g id="feedback-element" opacity="0">
                        <circle cx="40" cy="85" r="3" fill="orange" opacity="0.7" />
                        <circle cx="45" cy="80" r="2" fill="yellow" opacity="0.7" />
                    </g>
                </svg>
            `,
            maxTravel: 160,
            winMessage: "¡CARGADO! ¡El robot está listo!",
            loseMessage: "¡El robot se quedó sin batería!",
            movementType: 'translateX'
        },
        {
            id: 'rocket',
            name: 'Cohete al Espacio',
            description: 'Lanza el cohete al espacio.',
            svgContent: `
                <svg id="scene-svg" viewBox="0 0 250 150" width="250" height="150">
                    <!-- Cielo -->
                    <rect x="0" y="0" width="250" height="150" fill="#000033" />
                    <!-- Plataforma de lanzamiento -->
                    <rect x="100" y="120" width="50" height="30" fill="#607D8B" />
                    <!-- Cohete -->
                    <g id="movable-element" transform="translate(0,0)">
                        <polygon points="125,20 115,40 135,40" fill="#FF5722" />
                        <rect x="115" y="40" width="20" height="80" fill="#B0BEC5" />
                        <polygon points="115,120 110,130 140,130 135,120" fill="#FF5722" />
                    </g>
                    <!-- Humo (feedback) -->
                    <g id="feedback-element" opacity="0">
                        <circle cx="125" cy="140" r="5" fill="#E0E0E0" opacity="0.7" />
                        <circle cx="130" cy="145" r="4" fill="#E0E0E0" opacity="0.7" />
                    </g>
                </svg>
            `,
            maxTravel: -100, // Rocket moves upwards
            winMessage: "¡DESPEGUE! ¡Misión cumplida!",
            loseMessage: "¡El cohete no despegó!",
            movementType: 'translateY'
        },
        {
            id: 'plant',
            name: 'Planta al Sol',
            description: 'Ayuda a la planta a crecer hacia el sol.',
            svgContent: `
                <svg id="scene-svg" viewBox="0 0 250 150" width="250" height="150">
                    <!-- Tierra -->
                    <rect x="0" y="120" width="250" height="30" fill="#8B4513" />
                    <!-- Sol -->
                    <circle cx="220" cy="30" r="20" fill="#FFEB3B" />
                    <!-- Planta -->
                    <g id="movable-element" transform="translate(0,0)">
                        <rect x="120" y="100" width="10" height="20" fill="#4CAF50" />
                        <ellipse cx="125" cy="95" rx="15" ry="10" fill="#8BC34A" />
                    </g>
                    <!-- Brillo (feedback) -->
                    <g id="feedback-element" opacity="0">
                        <circle cx="125" cy="90" r="5" fill="white" opacity="0.7" />
                        <circle cx="130" cy="85" r="4" fill="white" opacity="0.7" />
                    </g>
                </svg>
            `,
            maxTravel: -80, // Plant grows upwards
            winMessage: "¡FLORECIENDO! ¡La planta ha crecido!",
            loseMessage: "¡La planta se marchitó!",
            movementType: 'translateY'
        },
        {
            id: 'train',
            name: 'Tren a la Estación',
            description: 'Guía al tren a su estación.',
            svgContent: `
                <svg id="scene-svg" viewBox="0 0 250 150" width="250" height="150">
                    <!-- Vías -->
                    <rect x="0" y="100" width="250" height="5" fill="#607D8B" />
                    <rect x="0" y="110" width="250" height="5" fill="#607D8B" />
                    <!-- Estación -->
                    <rect x="200" y="80" width="40" height="30" fill="#FF9800" />
                    <!-- Tren -->
                    <g id="movable-element" transform="translate(0,0)">
                        <rect x="10" y="80" width="40" height="20" fill="#795548" />
                        <circle cx="20" cy="100" r="8" fill="#212121" />
                        <circle cx="40" cy="100" r="8" fill="#212121" />
                    </g>
                    <!-- Vapor (feedback) -->
                    <g id="feedback-element" opacity="0">
                        <circle cx="50" cy="75" r="5" fill="#E0E0E0" opacity="0.7" />
                        <circle cx="55" cy="70" r="4" fill="#E0E0E0" opacity="0.7" />
                    </g>
                </svg>
            `,
            maxTravel: 150,
            winMessage: "¡LLEGADA! ¡El tren está en la estación!",
            loseMessage: "¡El tren se descarriló!",
            movementType: 'translateX'
        }
    ];

    // --- Game Configuration ---
    const WIN_PERCENTAGE = 80;
    const TIMER_DURATION = 5; // seconds

    // --- Game State ---
    let TOTAL_PROBLEMS = 10;
    let selectedTables = [];
    let currentAnswer = 0;
    let correctAnswers = 0;
    let problemsAnswered = 0;
    let lastCorrectPosition = -1;
    let selectedScenarioId = 'ship';
    let movableElement;
    let feedbackElement;
    let currentTimer;
    let timerInterval;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let tablePerformance = {}; // To store performance per table
    let currentProblemTable; // To store the table for the current problem
    let allIncorrectAnswers = []; // To store all incorrect answers for detailed summary

    // --- UI Creation ---
    function createCards() {
        for (let i = 2; i <= 13; i++) {
            const card = document.createElement('div');
            card.className = 'card table-card';
            card.dataset.value = i;
            card.textContent = i;
            tableCardsContainer.appendChild(card);
        }
        [10, 20, 30].forEach(num => {
            const card = document.createElement('div');
            card.className = 'card problem-card';
            card.dataset.value = num;
            card.textContent = num;
            if (num === 10) card.classList.add('selected');
            problemsCardsContainer.appendChild(card);
        });
    }

    // --- Timer Functions ---
    function startTimer() {
        currentTimer = TIMER_DURATION;
        timerDisplay.textContent = currentTimer;
        timerDisplay.classList.remove('time-running-out');
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            currentTimer--;
            timerDisplay.textContent = currentTimer;

            if (currentTimer <= 2) {
                timerDisplay.classList.add('time-running-out');
            } else {
                timerDisplay.classList.remove('time-running-out');
            }

            if (currentTimer <= 0) {
                handleTimeUp();
            }
        }, 1000);
    }

    function handleTimeUp() {
        clearInterval(timerInterval);
        problemsAnswered++;
        totalIncorrect++;
        feedbackText.textContent = "¡Tiempo agotado!";
        incorrectSound.play(); // Play incorrect sound
        tablePerformance[currentProblemTable] = tablePerformance[currentProblemTable] || { correct: 0, incorrect: [] };
        tablePerformance[currentProblemTable].incorrect.push({ given: 'Tiempo agotado', actual: currentAnswer });
        allIncorrectAnswers.push({ table: currentProblemTable, given: 'Tiempo agotado', actual: currentAnswer });
        updateUI();

        setTimeout(() => {
            if (problemsAnswered < TOTAL_PROBLEMS) {
                generateProblem();
            } else {
                endGame();
            }
        }, 1500);
    }

    function clearTimer() {
        clearInterval(timerInterval);
        timerDisplay.classList.remove('time-running-out');
        timerDisplay.textContent = TIMER_DURATION; // Reset display
    }

    // --- Game Flow ---
    function startGame() {
        selectedTables = Array.from(tableCardsContainer.querySelectorAll('.card.selected')).map(c => parseInt(c.dataset.value));
        const selectedProblemCard = problemsCardsContainer.querySelector('.card.selected');
        
        if (selectedTables.length === 0) {
            alert('Por favor, selecciona al menos una tabla de multiplicar.');
            return;
        }

        TOTAL_PROBLEMS = parseInt(selectedProblemCard.dataset.value);
        correctAnswers = 0;
        problemsAnswered = 0;
        lastCorrectPosition = -1;
        totalCorrect = 0;
        totalIncorrect = 0;
        tablePerformance = {};
        allIncorrectAnswers = [];

        setupContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        restartButton.classList.add('hidden');
        homeButton.classList.remove('hidden');

        // Load selected scenario SVG and update game title
        const activeScenario = scenarios.find(s => s.id === selectedScenarioId);
        sceneContainer.innerHTML = activeScenario.svgContent;
        document.getElementById('game-title').textContent = activeScenario.description;

        // Re-get references to dynamic elements after SVG injection
        movableElement = document.getElementById('movable-element');
        feedbackElement = document.getElementById('feedback-element');

        resetUI();
        generateProblem();
    }

    function generateProblem() {
        if (problemsAnswered >= TOTAL_PROBLEMS) {
            endGame();
            return;
        }

        feedbackText.textContent = `Problema ${problemsAnswered + 1} de ${TOTAL_PROBLEMS}`;
        
        const randomTable = selectedTables[getRandomInt(0, selectedTables.length - 1)];
        const num2 = getRandomInt(1, 12);
        currentAnswer = randomTable * num2;
        problemText.textContent = `¿Cuánto es ${randomTable} × ${num2}?`;
        currentProblemTable = randomTable;

        // Animate problem text
        problemText.classList.remove('problem-text-fade-in'); // Reset animation
        void problemText.offsetWidth; // Trigger reflow
        problemText.classList.add('problem-text-fade-in');
        
        generateAnswerOptions();
        startTimer();
    }

    function generateAnswerOptions() {
        const distractors = generateDistractors(currentAnswer);
        let options = [...distractors];
        
        let correctPosition;
        do {
            correctPosition = getRandomInt(0, 3);
        } while (correctPosition === lastCorrectPosition);
        lastCorrectPosition = correctPosition;

        options.splice(correctPosition, 0, currentAnswer);
        displayAnswerCards(options);
    }

    function generateDistractors(answer) {
        const distractors = new Set();
        while (distractors.size < 3) {
            const offset = getRandomInt(1, 10);
            const distractor = Math.max(0, answer + (Math.random() < 0.5 ? offset : -offset));
            if (distractor !== answer) {
                distractors.add(distractor);
            }
        }
        return Array.from(distractors);
    }

    function displayAnswerCards(options) {
        answerCardsContainer.innerHTML = '';
        answerCardsContainer.classList.remove('disabled');
        options.forEach((option, index) => {
            const card = document.createElement('div');
            card.className = 'card answer-card';
            card.dataset.value = option;
            card.textContent = option;
            answerCardsContainer.appendChild(card);
            // Trigger the transition after a short delay
            setTimeout(() => {
                card.classList.add('is-visible');
            }, 50 + index * 100);
        });
    }

    function checkAnswer(selectedValue, selectedCard) {
        clearTimer();
        answerCardsContainer.classList.add('disabled');
        const isCorrect = parseInt(selectedValue, 10) === currentAnswer;

        if (isCorrect) {
            correctAnswers++;
            totalCorrect++;
            selectedCard.classList.add('correct', 'correct-answer-animate');
            triggerFeedbackAnimation();
            correctSound.play(); // Play correct sound
            tablePerformance[currentProblemTable] = tablePerformance[currentProblemTable] || { correct: 0, incorrect: [] };
            tablePerformance[currentProblemTable].correct++;
        } else {
            totalIncorrect++;
            selectedCard.classList.add('incorrect');
            const correctCard = answerCardsContainer.querySelector(`[data-value="${currentAnswer}"]`);
            if(correctCard) correctCard.classList.add('correct');
            incorrectSound.play(); // Play incorrect sound
            tablePerformance[currentProblemTable] = tablePerformance[currentProblemTable] || { correct: 0, incorrect: [] };
            tablePerformance[currentProblemTable].incorrect.push({ given: parseInt(selectedValue, 10), actual: currentAnswer });
            allIncorrectAnswers.push({ table: currentProblemTable, given: parseInt(selectedValue, 10), actual: currentAnswer });
        }
        
        // Fade out all answer cards
        Array.from(answerCardsContainer.children).forEach(card => {
            card.classList.add('fade-out-down');
        });

        problemsAnswered++;
        updateUI();
        
        setTimeout(() => {
            if (problemsAnswered < TOTAL_PROBLEMS) {
                generateProblem();
            } else {
                endGame();
            }
        }, 1500);
    }

    function endGame() {
        clearTimer();
        const finalScore = (correctAnswers / TOTAL_PROBLEMS) * 100;

        gameContainer.classList.add('hidden');
        summaryContainer.classList.remove('hidden');

        summaryScore.textContent = `Tu puntuación: ${correctAnswers} de ${TOTAL_PROBLEMS} (${finalScore.toFixed(0)}%)`;
        summaryTotalCorrect.textContent = totalCorrect;
        summaryTotalIncorrect.textContent = totalIncorrect;

        // Populate Detailed Errors section
        detailedErrorsList.innerHTML = '';
        if (allIncorrectAnswers.length > 0) {
            summaryDetailedErrors.classList.remove('hidden');
            allIncorrectAnswers.forEach(error => {
                const listItem = document.createElement('li');
                listItem.textContent = `Tabla del ${error.table}: Tu respuesta: ${error.given}, Correcta: ${error.actual}`;
                detailedErrorsList.appendChild(listItem);
            });
        } else {
            summaryDetailedErrors.classList.add('hidden');
        }

        // Display performance per table with progress bars
        tableProgressBars.innerHTML = ''; // Clear previous content
        if (Object.keys(tablePerformance).length > 0) {
            summaryTablePerformance.classList.remove('hidden');
            for (const table in tablePerformance) {
                const perf = tablePerformance[table];
                const totalAttempts = perf.correct + perf.incorrect.length;
                const percentCorrect = totalAttempts > 0 ? (perf.correct / totalAttempts) * 100 : 0;

                const tableDiv = document.createElement('div');
                tableDiv.classList.add('table-progress-item');
                tableDiv.innerHTML = `
                    <p>Tabla del ${table}: ${perf.correct} / ${totalAttempts} (${percentCorrect.toFixed(0)}%)</p>
                    <progress value="${percentCorrect}" max="100"></progress>
                `;
                tableProgressBars.appendChild(tableDiv);
            }
        } else {
            summaryTablePerformance.classList.add('hidden');
        }

        let scoreMessage = "";
        if (finalScore >= WIN_PERCENTAGE) {
            scoreMessage = "¡Felicidades! ¡Has dominado las tablas!";
            movableElement.classList.add('is-happy');
        } else if (finalScore >= 50) {
            scoreMessage = "¡Buen intento! Sigue practicando para mejorar.";
            movableElement.classList.add('is-sad'); // Apply sad animation for losing
        } else {
            scoreMessage = "¡No te rindas! Con práctica lo lograrás.";
            movableElement.classList.add('is-sad'); // Apply sad animation for losing
        }
        summaryMessage.textContent = scoreMessage;

        // Ensure movable element is not in 'happy' state when game ends
        movableElement.classList.remove('is-happy');
    }

    function showSetup() {
        clearTimer();
        gameContainer.classList.add('hidden');
        summaryContainer.classList.add('hidden'); // Hide summary screen
        setupContainer.classList.remove('hidden');
        homeButton.classList.add('hidden');
        tableCardsContainer.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        // Reset scenario selection to default (ship)
        scenarioCardsContainer.querySelectorAll('.scenario-card').forEach(c => {
            c.classList.remove('selected');
            if (c.dataset.scenarioId === 'ship') {
                c.classList.add('selected');
                selectedScenarioId = 'ship';
            }
        });
    }

    function triggerFeedbackAnimation() {
        feedbackElement.classList.add('feedback-burst');
        setTimeout(() => feedbackElement.classList.remove('feedback-burst'), 500);
    }

    function updateUI() {
        const percentCorrect = (correctAnswers / TOTAL_PROBLEMS) * 100;
        progressBar.value = percentCorrect;

        const activeScenario = scenarios.find(s => s.id === selectedScenarioId);
        const maxTravel = activeScenario.maxTravel;
        const movableElement = document.getElementById('movable-element');

        // Calculate movable element position based on correct answers
        const elementPosition = (correctAnswers / TOTAL_PROBLEMS) * maxTravel;
        if (activeScenario.movementType === 'translateX') {
            movableElement.style.transform = `translateX(${elementPosition}px)`;
        } else if (activeScenario.movementType === 'translateY') {
            movableElement.style.transform = `translateY(${elementPosition}px)`;
        }
    }
    
    function resetUI() {
        progressBar.value = 0;
        const activeScenario = scenarios.find(s => s.id === selectedScenarioId);
        if (activeScenario.movementType === 'translateX') {
            movableElement.style.transform = 'translateX(0)';
        } else if (activeScenario.movementType === 'translateY') {
            movableElement.style.transform = 'translateY(0)';
        }
        // Ensure movable element is not in 'happy' state
        movableElement.classList.remove('is-happy', 'is-sad');
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', showSetup);
    homeButton.addEventListener('click', showSetup);
    summaryRestartButton.addEventListener('click', startGame);
    summaryHomeButton.addEventListener('click', showSetup);
    answerCardsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('answer-card') && !answerCardsContainer.classList.contains('disabled')) {
            checkAnswer(e.target.dataset.value, e.target);
        }
    });

    tableCardsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('table-card')) {
            e.target.classList.toggle('selected');
        }
    });

    problemsCardsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('problem-card')) {
            problemsCardsContainer.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });

    selectAllTablesBtn.addEventListener('click', () => {
        const allCards = tableCardsContainer.querySelectorAll('.card');
        const allSelected = Array.from(allCards).every(c => c.classList.contains('selected'));
        allCards.forEach(c => c.classList.toggle('selected', !allSelected));
    });

    scenarioCardsContainer.addEventListener('click', e => {
        if (e.target.closest('.scenario-card')) {
            scenarioCardsContainer.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('selected'));
            const clickedCard = e.target.closest('.scenario-card');
            clickedCard.classList.add('selected');
            selectedScenarioId = clickedCard.dataset.scenarioId;
        }
    });

    // --- Initializer ---
    createCards();
});
