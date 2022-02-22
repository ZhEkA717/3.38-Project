"use strict";

// tabs
window.addEventListener("DOMContentLoaded", () => {

    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();


    // timer

    const deadline = '2022-02-27';

    function getTime(endtime) {
        const kolvoMSec = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(kolvoMSec / (1000 * 60 * 60 * 24)),
            hours = Math.floor((kolvoMSec / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((kolvoMSec / (1000 * 60) % 60)),
            seconds = Math.floor((kolvoMSec / (1000)) % 60);

        if (kolvoMSec <= 0) {
            return {
                "kolvoMSec": 0,
                "days": 0,
                "hours": 0,
                "minutes": 0,
                "seconds": 0

            }
        } else {
            return {
                "kolvoMSec": kolvoMSec,
                "days": days,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds
            };
        }
    }

    function addZero(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function getElemOnPage(endtime) {
        const days = document.getElementById('days'),
            hours = document.getElementById("hours"),
            minutes = document.getElementById('minutes'),
            seconds = document.getElementById('seconds'),
            timerId = setInterval(timer, 1000);
        timer();

        function timer() {
            const getTimeReturn = getTime(endtime);
            days.innerHTML = addZero(getTimeReturn.days);
            hours.innerHTML = addZero(getTimeReturn.hours);
            minutes.innerHTML = addZero(getTimeReturn.minutes);
            seconds.innerHTML = addZero(getTimeReturn.seconds);
            if (getTimeReturn.kolvoMSec <= 0) {
                clearInterval(timerId);
            }
        }
    }

    getElemOnPage(deadline);


    // modal-window

    const btnOpenTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        btnClose = document.querySelector('.modal__close');

    btnOpenTrigger.forEach(btn => {
        btn.addEventListener('click', openModalTrigger);
    });

    btnClose.addEventListener('click', closeModal);

    function openModalTrigger(e) {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearInterval(setTimerId);
    }

    function closeModal(e) {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    const setTimerId = setTimeout(openModalTrigger, 5000);

    window.addEventListener('scroll', scrollOpenModal);

    function scrollOpenModal(e) {
        // console.log(window.pageYOffset);// сколько прокручено
        // console.log(document.documentElement.clientHeight);// высота видимой части
        // console.log(document.documentElement.scrollHeight);// высота всего скролла
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            openModalTrigger();
            window.removeEventListener('scroll', scrollOpenModal);
        }
    }

    // create newCard

    class newCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.cours = 27;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.conventer();
        }

        conventer() {
            this.price = this.price * this.cours;
        }

        render() {
            const div = document.createElement("div");

            if (this.classes.length === 0) {
                div.classList.add('menu__item');
            } else {
                this.classes.forEach(cls => {
                    div.classList.add(cls);
                })
            }

            div.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
            this.parent.appendChild(div);

        }
    }

    new newCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
    овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
    ценой и высоким качеством!`,
        9,
        '.menu .container'
    ).render();

    new newCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
    и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
    в ресторан!`,
        21,
        '.menu .container'
    ).render();

    new newCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
    продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
    количество белков за счет тофу и импортных вегетарианских стейков.`,
        17,
        '.menu .container',
        'menu__item'
    ).render();



    // forms (сбросить кэш shift + F5)

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "Загрузка",
        succses: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    }

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type','multipart/form-data');
            // когда используем XMLHttpRequest и FormData заголовок устанавливать не нужно,
            // он устанавливается автоматически (данные отправляются в формате FormData)

            request.setRequestHeader('Content-type', 'application/json');// данные отправляются в формате JSON

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            // request.send(formData);
            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.succses;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

        })
    }

});


