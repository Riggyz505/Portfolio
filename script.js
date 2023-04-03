// NOTE: show and hide the navbar
var startHeight = 0;
var triggerOnce = false;

function onWindowScroll() {
    let element = document.getElementsByClassName('site-nav')[0];
    let heightFromTopShow = (window.visualViewport.height * .6) - window.scrollY;


    if (heightFromTopShow <= 0) {
        element.style.visibility = "unset"

        if (!triggerOnce) {
            startHeight = window.scrollY;
            triggerOnce = true;
        }

        element.style.opacity = (window.scrollY - startHeight) + "%";
    }
    else {
        triggerOnce = false;
        element.style.visibility = "hidden"
    }
}

window.addEventListener('scroll', onWindowScroll);