import Metrika from "./Metrika.js";

export default class Test {
  $test = null;
  $closeButton = null;
  $continueButton = null;
  $labels = null;
  $answerButton = null;
  $list = null;
  $userAnswer = null;
  $scrollTop = null;
  num = null;
  answer = null;

  constructor($test) {
    this.$test = $test;
    this.$closeButton = this.$test.querySelector(".js-test-close-button");
    this.$continueButton = this.$test.querySelector(".js-continue-button");
    this.$labels = this.$test.querySelectorAll(".js-test-label");
    this.$right = this.$test.querySelector(".js-right");
    this.$answerButton = this.$test.querySelector(".js-answer-button");
    this.$list = this.$test.querySelector(".js-test-list");
    this.num = this.$test.dataset.num;
    this.init();
  }

  init() {
    this.$closeButton.addEventListener("click", this.closeButtonClickHandler);
    this.$continueButton.addEventListener("click", this.continueButtonClickHandler);
    this.disableAnswerButton();
    this.$answerButton.classList.remove("test__btn--hidden");
    this.$list.addEventListener("click", this.listClickHandler);
    this.$answerButton.addEventListener("click", this.answerButtonClickHandler);
  }
  show() {
    this.$list.addEventListener("click", this.listClickHandler);
    this.$test.classList.remove("test--hidden");
    if (window.innerWidth < 768) {
      this.scrollTop = window.pageYOffset;
      document.documentElement.classList.add("offscroll-y");
      document.body.classList.add("offscroll-y");
      
    }
    Metrika.fireEvent(`button_test_${this.num}_start`);
  }
  hide() {
    this.$test.classList.add("test--hidden");
    if (window.innerWidth < 768) {
      document.documentElement.classList.remove("offscroll-y");
      document.body.classList.remove("offscroll-y");
      window.scrollTo(0, this.scrollTop);
    }
  }
  resetLabels() {
    this.$labels.forEach( ($label) => {
      $label.classList.remove("test__label--red");
      $label.classList.remove("test__label--white");
    } );
  }
  continueButtonClickHandler = (e) => {
    this.closeTest();
    Metrika.fireEvent(`button_test_${this.num}_next`);
  }
  closeButtonClickHandler = (e) => {
    this.closeTest();
    Metrika.fireEvent(`button_test_${this.num}_exit`);
  }
  closeTest() {
    this.hide();
    this.$continueButton.classList.add("test__btn--hidden"); //скрыть кнопку "Продолжить"
    this.$answerButton.classList.remove("test__btn--hidden");
    this.resetLabels();
    this.$right.classList.add("test__right--hidden"); //скрыть плашку ответа
    this.disableAnswerButton(); // заблочить кнопку "Ответить"
  }
  disableAnswerButton() {
    this.$answerButton.disabled = true; // заблочить кнопку "Ответить"
  }
  enableAnswerButton() {
    this.$answerButton.disabled = false; // разблочить кнопку "Ответить"
  }
  listClickHandler = (e) => {
    if (e.target.classList.contains("js-test-label")) {
      this.answer = e.target.dataset.num;
      this.$userAnswer = e.target;
      this.resetLabels();
      this.$userAnswer.classList.add("test__label--white");
      this.enableAnswerButton(); // разблочить кнопку
    }
  }
  answerButtonClickHandler = (e) => {
    this.$right.classList.remove("test__right--hidden"); //показать плашку ответа
    if (!this.$userAnswer.classList.contains("js-right-label")) { //правильный ответ
      this.$userAnswer.classList.add("test__label--red");
      this.$right.previousSibling.classList.add("test__label--white");
    }
    this.$list.removeEventListener("click", this.listClickHandler); //запретить клики на ответы
    this.$answerButton.classList.add("test__btn--hidden");
    this.$continueButton.classList.remove("test__btn--hidden"); //показать кнопку "Продолжить"
    Metrika.fireEvent(`button_test_${this.num}_final_${this.answer}`);
  }
}