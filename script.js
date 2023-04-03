// NOTE: buttons to smoothly animate to id tag
var navButtons = document.getElementsByClassName("js-nav-button");

function navigateTo(target) {
    document.getElementById(target).scrollIntoView({
        behavior: "smooth",
    });
}

for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", () => { navigateTo(navButtons[i].getAttribute("data-target")); });
}

// NOTE: show and hide the navbar
var navShown = false;

function onWindowScroll() {
    let navElement = document.getElementById('site-nav');
    let heightFromTop = (window.visualViewport.height * .6) - window.scrollY;

    if (heightFromTop < 0 && !navShown) {
        navElement.style.visibility = "unset";

        navElement.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 250,
            easing: 'ease-out',
            fill: 'both'
        });

        navShown = true;
    }
    else if (heightFromTop > 0 && navShown) {
        let cb = navElement.animate([
            { opacity: "1" },
            { opacity: "0" }
        ], {
            duration: 250,
            easing: 'ease-in',
            fill: 'both'
        });

        cb.addEventListener("finish", () => { navElement.style.visibility = "hidden"; })

        navShown = false;
    }
}

window.addEventListener('scroll', onWindowScroll);

// NOTE: button to smoothly animate to tag
var gridItems = document.getElementsByClassName("grid-item");
var altBackButton = document.getElementById("js-exit-portfolio");

function toggleAltView() {
    document.getElementsByClassName("portfolio-grid")[0].style.display = "none";
    document.getElementsByClassName("portfolio-alt")[0].style.display = "flex";
}

function toggleGridView() {
    document.getElementsByClassName("portfolio-grid")[0].style.display = "grid";
    document.getElementsByClassName("portfolio-alt")[0].style.display = "none";
}

for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", toggleAltView);
}

altBackButton.addEventListener("click", toggleGridView);

// NOTE: say information was submitted
var flavorDiv = document.getElementById("flavor-alert");
var submitButton = document.getElementById("js-submit");

submitButton.addEventListener("click", () => {
    // show a hidden div
    flavorDiv.style.visibility = "unset";

    let cb = flavorDiv.animate([
        { opacity: "0" },
        { opacity: "1" }
    ], {
        duration: 350,
        easing: 'ease-out',
        fill: 'both'
    });

    cb.addEventListener("finish", () => {
        setTimeout(() => {
            let cbo = flavorDiv.animate([
                { opacity: "1" },
                { opacity: "0" }
            ], {
                duration: 250,
                easing: 'ease-in',
                fill: 'both'
            });

            cbo.addEventListener("finish", () => { flavorDiv.style.visibility = "hidden"; })
        }, "1000");
    })
});

// NOTE: the landing page effect
const blob = document.getElementById("js-hover-effect");

window.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX + window.scrollX}px`,
        top: `${clientY + window.scrollY}px`,
        backgroundPosition: `${-clientX + window.scrollX}px ${-clientY + window.scrollY}px`
    }, { duration: 1000, fill: "forwards" });
}