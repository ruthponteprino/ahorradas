//BOTONES//
const btnBalance = document.getElementById("btnBalance");
const btnAhorradas = document.getElementById("btn-ahorradas");
const btnCategorias = document.getElementById("btnCategorias");
const btnReportes = document.getElementById("btnReportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const btnOcultarFiltros = document.getElementById("btn-ocultar-filtros");
const btnMostrarFiltros = document.getElementById("btn-mostrar-filtros");
const btnAgregar = document.getElementById("agregar-btn");
const editarOperacion = document.getElementById("editarOperacion");
const eliminarOperacion = document.getElementById("eliminarOperacion");
const btnAgregarCategoria = document.getElementById("btn-agregar-categoria");

// INPUTS //
const inputDescripcion = document.getElementById("descripcion");
const inputMonto = document.getElementById("monto");
const inputTipo = document.getElementById("tipo");
const selectCategoriaOperacion = document.getElementById("selectCategoriaOperacion");
const inputFecha = document.getElementById("fecha-input");
const acciones = document.getElementById("acciones");

//SECCIONES//
const balance = document.getElementById("seccion-balance"); //TRAIGO SECCION BALANCE
const categorias = document.getElementById("seccion-categorias"); //TRAIGO SECCION CATEGORIAS
const reportes = document.getElementById("seccion-reportes"); //TRAIGO SECCION REPORTES
const seccionOperacion = document.getElementById("seccion-operacion"); //TRAIGO FORMULARIO OPERACIONES
const filtros = document.getElementById("filtros");

btnBalance.addEventListener("click", () => {
  balance.classList.remove("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
  seccionOperacion.classList.add("oculto");
  //console.log(btnBalance);
});

btnAhorradas.addEventListener("click", () => {
  balance.classList.remove("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
  seccionOperacion.classList.add("oculto");
  // console.log(btnBalance)
});

btnCategorias.addEventListener("click", () => {
  balance.classList.add("oculto");
  categorias.classList.remove("oculto");
  reportes.classList.add("oculto");
  //console.log(btnCategorias);
});

btnReportes.addEventListener("click", () => {
  balance.classList.add("oculto");
  categorias.classList.add("oculto");
  reportes.classList.remove("oculto");
});

btnNuevaOperacion.addEventListener("click", () => {
  seccionOperacion.classList.remove("oculto");
  balance.classList.add("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
});

//FILTROS//
//OCULTAR Y MOSTRAR FILTROS

btnOcultarFiltros.addEventListener("click", () => {
  filtros.classList.add("oculto");
  btnMostrarFiltros.classList.remove("oculto");
  btnOcultarFiltros.classList.add("oculto");
});

btnMostrarFiltros.addEventListener("click", () => {
  filtros.classList.remove("oculto");
  btnMostrarFiltros.classList.add("oculto");
  btnOcultarFiltros.classList.remove("oculto");
});

// CATEGORIAS //

const arrayCategorias = [
  "Comida",
  "Servicios",
  "Salidas",
  "Educacion",
  "Transporte",
  "Trabajo",
];

const generarCategorias = () => {
  const selects = document.getElementsByClassName("select-categorias");
  for (let i = 0; i < selects.length; i++) {
    selects.innerHTML = "";
    const select = selects[i];
    if (select.classList.contains("filtro-categorias")) {
      select.innerHTML = '<option value="todas" selected>Todas</option>';
    }
    arrayCategorias.forEach((categoria) => {
      select.innerHTML += `<option value=${categoria}>${categoria}</option>`;
    });

  }
};
generarCategorias();

/////////////////////////
// SECCION CATEGORIAS
////////////////////////

const cargarCategoria = () => {
  let inputCategoria = document.getElementById("nueva-categoria-input").value;
  arrayCategorias.push(inputCategoria) 
  
  
let ultimoElemento = (arr) => {
  document.getElementById("nueva-categoria-input").value = '' 
  let ultimoItem = arr[arr.length-1] 
  document.getElementById('categorias').innerHTML += `
    <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col">
        <span class="badge text-bg-primary">${ultimoItem}</span>
      </div>
      <div class="col text-end">
        <a id="editarOperacion" href="#">Editar</a>
        <a class="eliminar" href="#">Eliminar</a>
      </div>
   </div>`
   
}
  ultimoElemento(arrayCategorias)
  generarCategorias()
}

btnAgregarCategoria.addEventListener('click', cargarCategoria)

const pintarCategorias = () => {
  arrayCategorias.forEach((categoria) => {
    document.getElementById('categorias').innerHTML += `
    <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col my-1">
        <span class="badge text-bg-primary">${categoria}</span>
      </div>
      <div class="col text-end">
        <a id="editarOperacion" href="#">Editar</a>
        <a id="eliminar" href="#">Eliminar</a>
      </div>
   </div>`
  })
}

pintarCategorias()

//ELIMINAR CATEGORIA




pintarNuevaCategoria()

 //tengo que imprimir la categorias exitentes y las nuevas a medida que las valla agregando el usuario

// NUEVA OPERACION //

const operaciones = [];

const mostrarOperaciones = (arr) => {
  if (!arr.length) {
    document.getElementById("con-operaciones").classList.add("d-none");
  } else {
    document.getElementById("con-operaciones").classList.remove("d-none");
    document.getElementById("sin-operaciones").classList.add("d-none");
  }
};
mostrarOperaciones(operaciones);

btnAgregar.addEventListener("click", () => {

  // VALIDACION
// no funciona el monto.value
  if(inputDescripcion.value.trim().length === 0 || monto.value === 0){
    alert('Todos los campos deben estar completos')
    return
  }

  const operacion = {
    id: uuidv4(),
    descripcion: inputDescripcion.value,
    monto: inputMonto.value,
    tipo: inputTipo.value,
    categoria: selectCategoriaOperacion.value,
    // categorias: selectCategoriaOperacion.value,
    fecha: inputFecha.value,
    // acciones: acciones.value
  };
  // console.log(operacion)
  operaciones.push(operacion);
  seccionOperacion.classList.add("oculto");
  balance.classList.remove("oculto");
  inputDescripcion.value = "";
  inputMonto.value = 0;
  inputTipo.value = "";
  selectCategoriaOperacion.value = "Servicios";
  inputTipo.value = "ganancia";
//   selectCategoriaOperacion.value = "Servicios";
  inputFecha.value = new Date();
  mostrarOperaciones(operaciones);

    localStorage.setItem('operaciones', JSON.stringify(operaciones))

  pintarOperaciones(operaciones);
});

const pintarOperaciones = (arr) => {
  console.log(arr);
  let str = "";
  arr.forEach((operacion) => {
    const {id, descripcion, categoria, fecha, monto} = operacion
    str =
      str +
    ` <div class="row align-items-start my-2" >
          <div class="col">
            ${operacion.descripcion}
          </div>
          <div class="col">
            <span class="badge text-bg-primary">${operacion.categorias}</span>
          </div>
          <div class="col">
            ${operacion.fecha}
          </div>
          <div class="col ${operacion.tipo === "ganancia" ? "success" : "danger"}" >
            $${operacion.monto}
          </div>
          <div class="col">
            <a id="editarOperacion" href="#">Editar</a>
            </br>
            <a class="eliminar-btn" id=${operacion.id} href="#">Eliminar</a>
          </div>
      </div>
      `
  })
  document.getElementById("operaciones").innerHTML = str;
};

//BTN EDITAR OPERACIONES

//BTN ELIMINAR OPERACIONES

// eliminarOperacion.addEventListener("click", () => {});

const copiaOperaciones = [...operaciones]; //creo copia de operaciones para poder filtrar entre gasto y ganacia, y dps por categorias

//TIPO, SELECT todos, gastos y ganacias

const selectTipo = document.getElementById("tipo");

selectTipo.addEventListener("change", (e) => {
  console.log(e.target.value);
  //selecciona todas => mostrar todas la operaciones en seccion operaciones
  //selecciona gastos => mostrar gastos en seccion operaciones
  //selecciona ganacias => mostrar ganancias en seccion operaciones
  //averiguar como hacer para que me valla mostrando las operaciones que va poniendo el usuario

  const tipoTodas = [...operaciones];
  const tipoGastos = [];
  const tipoGanacias = [];
});

//tipo

const selectTipoFiltros = document.getElementById("selectTipoFiltros");

selectTipoFiltros.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value !== "todos") {
    const porTipo = operaciones.filter(
      (operaciones) => operaciones.tipo === e.target.value
    );
    console.log(porTipo);
  } else {
    console.log(operaciones);
  }
});

//categorias

const selectCategoriaFiltros = document.getElementById(
  "selectCategoriaFiltros"
);

selectCategoriaFiltros.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value !== "todas") {
    const porCategoria = operaciones.filter(
      (operaciones) => operaciones.categoria === e.target.value
    );
    console.log(porCategoria);
  } else {
    console.log(operaciones);
  }
  //los values tiene que estar escritos igual
});

//cómo hago para que los resultados de los filtros se muestren/impriman en operaciones, con un filter?

//terminar de hacer filtros para fecha y ordenar por

//REPORTES

//mostrar contenedor-reportes ocultar por defecto, mostrar solo cuando hay operaciones

const contenedorReportes = document.getElementById("contenedor-reportes");
const operacionesInsuficientes = document.getElementById(
  "operaciones-insuficientes"
);

//     //si recibe operaciones muestra contenedor-reportes, si no muestra div de operaciones insuficientes.
//     //VER COMO SE HACE
// 1-recorrer operaciones y si hay al menos 1 operacion cargada
//2-si esto se cumple, entonces sacarle la clase oculto y mostrar contenedor-resumen

const mostrarReportes = (arr) => {
  if (!arr.length) {
    //si el arr esta vacio hace esto...
    contenedorReportes.classList.add("oculto"); //'mostrar'
  } else {
    //sino muestra esto
    contenedorReportes.classList.add("mostrar"); ////!!!funciona si le meto un dato al arr operaciones manualmente, pero no si lo agrego desde agregar operaciones, es como que no me detecta si hay o no operaciones
    operacionesInsuficientes.classList.add("oculto");
  }
};
mostrarReportes(operaciones);
