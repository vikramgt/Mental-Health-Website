document.addEventListener("DOMContentLoaded", function() {
    const focusButton = document.getElementById("focus-button");
    const focusModal = document.getElementById("focus-modal");
    const timerButtons = document.querySelectorAll(".timer-button");
    const countdownTimer = document.getElementById("countdown-timer");
    const timerMessage = document.getElementById("timer-message");
    const closeIcon = document.querySelector(".close");

    let countdownInterval;
    let countdownMinutes = 0;
    let countdownSeconds = 0;

    focusButton.addEventListener("click", function() {
        focusModal.style.display = "block";
    });

    closeIcon.addEventListener("click", function() {
        stopCountdown();
    });

    timerButtons.forEach(button => {
        button.addEventListener("click", function() {
            countdownMinutes = parseInt(this.getAttribute("data-minutes"));
            startCountdown(countdownMinutes);
        });
    });

    function startCountdown(minutes) {
        countdownSeconds = 0;
        countdownMinutes = minutes;
        updateCountdownDisplay();

        countdownInterval = setInterval(function() {
            if (countdownSeconds > 0) {
                countdownSeconds--;
            } else if (countdownMinutes > 0) {
                countdownMinutes--;
                countdownSeconds = 59;
            } else {
                stopCountdown();
            }
            updateCountdownDisplay();
        }, 1000);
    }

    function stopCountdown() {
        clearInterval(countdownInterval);
        countdownTimer.textContent = "00:00";
        timerMessage.textContent = "You have completed your focus time. Feel free to explore the site.";
        focusModal.style.display = "none";
    }

    function updateCountdownDisplay() {
        const minutesString = countdownMinutes < 10 ? "0" + countdownMinutes : countdownMinutes;
        const secondsString = countdownSeconds < 10 ? "0" + countdownSeconds : countdownSeconds;
        countdownTimer.textContent = minutesString + ":" + secondsString;
        timerMessage.textContent = "Stay on the site until the timer ends.";
    }
});
