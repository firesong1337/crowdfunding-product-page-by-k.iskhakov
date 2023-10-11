var backersAmount = document.querySelector(".total-backers");
var totalPledge = document.querySelector(".total-pledge");
var backersVal = Number(backersAmount.innerText.replace(',',''));
var pledgeVal = Number(totalPledge.innerText.replace(',',''));
const radioBtns = document.querySelectorAll(".radio");
const modalThx = document.querySelector(".modal-thanks");
const confirmBtn = document.querySelector(".confirm");
const modal = document.querySelector(".modal");
const supportBtn = document.querySelector(".supportBtn");
const modalCloseBtn = document.querySelector(".modal-close");
const bookmarkBtn = document.querySelector(".bookmarkBtn");
let progressBar = document.querySelector("progress");
progressBar.value = pledgeVal;
let bambooLeft = 101;
let blackLeft = 64;
let mohoganyLeft = 0;
var selectRewardButtons = document.querySelectorAll(".select-reward-btn");
let itemsLeftMainFirst = document.querySelector('.items-left-main.first');
let itemsLeftMainSecond = document.querySelector('.items-left-main.second');
let itemsLeftMainThird = document.querySelector('.items-left-main.third');
const menuBtn = document.querySelector(".menu");
const navActive = document.querySelector("nav.active");

checkItemsLeftAll(); // проверка основных контейнеров


var isMenuOpen = false;
menuBtn.addEventListener("click", function() { // открытие меню
  if (isMenuOpen) {
    menuBtn.querySelector(".menu-icon").src = "./images/icon-hamburger.svg";
    navActive.style.display="none";
  } else {
    menuBtn.querySelector(".menu-icon").src = "./images/icon-close-menu.svg";
    navActive.style.display="flex";
  }
  isMenuOpen = !isMenuOpen;
});

bookmarkBtn.addEventListener("click", () => { //покраска кнопки
    var imgBookmark = document.querySelector(".bookmark-img g circle");
    var imgBookmarkInner = document.querySelector(".bookmark-img g path");
    var bookmarkBtnText = document.querySelector(".bookmarkBtn-text");
    if (imgBookmark.style.fill === "rgb(47, 47, 47)") {
        imgBookmark.style.fill = "hsl(176, 50%, 47%)";
        imgBookmarkInner.style.fill = "white";
        bookmarkBtnText.textContent = "Bookmarked";
        bookmarkBtnText.style.color = "hsl(176, 50%, 47%)";
    } else {
        imgBookmark.style.fill = "#2F2F2F";
        imgBookmarkInner.style.fill = "#B1B1B1";
        bookmarkBtnText.textContent = "Bookmark";
        bookmarkBtnText.style.color = "hsl(0, 0%, 48%)";
    }
    
});

supportBtn.addEventListener("click", () => { //открытие модального окна
    modal.showModal();
    checkItemsLeft(); //проверка модального окна
});
  
modalCloseBtn.onclick = () => { //закрытие модального окна
    modal.close();
}

confirmBtn.onclick = () => { //закрытие модального окна(с спасибо)
    modalThx.style.display = "none"
    modalThx.close();
}


radioBtns.forEach(function(radio) { // поведение при нажатии радиокнопки
    radio.addEventListener('click', function() {
        var container = this.closest('.support');
        
        document.querySelectorAll('.support').forEach(function(cont) {
            cont.style.borderColor = '';
        });
        
        container.style.borderColor = 'hsl(176, 50%, 47%)';

        var pledgeArea = container.querySelector('.pledge-area');
        
        document.querySelectorAll('.pledge-area').forEach(function(area) {
            area.style.maxHeight = '0';
            area.style.display = 'none';
            
        });
        
        if (this.checked) {
            pledgeArea.style.display = 'flex';
            setTimeout(function() {
                pledgeArea.style.maxHeight = '1000px'; // Изменение высоты для анимации
            }, 10);
        } else {
            pledgeArea.style.maxHeight = '0';
            pledgeArea.style.display = 'none';
        }

        var itemsLeft = container.querySelector(".items-left");
        var continueBtn = pledgeArea.querySelector(".continue-pledge");
        var inputVal = pledgeArea.querySelector(".pledge-val");

        continueBtn.onclick = () => {
            pledgeVal += Number(inputVal.value);
            backersVal += 1;
            totalPledge.textContent = numberWithThousands(pledgeVal);
            backersAmount.textContent = numberWithThousands(backersVal);
            if (itemsLeft !== null) {
                switch(itemsLeft.parentElement.parentElement.parentElement) {
                    case (document.querySelector(".support.val25")): 
                        bambooLeft -= 1;
                        itemsLeft.textContent = bambooLeft;
                        itemsLeftMainFirst.textContent = bambooLeft;
                        break;
                    case (document.querySelector(".support.val75")): 
                        blackLeft -= 1;
                        itemsLeft.textContent = blackLeft;
                        itemsLeftMainSecond.textContent = bambooLeft;
                        break;
                    case (document.querySelector(".support.val200")): 
                        mohoganyLeft -= 1;
                        itemsLeft.textContent = mohoganyLeft;
                        itemsLeftMainThird.textContent = bambooLeft;
                        break;
                }
            }
            modal.close();
            modalThx.style.display = "flex";
            modalThx.showModal();
        }
    });
    
});


selectRewardButtons.forEach(function(button) { //перенаправляет на модальное окно
    button.addEventListener("click", function () {
        modal.showModal();

        var containerSelector = button.getAttribute("data-container-selector");
        
        var containerToSelect = document.querySelector(containerSelector);
        containerToSelect.scrollIntoView({ behavior: "smooth" });
        var radioToSelect = containerToSelect.querySelector(".radio");

        radioToSelect.checked = true;
        radioToSelect.click();
    });
});


function checkItemsLeft() {
    var containers = document.querySelectorAll('.support');
    var isAnyContainerInactive = false; 

    containers.forEach(function (container) {
        var itemsLeft = container.querySelector(".items-left");
        if (itemsLeft !== null && Number(itemsLeft.textContent) === 0) {
            container.style.opacity = "0.5";
            container.style.pointerEvents = "none";
            isAnyContainerInactive = true;
        } else {
            container.style.opacity = "1";
            container.style.pointerEvents = "auto";
        }
    });

    return isAnyContainerInactive;
}

function checkItemsLeftAll() {
    var containers = document.querySelectorAll('.item-ctn');
    var isAnyContainerInactive = false; 

    containers.forEach(function (container) {
        var itemsLeft = container.querySelector(".items-left-main");
        if (itemsLeft !== null && Number(itemsLeft.textContent) === 0) {
            container.style.opacity = "0.5";
            container.style.pointerEvents = "none";
            isAnyContainerInactive = true;
        } else {
            container.style.opacity = "1";
            container.style.pointerEvents = "auto";
        }
    });
    return isAnyContainerInactive;
}

// 10000 -- 10,000 ставит запятую на тысячных
function numberWithThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}