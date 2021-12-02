/* System */
import "core-js/stable";
import "regenerator-runtime/runtime";

/* App styles */
import "@/scss/main.scss";

/* Development stats */
import Development from './modules/Development.js';
if (process.env.NODE_ENV === "development") {Development.addWindowStatsElement();}

/* Safari 100vh fix */
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', appHeight);
appHeight();

/* Test */
import Test from "./modules/Test.js";

const tests = [];
const $tests = document.querySelectorAll(".js-test");
$tests.forEach( ($test) => {tests.push(new Test($test));} );
// клики на показ теста
const $testButtons = document.querySelectorAll(".js-test-button");
$testButtons.forEach( ($testButton) => {
  $testButton.addEventListener("click", (e) => { tests[e.target.dataset.num].show(); });
} );

/* Fullpage & Ball */
const ballClickHandler = (e) => { fullpage_api.moveSectionDown(); }

const $balls = document.querySelectorAll(".js-ball");
$balls.forEach( ($ball) => { $ball.addEventListener("click", ballClickHandler); } );

import fullpage from "./fullpage.js";
import "@/scss/fullpage.css";

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
      await new Promise(resolve => {setTimeout( () => resolve(), 500);});
      fullpage_api.setAllowScrolling(true);
      $balls.forEach( ($ball) => { $ball.addEventListener("click", ballClickHandler); } );
    },
    onLeave: async (origin, destination, direction) => {
      function removeAnimationClasses($ball) {
        $ball.classList.remove("ball--center-to-down", "ball--top-to-center", "ball--center-to-right", "ball--left-to-center", "ball--down-to-center", "ball--center-to-top", "ball--center-to-left", "ball--right-to-center", "ball--animate");
      }
      if (window.innerWidth < 1280 && origin.index == 0) { fullpage_api.setResponsive(true); return; }
      if (window.innerWidth < 1280) { return; }
      
      $balls.forEach( ($ball) => { $ball.removeEventListener("click", ballClickHandler); } );
      
      const $currentBall = document.querySelector(`.js-ball[data-num='${origin.index}']`);
      const $nextBall = document.querySelector(`.js-ball[data-num='${destination.index}']`);
      // console.log($currentBall);
      // console.log($nextBall);
      if (origin.index == 0 && destination.index == 1) { //переход c 0 на 1
        $nextBall.classList.remove("ball--center"); //ЧИСТКА ВСЕГДА
        
        await new Promise(resolve => {setTimeout( () => resolve(), 1600);});
        $nextBall.classList.add("ball--top-to-center");
        $nextBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses($nextBall);
        $nextBall.classList.add("ball--center");   
      }
      else if (origin.index == 1 && destination.index == 0) { // с 1 на 0
        await new Promise(resolve => {setTimeout( () => resolve(), 1600);});
        $currentBall.classList.remove("ball--center");
      }
      else if (origin.index == 8 && destination.index == 9) {
        return;
      }
      else if (origin.index == 0 && destination.index > 8) { 
        return;
      }
      else if (origin.index == 9 && destination.index == 8) {
        $nextBall.classList.add("ball--center");
        return;
      }
      else if (origin.index > 1 && destination.index == 0) {
        return;
      }
      else if (origin.index % 2 == 1 && direction == "down") { // c 1, 3, 5, 7 вниз
        $nextBall.classList.remove("ball--center"); //ЧИСТКА ВСЕГДА
        
        $currentBall.classList.remove("ball--center");

        $currentBall.classList.add("ball--center-to-right");
        $currentBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 1000);});
        removeAnimationClasses($currentBall);

        $nextBall.classList.add("ball--left-to-center");
        $nextBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses($nextBall);
        $nextBall.classList.add("ball--center");
      }
      else if (origin.index % 2 == 0 && direction == "down") { // c 2, 4, 6, 8 вниз
        $nextBall.classList.remove("ball--center"); //ЧИСТКА ВСЕГДА
        
        await new Promise(resolve => {setTimeout( () => resolve(), 1600);});
        $currentBall.classList.remove("ball--center");
        
        $nextBall.classList.add("ball--top-to-center");
        $nextBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses($nextBall);
        $nextBall.classList.add("ball--center");
      }
      else if (origin.index % 2 == 0 && direction == "up") { // c 2, 4, 6, 8 вверх
        $nextBall.classList.remove("ball--center"); //ЧИСТКА ВСЕГДА
        
        $currentBall.classList.remove("ball--center");
        $currentBall.classList.add("ball--center-to-left");
        $currentBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 1000);});
        removeAnimationClasses($currentBall);
        $nextBall.classList.add("ball--right-to-center");
        $nextBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses($nextBall);
        $nextBall.classList.add("ball--center");
      } 
      else if (origin.index % 2 == 1 && direction == "up") { // c 1, 3, 5, 7 вверх
        $nextBall.classList.remove("ball--center"); //ЧИСТКА ВСЕГДА
        
        await new Promise(resolve => {setTimeout( () => resolve(), 1000);});
        $currentBall.classList.remove("ball--center");

        $nextBall.classList.add("ball--down-to-center");
        $nextBall.classList.add("ball--animate");
        await new Promise(resolve => {setTimeout( () => resolve(), 750);});
        removeAnimationClasses($nextBall);
        $nextBall.classList.add("ball--center");
      }
    },
});

// if (window.innerWidth < 1280) {fullpage_api.setResponsive(true);}
window.addEventListener("resize", (e) => {
  if (window.innerWidth < 1280) {
    fullpage_api.setResponsive(true);
  } else {
    fullpage_api.setResponsive(false);
  }
});

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

/* Metrika */
import Metrika from "./modules/Metrika.js";

Metrika.createEvent(".ev-logo_zictop", "logo_zictop");
Metrika.createEvent(".ev-logo_chempionat", "logo_chempionat");
Metrika.createEvent(".ev-icon_next", "icon_next");
Metrika.createEvent(".ev-icon_up", "icon_up");
Metrika.createEvent(".ev-logo_sku_1", "logo_sku_1");
Metrika.createEvent(".ev-button_final_learn_more", "button_final_learn_more");
Metrika.createEvents(".ev-logo_sku", "logo_sku");

