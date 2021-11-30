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




const isMob = window.innerWidth < 768 ? "mob_" : "";

















// /* test */
// /*---------------------------------------------------------------*/
// /*---------------------------------------------------------------*/
// /*---------------------------------------------------------------*/
class Test {
  // hidden = true;
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
    this.disableAnswerButton(); //заблочить кнопку "Ответить"
    this.$answerButton.classList.remove("test__btn--hidden");
    this.$list.addEventListener("click", this.listClickHandler);
    this.$answerButton.addEventListener("click", this.answerButtonClickHandler);
  }
  show() {
    this.$list.addEventListener("click", this.listClickHandler);
    // this.hidden = false;
    this.$test.classList.remove("test--hidden");
    if (window.innerWidth < 768) {
      this.scrollTop = window.pageYOffset;
      document.documentElement.classList.add("offscroll-y");
      document.body.classList.add("offscroll-y");
      // window.app.classList.add("offscroll-y");
      
    }
    gtag('event', `${isMob}button_test_${this.num}_start`);
  }
  hide() {
    // this.hidden = true;
    this.$test.classList.add("test--hidden");
    if (window.innerWidth < 768) {
      document.documentElement.classList.remove("offscroll-y");
      document.body.classList.remove("offscroll-y");
      // window.app.classList.remove("offscroll-y");
      window.scrollTo(0, this.scrollTop);
    }
  }
  resetLabels() {
    this.$labels.forEach( ($label) => {
      $label.classList.remove("test__label--red");
      $label.classList.remove("test__label--white");
    } ); // снять классы с ответов
  }
  continueButtonClickHandler = (e) => {
    this.closeTest();
    gtag('event', `${isMob}button_test_${this.num}_next`);
  }
  closeButtonClickHandler = (e) => {
    this.closeTest();
    gtag('event', `${isMob}button_test_${this.num}_exit`);
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
    gtag('event', `${isMob}button_test_${this.num}_final_${this.answer}`);
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

// const $ball2 = document.querySelector(".js-ball-2");

// let frames = 0;

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
    normalScrollElements: ".js-ball",
    // responsiveWidth: 1280,
    afterRender: () => {
      console.log("render");
    },
    afterLoad: async (origin, destination, direction) => {
      // if (window.innerWidth < 1280 && destination.index == 0) {
      //   fullpage_api.setResponsive(false);
      //   console.log("to 0");
      // }
      // if (window.innerWidth < 1280 && destination.index == 0) {
      //   fullpage_api.setResponsive(true);
      //   console.log("from 0");
      // }
      // if (window.innerWidth < 1280 && destination.index == 0) {
      //   fullpage_api.setResponsive(false);
      //   console.log("to 0");
      // }
      if (window.innerWidth < 1280) {return;}
      document.querySelectorAll('.js-section.active [data-aos]').forEach(($el) => {$el.classList.add("aos-animate")});
      fullpage_api.setAllowScrolling(false);
      
      await new Promise(resolve => {setTimeout( () => resolve(), 200);});
      fullpage_api.setAllowScrolling(true);
      $ball.addEventListener("click", ballClickHandler);
    },
    onLeave: async (origin, destination, direction) => {
      function removeAnimationClasses() {
        $ball.classList.remove("ball--center-to-down", "ball--top-to-center", "ball--center-to-right", "ball--left-to-center", "ball--down-to-center", "ball--center-to-top", "ball--center-to-left", "ball--right-to-center", "ball--animate");
      }
      if (window.innerWidth < 1280 && origin.index == 0) { fullpage_api.setResponsive(true); return; }
      if (window.innerWidth < 1280) { return; }
      if (origin.index == 0 && destination.index > 8) { $ball.classList.add("ball--stay", "ball--center"); return; }

      $ball.removeEventListener("click", ballClickHandler);
      await new Promise(resolve => {setTimeout( () => resolve(), 200);});

      if (origin.index == 8 && direction == "down") {
        $ball.classList.add("ball--stay");
      }
      else if (origin.index == 9 && destination.index == 8) {
        await new Promise(resolve => {setTimeout( () => resolve(), 2000);});
        $ball.classList.remove("ball--stay");
      }
      else if (origin.index > 1 && destination.index == 0) {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
      }
      else if (origin.index == 1 && destination.index == 0) {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-top");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
      }
      else if (origin.index == 0 && destination.index == 1) {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.add("ball--top-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
        $ball.classList.add("ball--center");   
      }
      else if (origin.index % 2 == 1 && direction == "down") {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-right");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
        $ball.classList.add("ball--left-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        $ball.classList.remove("ball--left-to-center");
        $ball.classList.remove("ball--animate");
        $ball.classList.add("ball--center");
        
      } 
      else if (origin.index % 2 == 0 && direction == "down") {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-down");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 500);}); //!!!
        removeAnimationClasses();
        $ball.classList.add("ball--top-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
        $ball.classList.add("ball--center");
      }
      else if (origin.index % 2 == 0 && direction == "up") {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-left");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
        $ball.classList.add("ball--right-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
        $ball.classList.add("ball--center");
      } 
      else if (origin.index % 2 == 1 && direction == "up") {
        $ball.classList.remove("ball--stay");
        $ball.classList.remove("ball--center");
        $ball.classList.add("ball--center-to-top");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 600);}); //!!!
        removeAnimationClasses();
        $ball.classList.add("ball--down-to-center");
        $ball.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses();
        $ball.classList.add("ball--center");
      }
    },
});

// fullpage_api.setKeyboardScrolling(false);


// if (window.innerWidth < 1280) {fullpage_api.setResponsive(true);}
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

const $titleDecor = document.querySelector(".js-title-decor");
$titleDecor.addEventListener("click", (e) => { fullpage_api.moveTo(10); });












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










///МЕТРИКИ

const logo_zictop = document.querySelector(".ev-logo_zictop");
const logo_zictop_metrika_event = (e) => {
  // ym(42193809, 'reachGoal', 'logo_zictop');
  gtag('event', 'logo_zictop', {
    // 'event_category': "bbb",
    // 'event_label': "ccc",
    // 'value': 10,
  });
} 
logo_zictop.addEventListener("click", logo_zictop_metrika_event);


const logo_chempionat = document.querySelector(".ev-logo_chempionat");
const logo_chempionat_metrika_event = (e) => { gtag('event', `${isMob}logo_chempionat`); } 
logo_chempionat.addEventListener("click", logo_chempionat_metrika_event);

const icon_next = document.querySelector(".ev-icon_next");
const icon_next_metrika_event = (e) => { gtag('event', `${isMob}icon_next`); } 
icon_next.addEventListener("click", icon_next_metrika_event);

const icon_up = document.querySelector(".ev-icon_up");
const icon_up_metrika_event = (e) => { gtag('event', `${isMob}icon_up`); } 
icon_up.addEventListener("click", icon_up_metrika_event);

const logo_sku_1 = document.querySelector(".ev-logo_sku_1");
const logo_sku_1_metrika_event = (e) => { gtag('event', `${isMob}logo_sku_1`); } 
logo_sku_1.addEventListener("click", logo_sku_1_metrika_event);

const logo_sku = document.querySelectorAll(".ev-logo_sku");
const logo_sku_metrika_event = (e) => { gtag('event', `${isMob}logo_sku_${e.target.dataset.num}`); };
logo_sku.forEach( (el) => {el.addEventListener("click", logo_sku_metrika_event);} );

const button_final_learn_more = document.querySelector(".ev-button_final_learn_more");
const button_final_learn_more_metrika_event = (e) => { gtag('event', `${isMob}button_final_learn_more`); } 
button_final_learn_more.addEventListener("click", button_final_learn_more_metrika_event);
