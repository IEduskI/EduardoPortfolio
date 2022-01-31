document.addEventListener('DOMContentLoaded', function () {
    StickyNav();
    MobileMenu();
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