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

}
)
