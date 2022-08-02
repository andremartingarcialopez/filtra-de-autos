//VARIABLES
const resultados = document.querySelector("#resultado");

//Variables de cada campo
const campoMarca = document.querySelector("#marca");
const campoYears = document.querySelector("#year");
const campoMinimo = document.querySelector("#minimo");
const campoMaximo = document.querySelector("#maximo");
const campoPuertas = document.querySelector("#puertas");
const campoTransmision = document.querySelector("#transmision");
const campoColor = document.querySelector("#color");

//EVENTOS
cargarEventos();
function cargarEventos() {
    document.addEventListener("DOMContentLoaded", mostrarAutos(autos));
    document.addEventListener("DOMContentLoaded", mostrarYears);

    //Cada evento lo hacemos "individual" ya que el filtrado se hara en tiempo real
    campoMarca.addEventListener("change", (e) => {
        objetoInfo.marca = e.target.value;
        filtrarAuto();
    });

    campoYears.addEventListener("change", (e) => {
        objetoInfo.year = e.target.value;
        filtrarAuto();
    });

    campoMinimo.addEventListener("change", (e) => {
        objetoInfo.min = e.target.value;
        filtrarAuto();
    });

    campoMaximo.addEventListener("change", (e) => {
        objetoInfo.max = e.target.value;
        filtrarAuto();
    });

    campoPuertas.addEventListener("change", (e) => {
        objetoInfo.puertas = e.target.value;
        filtrarAuto();
    });

    campoTransmision.addEventListener("change", (e) => {
        objetoInfo.transmision = e.target.value;
        filtrarAuto();
    });

    campoColor.addEventListener("change", (e) => {
        objetoInfo.color = e.target.value;
        filtrarAuto();

    });
}
//Objeto que se llenara con la informacion que seleccionemos
const objetoInfo = {
    marca: "",
    year: "",
    min: "",
    max: "",
    puertas: "",
    transmision: "",
    color: ""
}

//FUNCIONES
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const { marca, year, precio, puertas, transmision, color } = auto
        const autoHTML = document.createElement("p");
        autoHTML.innerHTML = `
        <p>${marca} ${year} - Precio: $${precio} - #Puertas:${puertas} - Transmision: ${transmision} - Color:${color}</p>
        `;
        resultados.appendChild(autoHTML);
    });
}

function mostrarYears() {
    const max = new Date().getFullYear();
    const min = max - 10;
    for (let i = max; i > min; i--) {
        const optionYears = document.createElement("option");
        optionYears.value = i;
        optionYears.textContent = i;

        campoYears.appendChild(optionYears);
    }
}

//Filtramos todo en tiempo real panando una funcion a cada "filter"
function filtrarAuto() {
    const filtroFinal = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    mostrarAutos(filtroFinal)

    if (filtroFinal.length == 0) {
        mostrarAlerta()
    }
}

function filtrarMarca(auto) {
    if (objetoInfo.marca) {
        return auto.marca == objetoInfo.marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    if (objetoInfo.year) {
        return auto.year == objetoInfo.year;
    } else {
        return auto;
    }
}

function filtrarMinimo(auto) {
    if (objetoInfo.min) {
        return auto.precio >= objetoInfo.min
    } else {
        return auto;
    }
}

function filtrarMaximo(auto) {
    if (objetoInfo.max) {
        return auto.precio <= objetoInfo.max
    } else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    if (objetoInfo.puertas) {
        return auto.puertas == objetoInfo.puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision(auto) {
    if (objetoInfo.transmision) {
        return auto.transmision == objetoInfo.transmision
    } else {
        return auto;
    }
}

function filtrarColor(auto) {
    if (objetoInfo.color) {
        return auto.color == objetoInfo.color
    } else {
        return auto;
    }
}

//"Borramos" los atributos html cada vez que filtramos
function limpiarHTML() {
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild)
    }
}

//Funcion que muestra alerta si no existen resultados 
function mostrarAlerta() {
    const alerta = document.createElement("p");
    alerta.classList.add("alerta", "error")
    alerta.textContent = "Sin resultados";


    resultados.appendChild(alerta)
}
