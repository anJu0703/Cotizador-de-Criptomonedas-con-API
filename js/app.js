//Variables del documento//

const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

//Variables

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
};

//Crear promise//

const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});

//addEventListener//

document.addEventListener('DOMContentLoaded',()=>{

    //Funcion para consultar las cripto
    consultarCriptomonedas();

    //Evento para cuando el formulario haga submit
    formulario.addEventListener('submit', submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
});


//Funciones//

function consultarCriptomonedas() {

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => obtenerCriptomonedas(resultado.Data))
    .then(criptomonedas => selectCriptomonedas(criptomonedas))
};

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
};

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value
};

function submitFormulario(e) {
    e.preventDefault();

    //Validar
    
    const {moneda, criptomenda} = objBusqueda;

    if (moneda === '', criptomenda === '') {

        mostrarAlerta('Ambos campos son obligatorios');
        return;
    };

    //Consultar la API con los resultados
};

//Mostrar alerta de validacion de formulario

function mostrarAlerta(mensaje) {

    const existeError = document.querySelector('.error');

    if (!existeError) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');

        //Mensaje de error
        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    };
};