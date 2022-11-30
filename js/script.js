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
const menuLinks = document.querySelectorAll('a[data-goto]') //записуємо в масив лише ті селектори які мають атрибут data-goto //  .querySelectorAll('.menu__link[data-goto]');

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
const devSlider = new Swiper('.development__slider', {
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
      spaceBetween: 25,
    }
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.dev-swiper-button-next-unique',
    prevEl: '.dev-swiper-button-prev-unique',
  },
});
//=========================================================================================
//Script Swiper - second slider in Works block
new Swiper('.works__slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1024: {
      autoplay: false,
      slidesPerView: 2,
      loop: false,
      spaceBetween: 30,
    }
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.wor-swiper-button-next-unique',
    prevEl: '.wor-swiper-button-prev-unique',
  },
});
//=========================================================================================
//Form all for form 
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    if (error === 0) {
      document.querySelector('.order__button_feedback').classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        document.querySelector('.order__button_feedback').classList.remove('_sending');
      } else {
        alert("Oшибка: заявка не отправлена");
        document.querySelector('.order__button_feedback').classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля');
    }

  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('_phone')) {
        if (!phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  };
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  };
  //function check phone number
  function phoneTest(input) {
    return /^\+380\d{3}\d{2}\d{2}\d{2}$/.test(input.value);
  };
  //function check email symbol
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  };
})
//=========================================================================================
