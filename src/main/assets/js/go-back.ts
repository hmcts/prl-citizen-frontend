const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link:not(.history-back-ignore)');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    history.go(-1);
  };
}
