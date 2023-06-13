const dataLayer = window.dataLayer || [];
dataLayer.push({ event: 'Site language', language: document.documentElement.lang });
const errorList: HTMLUListElement | null = document.querySelector('.govuk-error-summary__list');
if (errorList) {
  const listElements = errorList.getElementsByTagName('li');
  for (let i = 0; i < listElements.length; i++) {
    dataLayer.push({
      event: 'Error shown',
      errormsg: listElements.item(i)?.firstElementChild?.textContent,
    });
  }
}
