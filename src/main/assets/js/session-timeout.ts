import { throttle } from 'lodash';

const KEEP_ALIVE_URL = '/keep-alive';
const SESSION_TIMEOUT_URL = '/session-timeout';

const ACTIVITY_PING_INTERVAL = 1 * 60 * 1000; // 1 minute
const TOTAL_SESSION_TIMEOUT = 2 * 60 * 1000; // 3 minutes (time until redirect)
const COUNTDOWN_DURATION = 50;

const DIALOG_APPEARANCE_DELAY = TOTAL_SESSION_TIMEOUT - COUNTDOWN_DURATION * 1000;

let mainTimeoutId;
let countdownIntervalId;

let dialog;
let timerSpan;
let keepAliveButton;

const handleSessionTimeout = () => {
  window.location.href = SESSION_TIMEOUT_URL;
};

const startCountdown = () => {
  let timeLeft = COUNTDOWN_DURATION;

  // if (dialog && timerSpan) {
  //   timerSpan.textContent = String(timeLeft);
  //   dialog.classList.remove('govuk-!-display-none');
  // }

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

  // if (dialog) {
  //   dialog.classList.add('govuk-!-display-none');
  // }

  mainTimeoutId = setTimeout(startCountdown, DIALOG_APPEARANCE_DELAY);
};

document.addEventListener('DOMContentLoaded', () => {
  // dialog = document.getElementById('session-timeout-dialog');
  timerSpan = document.getElementById('countdown-timer');
  keepAliveButton = document.getElementById('keep-alive-button');

  const handleStaySignedInClick = () => {
    //   if (dialog) {
    //     dialog.classList.add('govuk-!-display-none');
    //   }

    clearInterval(countdownIntervalId);

    fetch(KEEP_ALIVE_URL, { cache: 'no-store' })
      .then(() => {
        resetTimeout();
      })
      .catch(() => {
        console.warn('Stay Signed In failed to connect.');
        resetTimeout();
      });
  };

  const pingUserActive = throttle(
    () => {
      if (dialog && !dialog.classList.contains('govuk-!-display-none')) {
        return;
      }
      fetch(KEEP_ALIVE_URL, { cache: 'no-store' })
        .then(() => resetTimeout())
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
      handleStaySignedInClick();
    });
  }

  resetTimeout();
});
