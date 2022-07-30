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

const operaciones = [    //objetos para prueba de filtros luego borrar
    {
        descripcion: 'Desayuno',
        monto: 10,
        categoria: 'Comida',
        tipo: 'gasto'
    },
    {
        descripcion: 'Almuerzo',
        monto: 100,
        categoria: 'Comida',
        tipo: 'gasto'
    },
    {
        descripcion: 'gasolina',
        monto: 20,
        categoria: 'Transporte',
        tipo: 'gasto'
    },
    {
        descripcion: 'cliente nuevo',
        monto: 200,
        categoria: 'Trabajo',
        tipo: 'ganancia'
    },
    {
        descripcion: 'cliente3',
        monto: 200,
        categoria: 'Trabajo',
        tipo: 'ganancia'
    },
    {
        descripcion: 'cliente2',
        monto: 100,
        categoria: 'Trabajo',
        tipo: 'ganancia'
    }
]

console.log(operaciones)

const mostrarOperaciones = (arr) => {
    if(!arr.length){
        document.getElementById('con-operaciones').classList.add('oculto')
    } else {
        document.getElementById('con-operaciones').classList.remove('oculto')
        document.getElementById('sin-operaciones').classList.add('oculto')
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
    
    console.log(e.target.value)
    //selecciona todas => mostrar todas la operaciones en seccion operaciones 
    //selecciona gastos => mostrar gastos en seccion operaciones
    //selecciona ganacias => mostrar ganancias en seccion operaciones 
    //averiguar como hacer para que me valla mostrando las operaciones que va poniendo el usuario

    const tipoTodas = [...operaciones]
    const tipoGastos = []
    const tipoGanacias = []
    })
    
    //tipo

    const selectTipoFiltros = document.getElementById('selectTipoFiltros')

    selectTipoFiltros.addEventListener('change', (e) => {
        console.log(e.target.value)
        if(e.target.value !== 'todos') {
            const porTipo = operaciones.filter(operaciones => operaciones.tipo === e.target.value)
            console.log(porTipo)
        } else {
            console.log(operaciones)
        }
    })

    //categorias

    const selectCategoriaFiltros = document.getElementById('selectCategoriaFiltros')

    selectCategoriaFiltros.addEventListener('change', (e) => {
        console.log(e.target.value)
        if(e.target.value !== 'todas') {
            const porCategoria = operaciones.filter(operaciones => operaciones.categoria === e.target.value)
            console.log(porCategoria)
        } else {
            console.log(operaciones)
        }
    //los values tiene que estar escritos igual
    })
    