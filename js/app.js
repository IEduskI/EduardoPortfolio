document.addEventListener('DOMContentLoaded', function () {
    StickyNav();
    MobileMenu();
    ScrollTop();
    ActivateArrow();
    galeriaProyectos();
    //mostrarProyecto();
});

const svg_cam = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><circle cx="12" cy="13" r="3" /></svg>'

const svg_link = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-external-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" /><line x1="10" y1="14" x2="20" y2="4" /><polyline points="15 4 20 4 20 9" /></svg>' 

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
            arrowBtn.classList.add('mostrar');
        } else {
            arrowBtn.classList.remove('mostrar');
        }
    }
}

async function galeriaProyectos() {
    const gal = document.getElementById('galeriaProyectos');

    try {
        // Obtener proyectos
        const url = '../Proyectos/proyectos.json';
        const resultado = await fetch(url);
        const db = await resultado.json();

        const { proyectos } = db;
        proyectos.forEach(proyecto => {
            const { id, nombre, categoria, imagenUrl } = proyecto;

            //Imagen del proyecto
            const imagen = document.createElement('img');
            imagen.src = imagenUrl;

            //Overlay del proyecto
            const overlay = document.createElement('div');
            overlay.id = 'overlay';
            overlay.classList.add('overlay-project');

            //Div para la informacion del proyecto
            const info = document.createElement('div');
            info.classList.add('info-proyecto');

            const nombrePro = document.createElement('h3');
            const catePro = document.createElement('p');
            nombrePro.innerText = nombre;
            catePro.innerText = categoria;

            info.append(nombrePro, catePro);

            //Icono de camara
            const divCamara = document.createElement('div');
            divCamara.classList.add('icono-camara');

            const camaraIcon = document.createElement('a');
            camaraIcon.dataset.id = id;
            camaraIcon.classList.add('icon-p');
            camaraIcon.innerHTML = svg_cam;
            camaraIcon.href = 'javascript:void(0)'

            divCamara.appendChild(camaraIcon);

            //Div del proyecto
            const divProyecto = document.createElement('div');
            divProyecto.classList.add('proyecto', 'sombra', 'position-relative');
            divProyecto.append(imagen, overlay, info, divCamara);

            //Agregar a la galeria
            gal.appendChild(divProyecto)
        });
    } catch (error) {
        console.log(error);
    }

    //Retorna todos los enlaces del proyecto
    mostrarProyecto(document.getElementsByClassName('icon-p'));
}

function mostrarProyecto(e) {
    const btn = e;

    for (let i = 0; i < btn.length; i++) {
        const id = btn[i].dataset.id;
        btn[i].addEventListener('click', () => mostrarImagen(id))
    }
}

async function mostrarImagen(id) {
    const imagenId = id;

    try {
        const url = '../Proyectos/proyectos.json';
        const resultado = await fetch(url);
        const db = await resultado.json();

        const { proyectos } = db;

        const proyecto = proyectos.find(proyecto => proyecto.id == imagenId);

        //generando la imagen
        const imagen = document.createElement('img');
        imagen.src = proyecto.imagenUrl;
        imagen.classList.add('imagen-galeria');

        //Descripcion del proyecto
        const title = document.createElement('a');
        title.href = proyecto.url;
        title.target = 'blank';
        title.innerHTML = proyecto.nombre+' '+ svg_link;

        const desc = document.createElement('p');
        desc.innerText = proyecto.descripcion;

        const divDesc = document.createElement('div');
        divDesc.append(title, desc);
        divDesc.classList.add('desc-proyecto');


        const overlay = document.createElement('div');
        overlay.append(imagen,divDesc);
        overlay.classList.add('big-overlay');

        //Boton para cerrar imagen
        const cerrarImagen = document.createElement('p');
        cerrarImagen.textContent = 'X';
        cerrarImagen.classList.add('btn-cerrar');

        overlay.appendChild(cerrarImagen);

        //Mostrar en el html
        const body = document.querySelector('body'); //agregando al body
        body.appendChild(overlay);
        body.classList.add('fijar-body'); //Bloquea el scroll de la pagina

        //Al dar click, cierra la imagen
        overlay.onclick = function () {
            overlay.remove();
            body.classList.remove('fijar-body');
        }

        //cerrar imagen al presionar el boton
        cerrarImagen.onclick = function () {
            overlay.remove();
            body.classList.remove('fijar-body');
        }
    }
    catch (error) {
        console.log(error)
    }
}