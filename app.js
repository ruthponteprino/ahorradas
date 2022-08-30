//BOTONES//
const btnBalance = document.getElementById("btnBalance");
const btnAhorradas = document.getElementById("btn-ahorradas");
const btnCategorias = document.getElementById("btnCategorias");
const btnReportes = document.getElementById("btnReportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const btnOcultarFiltros = document.getElementById("btn-ocultar-filtros");
const btnMostrarFiltros = document.getElementById("btn-mostrar-filtros");
const btnAgregar = document.getElementById("agregar-btn");
// const editarOperacion = document.getElementById("editarOperacion");
const eliminarOperacion = document.getElementById("eliminarOperacion");
const btnAgregarCategoria = document.getElementById("btn-agregar-categoria");

// INPUTS //
const inputDescripcion = document.getElementById("descripcion");
const inputMonto = document.getElementById("monto");
const inputTipo = document.getElementById("tipo");
const selectCategoriaOperacion = document.getElementById(
  "selectCategoriaOperacion"
);
const inputFecha = document.getElementById("fecha-input");
const acciones = document.getElementById("acciones");

//editar operacion
const descripcionEditar = document.getElementById("descripcion-editar");
const montoEditar = document.getElementById("monto-editar");
const tipoEditar = document.getElementById("tipo-editar");
const categoriaEditar = document.getElementById("categoria-editar");
const fechaEditar = document.getElementById("fecha-editar");
const btnEditarOperacion = document.getElementById("btn-editar-operacion");
const btnCancelarOperacion = document.getElementById("btn-cancelar-operacion");

//SECCIONES//
const balance = document.getElementById("seccion-balance"); //TRAIGO SECCION BALANCE
const categorias = document.getElementById("seccion-categorias"); //TRAIGO SECCION CATEGORIAS
const reportes = document.getElementById("seccion-reportes"); //TRAIGO SECCION REPORTES
const seccionOperacion = document.getElementById("seccion-operacion"); //TRAIGO FORMULARIO OPERACIONES
const filtros = document.getElementById("filtros");
const seccionEditarOperacion = document.getElementById(
  "seccion-editar-operacion"
);

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
  arrayCategorias.push(inputCategoria);

  let ultimoElemento = (arr) => {
    document.getElementById("nueva-categoria-input").value = "";
    let ultimoItem = arr[arr.length - 1];
    document.getElementById("categorias").innerHTML += `
    <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col">
        <span class="badge text-bg-primary">${ultimoItem}</span>
      </div>
      <div class="col text-end">
        <a id="editarOperacion" href="#">Editar</a>
        <a class="eliminar" href="#">Eliminar</a>
      </div>
   </div>`;
  };
  ultimoElemento(arrayCategorias);
  generarCategorias();
};

btnAgregarCategoria.addEventListener("click", cargarCategoria);

const pintarCategorias = () => {
  arrayCategorias.forEach((categoria) => {
    document.getElementById("categorias").innerHTML += `
    <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col my-1">
        <span class="badge text-bg-primary">${categoria}</span>
      </div>
      <div class="col text-end">
        <a id="editarOperacion" href="#">Editar</a>
        <a id="eliminar" href="#">Eliminar</a>
      </div>
   </div>`;
  });
};

pintarCategorias();

//ELIMINAR CATEGORIA

//EDITAR CATEGORIA

// NUEVA OPERACION //

let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

// const operaciones = [];

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
  const toastLiveExample = document.getElementById("liveToast");

  if (inputDescripcion.value.trim().length === 0 || monto.value < 0) {
    const toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
    return;
  }

  const operacion = {
    id: uuidv4(),
    descripcion: inputDescripcion.value,
    monto: inputMonto.value,
    tipo: inputTipo.value,
    categorias: selectCategoriaOperacion.value,
    fecha: inputFecha.value,
  };

  operaciones.push(operacion);
  seccionOperacion.classList.add("oculto");
  balance.classList.remove("oculto");
  inputDescripcion.value = "";
  inputMonto.value = 0;
  inputTipo.value = "";
  selectCategoriaOperacion.value = "Servicios";
  inputTipo.value = "ganancia";
  inputFecha.valueAsDate = new Date();
  mostrarOperaciones(operaciones);

  localStorage.setItem("operaciones", JSON.stringify(operaciones));

  pintarOperaciones(operaciones);
});

////////////SECCION BALANCE//////////
////////////FILTRAR TOTAL DE GANANCIAS//////////

const totalGananciasBalance = (arr) => {
  let resultadoGanancias = arr
    .filter((operacion) => operacion.tipo === "ganancia")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  return resultadoGanancias;
};

////////////FILTRAR TOTAL DE GASTOS//////////
const totalGastosBalance = (arr) => {
  let resultadoGastos = arr
    .filter((operacion) => operacion.tipo === "gasto")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  return resultadoGastos;
};

///////////IMPRIMIR RESULTADOS EN SECCION BALANCE//////////////////
const pintarEnBalance = (arr) => {
  const totalBalance = totalGananciasBalance(arr) - totalGastosBalance(arr);
  //let str = ''
  //for (let)
  let str = `
            <tbody>
              <tr>
                <td>Ganancias</td>
                <td class="text-success">+$${totalGananciasBalance(arr)}</td>
              </tr>
              <tr>
                <td>Gastos</td>
                <td class="text-danger">+$${totalGastosBalance(arr)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>$${Math.abs(totalBalance)}</th>
              </tr>
            </tbody>`;

  document.getElementById("balance").innerHTML = str;
};

const pintarOperaciones = (arr) => {
  document.getElementById("operaciones").innerHTML = ""; //limpiamos operaciones y muestra img del inicio
  let str = "";
  arr.forEach((operacion) => {
    const { id, descripcion, categorias, fecha, monto, tipo } = operacion;

    console.log(fecha);
    str = str += ` <div class="row align-items-start my-2" >
          <div class="col">
            ${descripcion}
          </div>
          <div class="col">
            <span class="badge text-bg-primary">${categorias}</span>
          </div>
          <div class="col">
            ${fecha}
          </div>
          <div class="col ${tipo === "ganancia" ? "success" : "danger"}" >
            $${monto}
          </div>
          <div class="col">
            <a class='editar-btn' data-id=${id}>Editar</a>
            </br>
            <a class="eliminar-btn" data-id=${id}>Eliminar</a>
          </div>
      </div>
      `;
    document.getElementById("operaciones").innerHTML = str;

    //BTNS ELIMINAR/EDITAR OPERACIONES

    // console.log("prueba224");

    const eliminarBtn = document.querySelectorAll(".eliminar-btn");

    eliminarBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eliminar = operaciones.filter(
          (operacion) => operacion.id !== e.target.dataset.id
        ); //omitimos traer el que estamos eliminando
        localStorage.setItem("operaciones", JSON.stringify(eliminar));
        console.log(eliminar);
        operaciones = JSON.parse(localStorage.getItem("operaciones"));
        pintarOperaciones(operaciones);
        mostrarOperaciones(operaciones); //debe mostrar la imagen del inicio!!!!!!!!!
      });
    });
  });
  //PINTAR OPERACIONES Y ELIMINAR DEBEN HACER LA MISMA FUNCION QUE ACTUALIZAR/PINTAR EL BALANCE SIN 'REFRESCAR',
  const editarBtn = document.querySelectorAll(".editar-btn");

  editarBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const editar = operaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );
      editarBtnOperacion(editar);
      btnEditarOperacion.addEventListener("click", () => {
        // console.log('btn editar') // guardar cambios, y pintarlos en la operacion, actualizar nuevos objetos, como el eliminar que borra las operaciones
        const copiaEditar = { ...editar[0] };
        copiaEditar.descripcion = descripcionEditar.value;
        copiaEditar.monto = montoEditar.value;
        copiaEditar.tipo = tipoEditar.value;
        copiaEditar.categorias = categoriaEditar.value;
        copiaEditar.fecha = fechaEditar.value;
        const operacionEditada = operaciones.map((operacion) =>
          operacion.id === copiaEditar.id ? copiaEditar : operacion
        );
        localStorage.setItem("operaciones", JSON.stringify(operacionEditada));
        operaciones = JSON.parse(localStorage.getItem("operaciones"));
        pintarOperaciones(operaciones);
      });
      btnCancelarOperacion.addEventListener("click", () => {
        seccionEditarOperacion.classList.add("oculto");
        balance.classList.remove("oculto");
      });
    });
  });
  pintarEnBalance(operaciones);
};

//BTN EDITAR OPERACIONES

const editarBtnOperacion = (arr) => {
  const { descripcion, monto, tipo, categorias, fecha } = arr[0];
  balance.classList.add("oculto");
  seccionEditarOperacion.classList.remove("oculto");
  descripcionEditar.value = descripcion;
  montoEditar.value = monto;
  tipoEditar.value = tipo;
  categoriaEditar.value = categorias;
  fechaEditar.value = fecha;
};

//INICIALIZAR
const inicializar = () => {
  const inputsFecha = document.querySelectorAll('input[type="date"]');
  inputsFecha.forEach((input) => {
    input.valueAsDate = new Date();
  });
  //AGREGAR LAS FUNCIONES QUE ESTAN SUELTAS PARA ACOMODAR EL CODIGO
  pintarOperaciones(operaciones);
  // mostrarOperaciones(operaciones);
  // alterfy.success('Operacion Eliminada') //lanza un alerta que avise si estan ok las acciones que va realizando el usuario
};

window.onload = inicializar();
const copiaOperaciones = [...operaciones]; //creo copia de operaciones para poder filtrar entre gasto y ganacia, y dps por categorias

/////////////////FILTROS///////////////////
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

//FILTRO tipo

const selectTipoFiltros = document.getElementById("selectTipoFiltros");

selectTipoFiltros.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value !== "todos") {
    const porTipo = operaciones.filter(
      (operaciones) => operaciones.tipo === e.target.value
    );
    localStorage.setItem("operaciones", JSON.stringify(porTipo));
    pintarOperaciones(porTipo);
  } else {
    pintarOperaciones(operaciones);
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
      (operaciones) => operaciones.categorias === e.target.value
    );
    localStorage.setItem("operaciones", JSON.stringify(porCategoria));
    pintarOperaciones(porCategoria);
  } else {
    pintarOperaciones(operaciones);
  }
  //los values tiene que estar escritos igual
});

//FILTRO POR FECHA (DESDE TAL DIA EN ADELANTE)

//ORDENAR POR
//MAS RECIENTE

//MENOS RECIENTE

const ordenarPor = document.getElementById("ordenar-por");

ordenarPor.addEventListener("change", () => {
  //MAYOR MONTO
  if (ordenarPor.value === "mayor-monto") {
    const resultadoMonto = operaciones.sort((a, b) => {
      if (Number(a.monto) > Number(b.monto)) {
        return -1;
      }
      if (Number(a.monto) < Number(b.monto)) return 1;
    });
    console.log(resultadoMonto);
  }
  pintarOperaciones(operaciones);
  //MENOR MONTO
  if (ordenarPor.value === "menor-monto") {
    const resultadoMonto = operaciones.sort((a, b) => {
      if (Number(a.monto) < Number(b.monto)) {
        return -1;
      }
      if (Number(a.monto) > Number(b.monto)) return 1;
    });
    console.log(resultadoMonto);
  }
  pintarOperaciones(operaciones);

  //A/Z

  if (ordenarPor.value === "a-z") {
    const resultado = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) return 1;
    });
    console.log(resultado);
  }
  pintarOperaciones(operaciones);

  if (ordenarPor.value === "z-a") {
    const resultado = operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1;
      }
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) return 1;
    });
    console.log(resultado);
  }
  pintarOperaciones(operaciones);

  //////////////////////////////////////
});

//Z/A

//REPORTES

//mostrar contenedor-reportes ocultar por defecto, mostrar solo cuando hay operaciones

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
