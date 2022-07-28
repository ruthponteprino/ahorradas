//BOTONES//

const btnBalance = document.getElementById('btnBalance')
const btnCategorias = document.getElementById('btnCategorias')
const btnReportes = document.getElementById('btnReportes')
const btnNuevaOperacion = document.getElementById('btn-nueva-operacion')

//SECCIONES//
const balance = document.getElementById('seccion-balance') //TRAIGO SECCION BALANCE
const categorias = document.getElementById('seccion-categorias') //TRAIGO SECCION CATEGORIAS
const reportes = document.getElementById ('seccion-reportes') //TRAIGO SECCION REPORTES
const seccionOperacion = document.getElementById('seccion-operacion') //TRAIGO FORMULARIO OPERACIONES


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


//FILTROS//
//OCULTAR Y MOSTRAR FILTROS

const filtros = document.getElementById('filtros')
const btnOcultarFiltros = document.getElementById('btn-ocultar-filtros') 
const btnMostrarFiltros = document.getElementById('btn-mostrar-filtros') 

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
