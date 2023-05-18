// navegacion
const navegacion = document.querySelector('.nav-principal');
const iconoNav = document.querySelector('.icon-nav');

console.log(navegacion);
console.log(iconoNav);


iconoNav.addEventListener('click', abrirNav);

function abrirNav() {
    if (navegacion.classList.contains('activo-nav')) {
        navegacion.classList.remove('activo-nav');
    } else{
        navegacion.classList.add('activo-nav');
    }
}