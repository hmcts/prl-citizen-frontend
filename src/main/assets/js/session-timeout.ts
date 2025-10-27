import { throttle } from 'lodash';

const KEEP_ALIVE_URL = '/keep-alive';
const SESSION_TIMEOUT_URL = '/session-timeout';

const ACTIVITY_PING_INTERVAL = 1 * 60 * 1000; // 1 minute
const TOTAL_SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes (time until redirect)
const COUNTDOWN_DURATION = 10; // 10 seconds (time dialog is visible)

const DIALOG_APPEARANCE_DELAY = TOTAL_SESSION_TIMEOUT - COUNTDOWN_DURATION * 1000;

let mainTimeoutId;
let countdownIntervalId;

const dialog = document.getElementById('session-timeout-dialog');
const timerSpan = document.getElementById('countdown-timer');
const keepAliveButton = document.getElementById('keep-alive-button');

const handleSessionTimeout = () => {
  window.location.href = SESSION_TIMEOUT_URL;
};

const startCountdown = () => {
  let timeLeft = COUNTDOWN_DURATION;

  if (dialog && timerSpan) {
    timerSpan.textContent = String(timeLeft);
    dialog.classList.remove('govuk-!-display-none');
  }

  mainTimeoutId = setTimeout(handleSessionTimeout, COUNTDOWN_DURATION * 1000);

  countdownIntervalId = setInterval(() => {
    timeLeft--;
    if (timerSpan) {
      timerSpan.textContent = String(timeLeft);
    }

    if (timeLeft <= 0) {
      clearInterval(countdownIntervalId);
    }
  }, 1000);
};

const resetTimeout = () => {
  clearTimeout(mainTimeoutId);
  clearInterval(countdownIntervalId);

  if (dialog) {
    dialog.classList.add('govuk-!-display-none');
  }

  mainTimeoutId = setTimeout(startCountdown, DIALOG_APPEARANCE_DELAY);
};

const pingUserActive = throttle(
  () => {
    fetch(KEEP_ALIVE_URL, { cache: 'no-store' })
      .then(() => resetTimeout()) // Reset after successful ping
      .catch(() => console.warn('Keep-alive failed'));
  },
  ACTIVITY_PING_INTERVAL,
  { trailing: false }
);

['click', 'mousemove', 'keypress', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, pingUserActive);
});

if (keepAliveButton) {
  keepAliveButton.addEventListener('click', event => {
    event.preventDefault();
    pingUserActive();
  });
}

resetTimeout();
