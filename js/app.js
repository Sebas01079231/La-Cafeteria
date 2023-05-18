// variables
const campos = {
    nombre: '',
    email: ''
};
const formulario = document.querySelector('form');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');



// eventos
nombre.addEventListener('input', leertexto);
email.addEventListener('input', leertexto);
formulario.addEventListener('submit', validacion);



// funciones
function leertexto(e){
    campos[e.target.id] = e.target.value;
    console.log(campos);
}
function validacion(e) {
    e.preventDefault();
    const {nombre, email} = campos;

    if (nombre === '' || email === '') {
        alertaEror();

        return;
    }

    alertaValida();
}

function alertaValida(e) {
    const valida = document.createElement('P');
    valida.classList.add('valida');
    valida.textContent = 'Registro Exitosa'
    formulario.appendChild(valida);

    setTimeout(() => {
        valida.remove();
    }, 5000);    
    setTimeout(() => {
        location.reload()
    }, 4000);    
}

function alertaEror(e) {
    const error = document.createElement('P');
    error.classList.add('error');
    error.textContent = '*Campos obligatorios'
    formulario.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 5000);
}





