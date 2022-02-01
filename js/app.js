document.addEventListener('DOMContentLoaded', function () {
    StickyNav();
    MobileMenu();
    ScrollTop();
    ActivateArrow();
});

function StickyNav() {
    const nav = document.getElementById('navegacion');

    document.addEventListener('scroll', function () {
        const topPos = parseInt(window.pageYOffset || document.documentElement.scrollTop);
        if (topPos > 0) {
            nav.classList.add('sticky-nav')
        } else {
            nav.classList.remove('sticky-nav')
        }
    });
}

function MobileMenu() {
    const menu = document.getElementById('navToggler');
    const nav = document.querySelector('.navToogle');

    menu.addEventListener('click', e => {
        nav.classList.toggle('show')
    })
}

function ScrollTop() {
    const arrow = document.getElementById('TopPage');

    arrow.addEventListener('click', e => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

function ActivateArrow() {
    const arrowBtn = document.getElementById("TopPage");
    window.onscroll = function () {
        scrollFunction(arrowBtn);
    };
}

function scrollFunction(e) {
    const arrowBtn = e;
    if (arrowBtn != null) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            arrowBtn.style.display = "block";
        } else {
            arrowBtn.style.display = "none";
        }
    }
}