
eventListeners();



function eventListeners() {

     document.querySelector('#formulario').addEventListener('submit', agregarNota);

     document.querySelector('#lista-notas').addEventListener('click', eliminarNota);

     document.addEventListener('DOMContentLoaded', agregarNotasRecuperadasDelLocalStorageALista)

}


//agrega nota al local storage
function agregarNota(e) {

     e.preventDefault();

     const nota = document.querySelector('#nota');

     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-nota';
     botonBorrar.innerText = 'X';

     const li = document.createElement('li');
     li.innerText = nota.value;
     li.appendChild(botonBorrar);
     document.querySelector('#lista-notas').appendChild(li);

     agregarNotaLocalStorage(nota.value);

     document.querySelector('#nota').value = '';

};


//elimina nota del listado
function eliminarNota(e) {

     e.preventDefault();

     if (e.target.className === 'borrar-nota') {
          e.target.parentElement.remove();
          eliminarNotasLocalStorage(e.target.parentElement.textContent);

     }
}



//agrega la nota al local storage
function agregarNotaLocalStorage(nota) {

     let todasLasNotas = recuperarNotasDeLocalStorage();

     todasLasNotas.push(nota);

     localStorage.setItem('notas', JSON.stringify(todasLasNotas));

};

//chequea que haya elementos en el local storage y los retorna en un arreglo
function recuperarNotasDeLocalStorage() {

     let todasLasNotas;

     if (localStorage.getItem('notas') === null) {
          todasLasNotas = [];
     } else {
          todasLasNotas = JSON.parse(localStorage.getItem('notas'));
     }

     return todasLasNotas;

};

//agrega los notas del local storage en el html cuando carga la pagina
function agregarNotasRecuperadasDelLocalStorageALista() {

     let todasLasNotas = recuperarNotasDeLocalStorage();

     todasLasNotas.forEach(element => {

          let botonBorrar1 = document.createElement('a');
          botonBorrar1.classList = 'borrar-nota';
          botonBorrar1.innerText = 'X';

          const li = document.createElement('li');
          li.innerText = element;
          li.appendChild(botonBorrar1);
          document.querySelector('#lista-notas').appendChild(li);


     });

}


function eliminarNotasLocalStorage(notaDeLaLista) {

     let notasLocalStorage = recuperarNotasDeLocalStorage();

     notaPreparada = notaDeLaLista.substring(0, notaDeLaLista.length - 1);

     notasLocalStorage.forEach(function (element, index) {


          if (notaPreparada === element) {

               notasLocalStorage.splice(index, 1);

               localStorage.removeItem(element);
          }
     });

     localStorage.setItem('notas', JSON.stringify(notasLocalStorage));

}
















