//BOTONES//

const btnBalance = document.getElementById('btnBalance')
const btnCategorias = document.getElementById('btnCategorias')
const btnReportes = document.getElementById('btnReportes')
const btnNuevaOperacion = document.getElementById('btn-nueva-operacion')
const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros') 
const btnMostrarFiltros = document.getElementById('btn-mostrar-filtros') 


//SECCIONES//
const balance = document.getElementById('seccion-balance') //TRAIGO SECCION BALANCE
const categorias = document.getElementById('seccion-categorias') //TRAIGO SECCION CATEGORIAS
const reportes = document.getElementById ('seccion-reportes') //TRAIGO SECCION REPORTES
const seccionOperacion = document.getElementById('seccion-operacion') //TRAIGO FORMULARIO OPERACIONES
const filtros = document.getElementById('filtros')


btnBalance.addEventListener('click', () => {
    balance.classList.remove('oculto')
    categorias.classList.add('oculto')
    reportes.classList.add('oculto')
    seccionOperacion.classList.add('oculto')
    console.log(btnBalance)
})

btnCategorias.addEventListener('click', () => {
    balance.classList.add('oculto')
    categorias.classList.remove('oculto')
    reportes.classList.add('oculto')
    console.log(btnCategorias)
})

btnReportes.addEventListener('click', () => {
    balance.classList.add('oculto')
    categorias.classList.add('oculto')
    reportes.classList.remove('oculto')
})

 btnNuevaOperacion.addEventListener('click', () => {
    seccionOperacion.classList.remove('oculto')
    balance.classList.add('oculto')
    categorias.classList.add('oculto')
     reportes.classList.add('oculto')
 })

 //FILTROS//
//OCULTAR Y MOSTRAR FILTROS

btnOcultarFiltros.addEventListener('click', () => {
    filtros.classList.add('oculto')
    btnMostrarFiltros.classList.remove('oculto')
    btnOcultarFiltros.classList.add('oculto')
} )

btnMostrarFiltros.addEventListener('click', () => {
    filtros.classList.remove('oculto')
    btnMostrarFiltros.classList.add('oculto')
    btnOcultarFiltros.classList.remove('oculto')
} )




// CATEGORIAS //

const arrayCategorias = ['Comida', 'Servicios', 'Salidas', 'Educacion', 'Transporte', 'Trabajo']

const generarCategorias = () => {
    const selects = document.getElementsByClassName('select-categorias')
    for(let i = 0; i < selects.length; i++){
        const select = selects[i]
        if(select.classList.contains('filtro-categorias')){
            select.innerHTML = '<option value="todas" selected>Todas</option>'
        }
        arrayCategorias.forEach(categoria => {
             select.innerHTML += `<option value=${categoria}>${categoria}</option>`
        })
    }
}

generarCategorias()

// NUEVA OPERACION //

const operaciones = []

const mostrarOperaciones = (arr) => {
    if(!arr.length){
        document.getElementById('con-operaciones').classList.add('oculto')
    } else {
        document.getElementById('con-operaciones').classList.remove('oculto')
        document.getElementById('sin-operaciones').classList.add('oculto') //NO ME LO OCULTA T_T
    }
}

mostrarOperaciones(operaciones)

const copiaOperaciones = [...operaciones] //creo copia de operaciones para poder filtrar entre gasto y ganacia, y dps por categorias


//TIPO, SELECT todos, gastos y ganacias

const selectTipo = document.getElementById('tipo')
// const filtroTodos = document.getElementById('filtro-todos')
// const filtroGasto = document.getElementById('filtro-gasto')
// const filtroGanancia = document.getElementById('filtro-ganancia')

selectTipo.addEventListener('change', (e) => {
    console.log(selectTipo)
    //selecciona todas => mostrar todas la operaciones en seccion operaciones 
    //selecciona gastos => mostrar gastos en seccion operaciones
    //selecciona ganacias => mostrar ganancias en seccion operaciones 
    //averiguar como hacer para que me valla mostrando las operaciones que va poniendo el usuario

    const tipoTodas = [...operaciones]
    const tipoGastos = []
    const tipoGanacias = []

    for(let i = 0; i < copiaOperaciones.length; i++) { //nos traemos todo lo que esta en la copia de operaciones
        console.log(copiaOperaciones[i]) //esto nos da cada uno de los objetos
        //vamos a filtrar por categor'ia con un if
        if(copiaOperaciones[i].tipo === selectTipo.value) {
        console.log(copiaOperaciones[i]) //buscamos en operaciones las que coincidan con lo que el usuario elija en el select(variable.value) y las tengo que guardar en un arreglo nuevo, una COPIA
        tipoTodas.push(copiaOperaciones[i])
        tipoGastos.push(copiaOperaciones[i])
        tipoGanacias.push(copiaOperaciones[i])
    }
    }
     console.log(tipoTodas)
    
    })
    