//  DATOS DEL CATÁLOGO 
const productos = [
    { marca: 'Austone', medida: '175/70R13', precio: 45, imagen: '17570R13.webp' },
    { marca: 'Austone', medida: '185/65R14', precio: 45, imagen: '18565R14.webp' },
    { marca: 'Austone', medida: '185/70R14', precio: 45, imagen: '18570R14.webp' },
    { marca: 'Austone', medida: '195R14', precio: 65, imagen: '195R14.webp' },
    { marca: 'Austone', medida: '185R14', precio: 65, imagen: '185R14.webp' },
    { marca: 'Austone', medida: '195/70R14', precio: 50, imagen: '19570R14.webp' },
    { marca: 'Austone', medida: '195R15', precio: 80, imagen: '195R15.webp' },
    { marca: 'Austone', medida: '195/60R15', precio: 55, imagen: '19560R15.webp' },
    { marca: 'Austone', medida: '195/65R15', precio: 55, imagen: '19565R15.webp' },
    { marca: 'Austone', medida: '205/55R16', precio: 55, imagen: '20555R16.webp' },
    { marca: 'Austone', medida: '225/45R17', precio: 70, imagen: '22545R17.webp' },
    { marca: 'Austone', medida: '235/75R15', precio: 90, imagen: '23575R15.webp' },
    { marca: 'Austone', medida: '235/70R16', precio: 85, imagen: '23570R16.webp' },
    { marca: 'Austone', medida: '245/75R16 LT', precio: 95, imagen: '24575R16LT.webp' },
    { marca: 'Austone', medida: '31x10.50R15', precio: 95, imagen: '31x1050R15.webp' },
    { marca: 'Austone', medida: '225/70R15', precio: 70, imagen: '22570R15.webp' },
    { marca: 'Austone', medida: '215/70R15', precio: 70, imagen: '21570R15.webp' },
    { marca: 'Austone', medida: '225/55R18', precio: 85, imagen: '22555R18.webp' },
    { marca: 'Austone', medida: '205/70R15', precio: 70, imagen: '20570R15.webp' },
    { marca: 'Austone', medida: '215/55R17', precio: 65, imagen: '21555R17.webp' },
    { marca: 'Triangle', medida: '205/R14', precio: 70, imagen: 'TRIANGLE205R14.webp' },
    { marca: 'Hifly', medida: '205/R14', precio: 75, imagen: 'HIFLY205R14.webp' },
    { marca: 'Austone', medida: '215/70R16', precio: 70, imagen: '21570R16.webp' },
    { marca: 'Austone', medida: '205/60R16', precio: 55, imagen: '20560R16.webp' },
    { marca: 'Austone', medida: '265/65R17 MT', precio: 110, imagen: '26565R17MT.webp' },
    { marca: 'Austone', medida: '265/70R16', precio: 90, imagen: '26570R16.webp' },
    { marca: 'Austone', medida: '205/65R15', precio: 55, imagen: '20565R15.webp' },
    { marca: 'Austone', medida: '265/70R17', precio: 100, imagen: '26570R17.webp' }
];


// CREACIÓN DE TARJETAS 
const campoBusqueda = document.querySelector('#buscar');
const formularioBusqueda = document.querySelector('.busqueda');
const aviso = document.querySelector('.resultado-busqueda');
const ordenar = document.querySelector('#ordenar');
const filtrarMedida = document.querySelector('#filtrar-medida');
const contenedorProductos = document.querySelector('.productos');

const CARPETA_IMAGENES = 'includes/img/';
const ENLACE_CONSULTA = 'https://wa.me/50377860872?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20y%20llantas.';

function crearTarjeta(producto, indice) {
    const tarjeta = document.createElement('article');
    tarjeta.dataset.indice = indice;
    tarjeta.dataset.precio = producto.precio;

    tarjeta.innerHTML = `
        <img src="${CARPETA_IMAGENES}${producto.imagen}"
             alt="Llanta ${producto.marca} ${producto.medida}"
             loading="lazy">
        <h3>Llanta ${producto.marca}</h3>
        <p>Medida: ${producto.medida}</p>
        <p class="precio">$${producto.precio.toFixed(2)}</p>
        <a href="${ENLACE_CONSULTA}">Consultar disponibilidad</a>
    `;

    return tarjeta;
}

productos.forEach((producto, indice) => {
    contenedorProductos.appendChild(crearTarjeta(producto, indice));
});

const tarjetas = Array.from(contenedorProductos.querySelectorAll('article'));


// BÚSQUEDA, FILTRO Y ORDEN
function medidaDe(tarjeta) {
    return tarjeta.querySelector('p').textContent.replace(/^Medida:\s*/i, '').trim();
}

[...new Set(tarjetas.map(medidaDe))]
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
    .forEach((medida) => {
        const opcion = document.createElement('option');
        opcion.value = medida;
        opcion.textContent = medida;
        filtrarMedida.appendChild(opcion);
    });

function textoNormalizado(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
}

function actualizarCatalogo() {
    const consulta = textoNormalizado(campoBusqueda.value);
    const medidaSeleccionada = filtrarMedida.value;
    const visibles = [];

    tarjetas.forEach((tarjeta) => {
        const coincide = textoNormalizado(tarjeta.textContent).includes(consulta);
        const coincideMedida = !medidaSeleccionada || medidaDe(tarjeta) === medidaSeleccionada;
        tarjeta.hidden = !(coincide && coincideMedida);
        if (tarjeta.hidden) {
            tarjeta.classList.remove('visible');
            tarjeta.dataset.enVista = '0';
        } else {
            visibles.push(tarjeta);
        }
    });

    const criterio = ordenar.value;
    if (criterio === 'medida') {
        visibles.sort((a, b) => medidaDe(a).localeCompare(medidaDe(b), 'es', { numeric: true }));
    } else if (criterio === 'menor-precio' || criterio === 'mayor-precio') {
        visibles.sort((a, b) => {
            const diferencia = Number(a.dataset.precio) - Number(b.dataset.precio);
            return criterio === 'menor-precio' ? diferencia : -diferencia;
        });
    } else {
        visibles.sort((a, b) => Number(a.dataset.indice) - Number(b.dataset.indice));
    }
    visibles.forEach((tarjeta) => contenedorProductos.appendChild(tarjeta));

    if (observadorScroll) {
        const tops = new Set();
        visibles.forEach((tarjeta) => {
            const rect = tarjeta.getBoundingClientRect();
            const enVista = rect.bottom > -25 && rect.top < window.innerHeight;
            tarjeta.dataset.enVista = enVista ? '1' : '0';
            tops.add(tarjeta.offsetTop);
        });
        actualizarFilasCatalogo(tops);
    }

    if (consulta || medidaSeleccionada) {
        aviso.hidden = false;
        aviso.textContent = visibles.length
            ? `${visibles.length} llanta(s) encontrada(s).`
            : 'No encontramos llantas con esos criterios. Prueba con otra medida o marca.';
    } else {
        aviso.hidden = true;
        aviso.textContent = '';
    }
}

campoBusqueda.addEventListener('input', actualizarCatalogo);

formularioBusqueda.addEventListener('submit', (evento) => {
    evento.preventDefault();
    actualizarCatalogo();
    document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth' });
});

ordenar.addEventListener('change', actualizarCatalogo);
filtrarMedida.addEventListener('change', actualizarCatalogo);


//  BOTÓN FLOTANTE DE WHATSAPP Y ENLACE ACTIVO AL SCROLLEAR
const btnWhatsapp = document.getElementById('btnWhatsapp');
const seccionInicio = document.getElementById('inicio');
const enlacesNav = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
const seccionesNav = enlacesNav
    .map((enlace) => document.querySelector(enlace.getAttribute('href')))
    .filter(Boolean);

function actualizarBotonWhatsapp() {
    const pasoInicio = seccionInicio.getBoundingClientRect().bottom <= window.innerHeight * 0.6;
    btnWhatsapp.classList.toggle('visible', pasoInicio);
}

function actualizarEnlaceActivo() {
    const puntoReferencia = window.innerHeight * 0.32;
    let idActivo = '';

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
        idActivo = seccionesNav[seccionesNav.length - 1]?.id || '';
    } else {
        seccionesNav.forEach((seccion) => {
            const rect = seccion.getBoundingClientRect();
            if (rect.top <= puntoReferencia && rect.bottom > 80) {
                idActivo = seccion.id;
            }
        });
    }

    enlacesNav.forEach((enlace) => {
        const activo = enlace.getAttribute('href') === `#${idActivo}`;
        enlace.classList.toggle('activo', activo);
        if (activo) {
            enlace.setAttribute('aria-current', 'location');
        } else {
            enlace.removeAttribute('aria-current');
        }
    });
}

function actualizarAlHacerScroll() {
    actualizarBotonWhatsapp();
    actualizarEnlaceActivo();
}

window.addEventListener('scroll', actualizarAlHacerScroll, { passive: true });
window.addEventListener('resize', actualizarAlHacerScroll);
actualizarAlHacerScroll();

document.getElementById('cargarMapa').addEventListener('click', (e) => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://maps.google.com/maps?q=San%20Miguel%2C%20El%20Salvador&t=&z=13&ie=UTF8&iwloc=&output=embed';
    iframe.title = 'Mapa de ubicación de El Frenazo en San Miguel, El Salvador';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    e.currentTarget.replaceWith(iframe);
});

// ANIMACIONES AL DESPLAZARSE (repetibles al subir/bajar, sin afectar #inicio / LCP)
function actualizarFilasCatalogo(topsAfectados) {
    const tarjetasActivas = tarjetas.filter((t) => !t.hidden);
    topsAfectados.forEach((topFila) => {
        const fila = tarjetasActivas.filter((t) => Math.abs(t.offsetTop - topFila) < 5);
        const filaVisible = fila.some((t) => t.dataset.enVista === '1');
        fila.forEach((t) => t.classList.toggle('visible', filaVisible));
    });
}

let observadorScroll = null;
const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefiereMenosMovimiento) {
    const elementosAnimados = document.querySelectorAll(
        '.header-catalogo, .busqueda, .filtrar, .productos article, ' +
        '.header-servicios, .servicios article, ' +
        '.header-contacto'
    );
    const seccionesLaterales = document.querySelectorAll('#nosotros, #contacto');

    observadorScroll = new IntersectionObserver((entradas) => {
        const filasActualizadas = new Set();

        entradas.forEach((entrada) => {
            const elemento = entrada.target;

            if (elemento.matches('.productos article')) {
                if (elemento.hidden) return;
                elemento.dataset.enVista = entrada.isIntersecting ? '1' : '0';
                filasActualizadas.add(elemento.offsetTop);
                return;
            }

            elemento.classList.toggle('visible', entrada.isIntersecting);
        });

        if (filasActualizadas.size > 0) {
            actualizarFilasCatalogo(filasActualizadas);
        }
    }, {
        threshold: 0.02,
        rootMargin: '25px 0px 0px 0px'
    });

    elementosAnimados.forEach((elemento) => {
        elemento.classList.add('revelar');
        observadorScroll.observe(elemento);
    });

    seccionesLaterales.forEach((seccion) => {
        seccion.classList.add('revelar-lados');
        observadorScroll.observe(seccion);
    });
}
