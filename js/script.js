//Сценарій сайту
"use strict";

//=========================================================================================
//визначити за допомогою якого пристрою відкрито сайт:
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  macOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows());
  }
};

//визначення чи відкрито сайт на macOs
const isMacOs = () => navigator.platform.indexOf('Mac') > -1;

//додаємо клас до тегу body відповідно до пристою на якому відкрито сайт
isMobile.any() ? document.body.classList.add('_touch') : document.body.classList.add('_pc');

// Поява/зникнення тіла меню після настикання на "три крапочки" меню
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

// Плавне гортання до розділу менею після натискання на посилання в меню 
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');//записуємо в масив лише ті селектори які мають атрибут data-goto

if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
//=========================================================================================
//Робота випадаючого списку в блоці "About"
const arrayDropListItems = document.querySelectorAll('.about__item');

if (arrayDropListItems.length > 0) {
  arrayDropListItems.forEach(DropListItem => {
    DropListItem.addEventListener('click', openDropList);
  });

  function openDropList(e) {
    this.classList.toggle('_active');
  }
}
//=========================================================================================
//ScriptSwiper - first slider in Development block
new Swiper('.development__slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1420: {
      slidesPerView: 2,
    }
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-unique',
    prevEl: '.swiper-button-prev-unique',
  },
});

//=========================================================================================
//Script Swiper - second slider in Works block
//new Swiper('.development__slider');