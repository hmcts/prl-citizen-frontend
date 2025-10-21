import { throttle } from 'lodash';

const KEEP_ALIVE_URL = '/keep-alive'; // must match your route
const SESSION_TIMEOUT_URL = '/session-timeout';

const eventTimer = 1 * 60 * 1000;
const sessionTimeoutInterval = 3 * 60 * 1000;
let timeout;

const pingUserActive = throttle(
  () => {
    fetch(KEEP_ALIVE_URL, { cache: 'no-store' })
      .then(() => resetTimeout())
      .catch(() => console.warn('Keep-alive failed'));
  },
  eventTimer,
  { trailing: false }
);

const handleSessionTimeout = () => {
  window.location.href = SESSION_TIMEOUT_URL;
};

const resetTimeout = () => {
  clearTimeout(timeout);
  timeout = setTimeout(handleSessionTimeout, sessionTimeoutInterval);
};

['click', 'mousemove', 'keypress', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, pingUserActive);
});

resetTimeout();
