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
const contenedorReportes = document.getElementById("contenedor-reportes");
const operacionesInsuficientes = document.getElementById(
  "operaciones-insuficientes"
);

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

//REPORTES
btnReportes.addEventListener("click", () => {
  balance.classList.add("oculto");
  categorias.classList.add("oculto");
  reportes.classList.remove("oculto");
  if (!operaciones.length) {
    operacionesInsuficientes.classList.remove("oculto");
    contenedorReportes.classList.add("oculto");
  } else {
    operacionesInsuficientes.classList.add("oculto");
    contenedorReportes.classList.remove("oculto");
  }
  totalPorMes(operaciones); //hago que se active cuando el usuario le de click al btn reportes
  totalPorCategoria(operaciones, arrayCategorias);
});

//REPORTE TOTAL POR CATEGORIA
const totalPorCategoria = (operaciones, arrayCategorias) => {
  //RECORRER LA CATEGORIAS Y HACER UN NUEVO ARREGLO POR CADA CATEGORIA QUE TENGA ESA CATEGORIA
  //for each + filter + reduce

  document.getElementById("totales-por-categoria").innerHTML = "";
  let str = "";

  arrayCategorias.forEach((categoria) => {
    const porCategoria = operaciones.filter(
      (operacion) => operacion.categoria === categoria
    );
    // console.log(porCategoria) //tira un arr vacio!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const porCategoriaGanancia = porCategoria
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);
    console.log(porCategoriaGanancia); //ME DEVUELVE 0, NO TOMA EL VALOR DEL ARREGLO
    console.log(
      `LA CATEGORIA ${categoria.nombre} tiene una ganancia de ${porCategoriaGanancia}`
    ); //POR LO MENOS TOMA EL NOMBRE/////////////////////////////////////

    const porCategoriaGasto = porCategoria
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    console.log(porCategoriaGasto); //ME DEVUELVE 0, NO TOMA EL VALOR DEL ARREGLO
    console.log(
      `LA CATEGORIA ${categoria.nombre} tiene una ganancia de ${porCategoriaGasto}`
    );

    const balance = porCategoriaGanancia - porCategoriaGasto;

    str += `
      
      <div class="row align-items-start my-2" >
          <div class="col w-25">
            ${categoria.nombre}
          </div>
          <div class="col text-end">
            <span class="success">${porCategoriaGanancia}</span>
          </div>
          <div class="col danger text-end">
            ${porCategoriaGasto}
          </div>
          <div class="col text-black text-end" >
            ${balance}
          </div>
      </div>

    `;
    document.getElementById("totales-por-categoria").innerHTML = str;
    ///////////////////////////////////////////////////////////////////////////////
  });
};

//REPORTE TOTAL POR MES
const totalPorMes = (arr) => {
  // console.log(arr)
  //creo un arr con meses
  //devolver los meses donde hay operaciones y si se repiten los meses dejar solo uno, una fila por mes. con new set no se repiten los valores
  const arrMesUnico = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort(); //.split separa la fecha, el dia del mes del anio .sort acomoda de mayor a menor
  console.log(arrMesUnico);

  const arrAnio = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[0])),
  ].sort();
  document.getElementById("totales-por-mes").innerHTML = "";
  let str = "";

  for (let i = 0; i < arrMesUnico.length; i++) {
    const operacionesMesUnico = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === arrMesUnico[i]
    ); //entremos a todos los meses de cada una de las operaciones
    const porGanancia = operacionesMesUnico
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0); //.filter va a filtrar de cada mes que tenga operaciones, lo que sean gancias y con .reduce voy acumulando cada una, sumando
    const porGasto = operacionesMesUnico
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    // console.log(`mes ${arrMesUnico[i]}/${arrAnio} ganancia ${porGanancia}`);
    // console.log(`mes ${arrMesUnico[i]}/${arrAnio} gasto ${porGasto}`);

    const balance = porGanancia - porGasto;

    str += `
      <div class="row align-items-start my-2" >
        <div class="col">
          ${arrMesUnico[i]}/${arrAnio}
          </div>
          <div class="col text-end">
            <span class="badge text-success">+${porGanancia}</span>
          </div>
          <div class="col text-end">
            <span class="badge text-danger">-${porGasto}</span>
          </div>
          <div class="col text-end">
            <span class="badge text-black">${balance}</span>
          </div>
    </div>
 
    `;
    document.getElementById("totales-por-mes").innerHTML = str;
  }
};

console.log("prueba 2-9");

btnNuevaOperacion.addEventListener("click", () => {
  seccionOperacion.classList.remove("oculto");
  balance.classList.add("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
}); //!!!!!!!!!!!!!FALTA CUANDO SE ELIMINAN TODAS LA OPERACIONES QUE MUESTRE LA IMAGEN

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

/////////////////////////
// SECCION CATEGORIAS
////////////////////////

//totas la categorias y va metiendo acá las nuevas tb//guardar como operaciones en el local storage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let arrayCategorias = JSON.parse(localStorage.getItem('categorias')) || [
  {
    nombre: "Comida",
    id: uuidv4(),
  },
  {
    nombre: "Servicios",
    id: uuidv4(),
  },
  {
    nombre: "Salidas",
    id: uuidv4(),
  },
  {
    nombre: "Educacion",
    id: uuidv4(),
  },
  {
    nombre: "Transporte",
    id: uuidv4(),
  },
  {
    nombre: "Trabajo",
    id: uuidv4(),
  },
];

//FUNCION QUE AGREGA LAS CATEGORIAS (ARREGLO DE CATEGORIAS) A LOS SELECT
const generarCategorias = () => {
  const selects = document.getElementsByClassName("select-categorias");
  for (let i = 0; i < selects.length; i++) {
    selects.innerHTML = "";
    const select = selects[i];
    if (select.classList.contains("filtro-categorias")) {
      select.innerHTML = '<option value="todas" selected>Todas</option>';
    }
    arrayCategorias.forEach((categoria) => {
      select.innerHTML += `<option value=${categoria.nombre}>${categoria.nombre}</option>`;
    });
  }
};
generarCategorias();

//FUNCION QUE PINTA LAS CATEGORIAS (ARR DE CATEGORIAS) EN LA SECCION DE CATEGORIAS, ABAJO DE TODAS LAS OTRAS CATEGORIAS CON SU BOT'ON EDITAR Y ELIMINAR
const pintarCategorias = (arr) => {
  document.getElementById("categorias").innerHTML ="" 
  arr.forEach((categoria) => {
    document.getElementById("categorias").innerHTML += `
    <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col my-1">
        <span class="badge text-bg-primary">${categoria.nombre}</span>
      </div>
      <div class="col text-end">
        <a class="editar" data-id=${categoria.id} href="#">Editar</a>
        <a class="eliminar" data-id=${categoria.id} href="#">Eliminar</a>
      </div>
   </div>`;
  });
  
localStorage.setItem("categorias", JSON.stringify(arrayCategorias));

 const btnsEliminar = document.querySelectorAll('.eliminar')

  btnsEliminar.forEach((btn) =>{
    btn.addEventListener('click', e => {
    const arrayLimpio = arrayCategorias.filter(arr => arr.id !== e.target.dataset.id)
    localStorage.setItem('categorias', JSON.stringify(arrayLimpio))
    arrayCategorias = JSON.parse(localStorage.getItem('categorias'))
    pintarCategorias(arrayCategorias) 
    })
  })

};
 
pintarCategorias(arrayCategorias);

//FUNCION QUE TOMA DEL INPUT LA NUEVA CATEGORIA INGRESADA POR EL USUARIO, LE PONE UN ID, Y LA TIENE QUE SUBIR AL ARREGLO DE CATEGORIAS, !!!!!!!!!!!!!!!VER SI ESTO EST'A FUNCIONANDO
let inputCategoria = document.getElementById("nueva-categoria-input");
const listaCategorias = document.getElementById('categorias')

/////////////////////////////////////////
///FUNCION QUE PINTA LAS NUEVAS CATEGORIAS
/////////////////////////////////////////
btnAgregarCategoria.addEventListener("click", () => {
  const nuevaCategoria = {
    nombre: inputCategoria.value,
    id: uuidv4(),
  }
  arrayCategorias.push(nuevaCategoria);

 inputCategoria.value = "";

listaCategorias.innerHTML += `
  <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col my-1">
        <span class="badge text-bg-primary">${nuevaCategoria.nombre}</span>
      </div>
      <div class="col text-end">
        <a class="editar" data-id=${nuevaCategoria.id} href="#">Editar</a>
        <a class="eliminar" data-id=${nuevaCategoria.id} href="#">Eliminar</a>
      </div>
   </div>
`
localStorage.setItem("categorias", JSON.stringify(arrayCategorias));
generarCategorias()
pintarCategorias(arrayCategorias)
});

//ELIMINAR CATEGORIA


//EDITAR CATEGORIA
 const btnsEditar = document.querySelectorAll('.editar')

btnsEditar.forEach(btn => {
  console.log(btn)
})

////////////////////////////////////////////////////////////////////////////////////////////////////
// NUEVA OPERACION //
////////////////////////////////////////////////////////////////////////////////////////////////////

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

    const eliminarBtn = document.querySelectorAll(".eliminar-btn");

    eliminarBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eliminar = operaciones.filter(
          (operacion) => operacion.id !== e.target.dataset.id
        ); //omitimos traer el que estamos eliminando
        localStorage.setItem("operaciones", JSON.stringify(eliminar));
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
  generarCategorias()
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

////////////////////////////////////////////////////////////////////////////////////////////////////
//FILTRO POR FECHA (DESDE TAL DIA EN ADELANTE)
////////////////////////////////////////////////////////////////////////////////////////////////////

const ordenarPorFecha = document.getElementById("por-fecha");

ordenarPorFecha.addEventListener("change", (e) => {
  console.log(e.target.value);
  console.log(operaciones[0].fecha);
  const operacionesFiltradasPorFecha = operaciones.filter(
    (operacion) => new Date(operacion.fecha) >= new Date(e.target.value)
  );
  console.log(operacionesFiltradasPorFecha);
  pintarOperaciones(operacionesFiltradasPorFecha);
});

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

  //Z/A

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

//REPORTES, EMPEZAR ABAJO HACIA ARRIBA

//TOTALES POR MES, debe filtar por mes todas la ganacias - los gastos = balance, filter fecha mes a mes, filter gasto o ganacia . reduce para sacar el total del monto. filter a todas las operaciones, saque los meses, los guarde en un arr los mese que hay operaciones, y con este arr, for, por cada mes hacer un filter y un reduce

//TOTALES POR CATEGORIA, filter a cada categoria, sumar todas las ganacias de cada categoria - gastos = balance. con if, si tiene operaciones, las junta y las suma, sino muestra 0

//RESUMEN

//CATERGORIA CON MAYOR GANANCIA

//CATERGORIA CON MAYOR GASTO

//CATERGORIA CON MAYOR BALANCE

//MES CON MAYOR GANANCIA

//MES CON MAYOR GASTO
