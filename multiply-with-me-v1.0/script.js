document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const multiplicationData = Array.from({ length: 10 }, (_, i) => ({
        multiplier: i + 1,
        range: Array.from({ length: 10 }, (_, j) => j + 1)
    }));

    let currentMultiplierIndex = 0;
    let currentRangeIndex = 0;
    let currentQuestion = {};
    let score = 0;
    let timerInterval;

    // Event Listeners for buttons
    document.getElementById('next-btn').addEventListener('click', showNextMultiplication);
    document.getElementById('prev-btn').addEventListener('click', showPrevMultiplication);
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);

    // Event Listener for keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            showNextMultiplication();
        } else if (event.key === 'ArrowLeft') {
            showPrevMultiplication();
        }
    });

    // Show first multiplication
    showNextMultiplication();

    function showNextMultiplication() {
        const currentMultiplier = multiplicationData[currentMultiplierIndex].multiplier;
        const currentRange = multiplicationData[currentMultiplierIndex].range;
        currentRangeIndex = (currentRangeIndex + 1) % currentRange.length;

        if (currentRangeIndex === 0) {
            currentMultiplierIndex = (currentMultiplierIndex + 1) % multiplicationData.length;
        }

        displayMultiplication();
    }

    function showPrevMultiplication() {
        const currentMultiplier = multiplicationData[currentMultiplierIndex].multiplier;
        const currentRange = multiplicationData[currentMultiplierIndex].range;
        currentRangeIndex = (currentRangeIndex - 1 + currentRange.length) % currentRange.length;

        if (currentRangeIndex === currentRange.length - 1) {
            currentMultiplierIndex = (currentMultiplierIndex - 1 + multiplicationData.length) % multiplicationData.length;
        }

        displayMultiplication();
    }

    function displayMultiplication() {
        const currentMultiplier = multiplicationData[currentMultiplierIndex].multiplier;
        const currentRange = multiplicationData[currentMultiplierIndex].range;
        const currentNumber = currentRange[currentRangeIndex];
        const text = `${currentMultiplier} x ${currentNumber} = ${currentMultiplier * currentNumber}`;
        document.getElementById('multiplication-text').innerText = text;
    }

    function startQuiz() {
        document.getElementById('multiplication-view').classList.add('hidden');
        document.getElementById('quiz-view').classList.remove('hidden');
        score = 0;
        document.getElementById('score').innerText = `Puntos: ${score}`;
        nextQuestion();
    }

    function nextQuestion() {
        clearInterval(timerInterval);
        document.getElementById('feedback').innerText = '';
        const multiplier = Math.floor(Math.random() * 9) + 2;
        const range = Math.floor(Math.random() * 10) + 1;
        currentQuestion = { multiplier, range, answer: multiplier * range };

        document.getElementById('question-text').innerText = `${multiplier} x ${range} = ?`;
        document.getElementById('answer').value = '';

        let timeLeft = 5;
        document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                checkAnswer();
            }
        }, 1000);
    }

    function checkAnswer() {
        const answer = parseInt(document.getElementById('answer').value);
        if (answer === currentQuestion.answer) {
            document.getElementById('feedback').innerText = '¡Correcto!';
            document.getElementById('feedback').style.color = 'green';
            score += 10;
        } else {
            document.getElementById('feedback').innerText = 'Incorrecto!';
            document.getElementById('feedback').style.color = 'red';
            score -= 5;
        }
        document.getElementById('score').innerText = `Puntos: ${score}`;
        if (score >= 100) {
            document.getElementById('feedback').innerText = '¡Ganaste!';
            document.getElementById('feedback').style.color = 'blue';
        } else {
            setTimeout(nextQuestion, 1000);
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const tableContent = document.getElementById('table-content');

    // Generar tablas de multiplicar del 1 al 10
    for (let i = 1; i <= 10; i++) {
        const table = document.createElement('div');
        table.innerHTML = `<h2>Tabla del ${i}</h2>`;
        for (let j = 1; j <= 10; j++) {
            table.innerHTML += `<p>${i} x ${j} = ${i * j}</p>`;
        }
        tableContent.appendChild(table);
    }

    // Event Listener para el botón "Iniciar Prueba"
    document.getElementById('start-test-btn').addEventListener('click', () => {
        window.location.href = '/learning.html'; // Asume que la página de prueba es index.html
    });
});
