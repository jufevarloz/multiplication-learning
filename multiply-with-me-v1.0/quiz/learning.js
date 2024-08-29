document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = {};
    let score = 0;
    let timerInterval;
    let isPaused = false;
    let isPlaying = false;

    // Event Listeners for buttons
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', pauseGame);
    document.getElementById('stop-btn').addEventListener('click', stopGame);
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
    document.getElementById('answer').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    document.getElementById('learn-tables-btn').addEventListener('click', goToLearningSection);

    function startGame() {
        if (!isPlaying) {
            isPlaying = true;
            document.getElementById('question-view').classList.add('active');
            document.getElementById('feedback').innerText = '';
            nextQuestion();
        }
    }

    function pauseGame() {
        if (isPlaying && !isPaused) {
            isPaused = true;
            clearInterval(timerInterval);
            document.getElementById('feedback').innerText = '¡Pausado!';
            document.getElementById('feedback').style.color = 'orange';
        }
    }

    function stopGame() {
        if (isPlaying) {
            isPlaying = false;
            isPaused = false;
            clearInterval(timerInterval);
            document.getElementById('question-view').classList.remove('active');
            document.getElementById('feedback').innerText = '¡Juego detenido!';
            document.getElementById('feedback').style.color = 'red';
        }
    }

    function nextQuestion() {
        if (isPlaying && !isPaused) {
            clearInterval(timerInterval);
            document.getElementById('feedback').innerText = '';
            
            const multiplier = Math.floor(Math.random() * 10) + 1;
            const range = Math.floor(Math.random() * 10) + 1;
            currentQuestion = { multiplier, range, answer: multiplier * range };

            document.getElementById('question-text').innerText = `${multiplier} x ${range} = ?`;
            document.getElementById('answer').value = '';

            let timeLeft = 5;
            document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    timeLeft--;
                    document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}s`;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        checkAnswer();
                    }
                }
            }, 1000);
        }
    }

    function checkAnswer() {
        if (isPlaying && !isPaused) {
            const answer = parseInt(document.getElementById('answer').value);
            if (answer === currentQuestion.answer) {
                document.getElementById('feedback').innerText = '¡Correcto!';
                document.getElementById('feedback').style.color = 'green';
                score += 10;
            } else {
                const feedbackText = document.getElementById('timer').innerText.includes('0s') ? '¡Ups!, se te acabó el tiempo' : 'Incorrecto!';
                document.getElementById('feedback').innerText = feedbackText;
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
    }

    function goToLearningSection() {
        // Replace with the actual URL or navigation logic for the learning section
        window.location.href = '/index.html'; // Asume que tienes un archivo llamado learning.html para la sección de aprendizaje
    }
});
