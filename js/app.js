// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')
// listeners
cargarEventListeners()
function cargarEventListeners() {
  // Dispara cuando se presiona agregar carrito
  cursos.addEventListener('click', comprarCurso);

  // Cuando se elimina un curso del carrito
  carrito.addEventListener('click', eliminarCurso);

  // cuando apretamos vaciar carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  // Al cargar el documento mostrar local Storage
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funciones

function comprarCurso(e) {
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>
          <img src="${curso.imagen}" width=100></img>
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
    `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  
  let curso,
      cursoID;

  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoID = curso.querySelector('a').getAttribute('data-id');
    
  }

   eliminarCursoLocalStorage(cursoID);
}

// Vaciar carrito en el DOM

function vaciarCarrito() {
  
  // listaCursos.innerHTML = ' ';
  while(listaCursos.firstChild){
    listaCursos.removeChild(listaCursos.firstChild);
  }

  // vaciar local storage
  vaciarLocalStorage();

  return false;
}


// Almacena cursos del carrito al local storage
function guardarCursoLocalStorage(curso) {
  let cursos;
 
  cursos = obtenerCursosLocalStorage();

  // el curso seleccionado se agrega al array
  cursos.push(curso);
  
  localStorage.setItem('cursos', JSON.stringify(cursos))
}

// comprueba que haya elementos en ls
function obtenerCursosLocalStorage() {
  let cursosLS;

  if(localStorage.getItem('cursos') === null) {
      cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }

  return cursosLS;
}

function leerLocalStorage() {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function(curso) {
    const row = document.createElement('tr');
      row.innerHTML = `
      <td>
          <img src="${curso.imagen}" width=100></img>
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
    `;
  listaCursos.appendChild(row);
  })
}

// eliminar el curso por el id en localstorage
function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  
  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function(cursoLS, index) {
    
    if(cursoLS.id === curso ){
      cursosLS.splice(index, 1);
    }
  })
  localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

function vaciarLocalStorage(){
  localStorage.clear();
}