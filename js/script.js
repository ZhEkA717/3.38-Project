"use strict";

window.addEventListener("DOMContentLoaded", () => {

    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items");

        function hideTabContent(){
            tabsContent.forEach(item=>{
                item.classList.add('hide');
                item.classList.remove('show','fade');
            });

            tabs.forEach(tab=>{
                tab.classList.remove("tabheader__item_active");
            });
        }

        function showTabContent(i=0){
            tabsContent[i].classList.add('show','fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add("tabheader__item_active");
        }

        tabsParent.addEventListener('click',(event)=>{
            let target = event.target;

            if(target && target.classList.contains("tabheader__item")){
                tabs.forEach((item,i)=>{
                    if(item == target){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
        
        hideTabContent();
        showTabContent();
});


