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
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
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
  listaCursos.appendChild(row)
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  
  let curso;

  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove();
  }
}

// Vaciar carrito en el DOM

function vaciarCarrito() {
  
  // listaCursos.innerHTML = ' ';
  while(listaCursos.firstChild){
    listaCursos.removeChild(listaCursos.firstChild);
  }
}