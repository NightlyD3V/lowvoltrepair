import { gsap } from "gsap"

// ANIMATE LOGO ONCLICK
let clicked = false
const logo = document.body.querySelector("#logo")
const logo_tween = gsap.to("#logo", { rotation: 360, duration: 2, ease: "elastic"})
logo_tween.pause()
logo.addEventListener("click", (event) => {
    logo_tween.restart()
    clicked = true
    console.log("clicked")
    if (clicked) {
        logo_tween.play()
        clicked = false;
    } 
})