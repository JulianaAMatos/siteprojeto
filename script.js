const  carrossel = document.querySelector(".carrosel");
const  container = document.querySelector(".container");
const arrowBtns = document.querySelectorAll(".carrossel i");
const firstCardWidth = container.querySelector(".card").offsetWidth;
const containerChildrens = [...container.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

//obtenha o número de cartas que cabem no carrossel de uma só vez//
let cardView = Math.round(container.offsetWidth / containerChildrens)

//inserção dos últimos cartões no início do carrossel para tornar a rolagem infinita
containerChildrens.slice(0, cardView).reverse().forEach(card => {
    container.insertAdjacentHTML("afterbegin", card.outerHTML)
})

//inserção dos primeiros cartões no início do carrossel para tornar a rolagem infinita
containerChildrens.slice(0, cardView).forEach(card => {
    container.insertAdjacentHTML("beforeend", card.outerHTML)
})

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        container.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    container.classList.add("dragging");
// registra o cursor inicial e a posição de rolagem do carrose
    startX = e.pageX;
    startScrollLeft= container.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; 
    // Atualize a posição de rolagem do carrossel com base no cursor movido
   container.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    container.classList.remove("dragging");
}

const rePAut = () => {
    if(window.innerWidth < 800) return; 
    timeoutId = setTimeout(() => container.scrollLeft += firstCardWidth, 2500)
}
 rePAut();



const infiniteScroll = () => {

    if(container.scrollLeft === 0) {
        container.classList.add("no-transition");
        container.scrollLeft = container.scrollWidth - ( 2 * container.offsetWidth);
        container.classList.remove("no-transition");

    }
    else if (Math.ceil(container.scrollLeft) === container.scrollWidth - container.offsetWidth){
        container.classList.add("no-transition")
        container.scrollLeft = container.offsetWidth;
        container.classList.remove("no-transition")
    }
    //limpe o tempo limite existente e inicie a reprodução automática se o mouse não estiver pairando sobre o carrossel//
    clearTimeout(timeoutId);
    if(!carrossel.matches(":hover")) rePAut();
}

container.addEventListener("mousedown", dragStart);
container.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
container.addEventListener('scroll', infiniteScroll)
carrossel.addEventListener("mouseenter", () =>   clearTimeout(timeoutId));
carrossel.addEventListener("mouseleave", rePAut);
