import "core-js/stable";
import "regenerator-runtime/runtime";

/* App styles */
import "@/scss/main.scss";

/* Development stats */
import Development from './development.js';
if (process.env.NODE_ENV === "development") {Development.addWindowStatsElement();}



/* Safari 100vh fix */
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', appHeight);
appHeight();






















// /* test */
// /*---------------------------------------------------------------*/
// /*---------------------------------------------------------------*/
// /*---------------------------------------------------------------*/
class Test {
  hidden = true;
  $test = null;
  $closeButtons = null;
  $continueButton = null;
  $labels = null;
  $answerButton = null;
  $list = null;
  $userAnswer = null;

  constructor($test) {
    this.$test = $test;
    this.$closeButtons = this.$test.querySelectorAll(".js-test-close-button");
    this.$continueButton = this.$test.querySelector(".js-continue-button");
    this.$labels = this.$test.querySelectorAll(".js-test-label");
    this.$right = this.$test.querySelector(".js-right");
    this.$answerButton = this.$test.querySelector(".js-answer-button");
    this.$list = this.$test.querySelector(".js-test-list");
    this.init();
  }

  init() {
    this.$closeButtons.forEach( ($closeButton) => { $closeButton.addEventListener("click", this.closeButtonClickHandler); } );
    this.disableAnswerButton(); //заблочить кнопку "Ответить"
    this.$answerButton.classList.remove("test__btn--hidden");
    this.$list.addEventListener("click", this.listClickHandler);
    this.$answerButton.addEventListener("click", this.answerButtonClickHandler);
  }
  show() {
    this.$list.addEventListener("click", this.listClickHandler);
    this.hidden = false;
    this.$test.classList.remove("test--hidden");
  }
  hide() {
    this.hidden = true;
    this.$test.classList.add("test--hidden");
  }
  resetLabels() {
    this.$labels.forEach( ($label) => {
      $label.classList.remove("test__label--red");
      $label.classList.remove("test__label--white");
    } ); // снять классы с ответов
  }
  closeButtonClickHandler = (e) => {
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
    
  }
}

const tests = [];

const $tests = document.querySelectorAll(".js-test");
$tests.forEach( ($test) => {tests.push(new Test($test));} );

// клики на показ теста
const $testButtons = document.querySelectorAll(".js-test-button");
$testButtons.forEach( ($testButton) => {
  $testButton.addEventListener("click", (e) => { tests[e.target.dataset.num].show(); });
} );

// /*---------------------------------------------------------------*/
// /*---------------------------------------------------------------*/
// /*---------------------------------------------------------------*/


















const ballClickHandler = (e) => { fullpage_api.moveSectionDown(); }

const $ball = document.querySelector(".js-ball");
$ball.addEventListener("click", ballClickHandler);

const $ball2 = document.querySelector(".js-ball-2");

let frames = 0;

// function animateTopToDown() {
//   let frames = 0;
//   let anim = setInterval( () => {$ball.style.backgroundPositionY = (frames * 4) + "%"} , 30);
//   frames++;
//   console.log(frames);
//   if (frames == 26) {clearInterval(anim);}
// }

// const $videoRight = $ball.querySelector(".js-video-right");
// window.a = $videoRight;
// const $videoFalling = $ball.querySelector(".js-video-falling");
// window.b = $videoFalling;

/* fullpage scroll */
import fullpage from "./fullpage.js";
import "@/scss/fullpage.css";


// if (window.innerWidth >= 1280) {
let myFullpage = new fullpage('#app', {
    lockAnchors: true,
    fitToSection: false,
    scrollBar: true,
    scrollingSpeed: 1350,
    sectionSelector: '.js-section',
    responsiveHeight: 0,
    
    afterLoad: async (origin, destination, direction) => {
      if (window.innerWidth < 1280) {return;}
      document.querySelectorAll('.js-section.active [data-aos]').forEach(($el) => {$el.classList.add("aos-animate")});
      fullpage_api.setAllowScrolling(false);
      await new Promise(resolve => {setTimeout( () => resolve(), 200);});
      fullpage_api.setAllowScrolling(true);
    },
    onLeave: async (origin, destination, direction) => {
      // console.log(origin.index, destination.index, direction);
      // fullpage_api.setAllowScrolling(false);
      if (window.innerWidth < 1280) {return;}
      // await new Promise(resolve => {setTimeout( () => resolve(), 200);});
      if (origin.index == 8 && direction == "down") {
        $ball.classList.add("hide");
        $ball2.classList.remove("hide");
      }
      else if (origin.index == 9 && direction == "up") {
        await new Promise(resolve => {setTimeout( () => resolve(), 2000);});
        $ball.classList.remove("hide");
        $ball2.classList.add("hide");
      }
      else if (destination.index == 0) {
        $ball.removeEventListener("click", ballClickHandler);
        // $ball.classList.remove("ball--stay");
        $ball.classList.remove("hide");
        $ball2.classList.add("hide");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-down");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--center-to-down");
        $ball.classList.remove("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 500);});
        $ball.addEventListener("click", ballClickHandler);
      }
      else if (origin.index == 0) {
        $ball.removeEventListener("click", ballClickHandler);
        // $ball.classList.remove("ball--stay");
        $ball.classList.remove("hide");
        $ball2.classList.add("hide");
        $ball.classList.remove("ball--center");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.add("ball--top-to-center");
        $ball.classList.add("ball--animate");
        // animateTopToDown();
        // setInterval( () => {console.log(Math.random());} ,1000);
        // let frames = 0;
        // let anim = setInterval( () => {$ball.style.backgroundPositionY = (frames * 4) + "%"} , 1000);
        // frames++;
        // console.log(frames);
        // if (frames == 26) {clearInterval(anim);}

        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--top-to-center");
        $ball.classList.remove("ball--animate");
        $ball.classList.add("ball--center");
        await new Promise(resolve => {setTimeout( () => resolve(), 500);});
        $ball.addEventListener("click", ballClickHandler);
      }
      else if ((origin.index == 1 || origin.index == 3 || origin.index == 5 || origin.index == 7) /*&& direction == "down"*/) {
        $ball.removeEventListener("click", ballClickHandler);
        // $ball.classList.remove("ball--stay");
        $ball.classList.remove("hide");
        $ball2.classList.add("hide");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-right");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--center-to-right");
        $ball.classList.remove("ball--animate");
        $ball.classList.add("ball--left-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--left-to-center");
        $ball.classList.remove("ball--animate");
        $ball.classList.add("ball--center");
        await new Promise(resolve => {setTimeout( () => resolve(), 500);});
        $ball.addEventListener("click", ballClickHandler);
      } 
      else if ((origin.index == 2 || origin.index == 4 || origin.index == 6 | origin.index == 8) /*&& direction == "down"*/) {
        $ball.removeEventListener("click", ballClickHandler);
        // $ball.classList.remove("ball--stay");
        $ball.classList.remove("hide");
        $ball2.classList.add("hide");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-down");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--center-to-down");
        $ball.classList.remove("ball--animate");
        $ball.classList.add("ball--top-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--top-to-center");
        $ball.classList.remove("ball--animate");
        $ball.classList.add("ball--center");
        await new Promise(resolve => {setTimeout( () => resolve(), 500);});
        $ball.addEventListener("click", ballClickHandler);
      }
    },
});

// fullpage_api.setKeyboardScrolling(false);


if (window.innerWidth < 1280) {fullpage_api.setResponsive(true);}
window.addEventListener("resize", (e) => {
  if (window.innerWidth < 1280) {
    fullpage_api.setResponsive(true);
  } else {
    fullpage_api.setResponsive(false);
  }
});

/* arrow buttons */
const $arrowDownButton = document.querySelector(".js-arrow-down-button");
$arrowDownButton.addEventListener("click", (e) => { fullpage_api.moveSectionDown(); });

const $arrowUpButton = document.querySelector(".js-arrow-up-button");
$arrowUpButton.addEventListener("click", (e) => { fullpage_api.moveTo(1); });














/* AOS */
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  duration: 1000,
  anchorPlacement: 'top-bottom',
});



document.querySelectorAll('[data-aos]').forEach(($el) => { $el.classList.add("aos-init"); });
window.addEventListener('load', AOS.refresh);