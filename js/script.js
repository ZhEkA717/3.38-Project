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
});

// timer

const deadline = '2022-02-08';

function getTime(endtime) {
    const kolvoMSec = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(kolvoMSec / (1000 * 60 * 60 * 24)),
        hours = Math.floor((kolvoMSec / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((kolvoMSec / (1000 * 60) % 60)),
        seconds = Math.floor((kolvoMSec / (1000)) % 60);

    if(kolvoMSec<=0){
        return{
            "kolvoMSec": 0,
            "days": 0,
            "hours": 0,
            "minutes": 0,
            "seconds": 0
        }
    }else{
        return {
            "kolvoMSec": kolvoMSec,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }
}
function addZero(num){
    if(num < 10){
        return "0"+num;
    }else{
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
        if (getTimeReturn.kolvoMSec <=0){
            clearInterval(timerId);
        }
    }
}

getElemOnPage(deadline);