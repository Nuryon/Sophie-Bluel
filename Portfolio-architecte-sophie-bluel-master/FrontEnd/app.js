let modal = null


const openModal = function (e) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    if (href) {
        const target = document.querySelector(href);
        if (target) {
            target.style.display = 'block';
            target.removeAttribute("aria-hidden");
            target.setAttribute("aria-modal", "true");
            modal = target
            modal.addEventListener("click", closemModal)
            modal.querySelector(".js-modal-close").addEventListener("click",closemModal)
            modal.querySelector(".js-modal-stop").addEventListener("click",stopPropagation)
        } else {
            console.error("Élément cible non trouvé  :");
        }
    } 
}

const closemModal = function (e){
    e.preventDefault();
    
        if (modal )  {
            modal.style.display = 'none';
            modal.setAttribute("aria-hidden", 'true');
            modal.removeAttribute("aria-modal",);
            modal = target
            modal.removeEventListener("click", closemModal)
            modal.querySelector(".js-modal-close").removeEventListenerEventListener("click",closemModal)
            modal.querySelector(".js-modal-stop").removeEventListener("click",stopPropagation)
            modal = null

        }else {
            console.error("Élément cible non trouvé  :");
    }
}

const stopPropagation = function(e){
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
})