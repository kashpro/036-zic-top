export default class Metrika {
  static isMob = window.innerWidth < 768 ? "mob_" : "";
  static createEvent = (selector, eventName) => {
    const $element = document.querySelector(selector);
    $element.addEventListener("click", () => {
      if (!gtag) {return false;}
      gtag('event', `${Metrika.isMob}${eventName}`);
    });
  }

  static createEvents = (selector, eventName) => {
    const $elements = document.querySelectorAll(selector);
    $elements.forEach( ($element) => {
      $element.addEventListener("click", (e) => {
        if (!gtag) {return false;}
        gtag('event', `${Metrika.isMob}${eventName}_${e.target.dataset.num}`);
      });
    });
  }

  static fireEvent = (eventName) => {
    if (!gtag) {return false;}
    gtag('event', `${Metrika.isMob}${eventName}`);
  }
}
