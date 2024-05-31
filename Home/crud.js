let formulario = document.getElementById('formularioAgregar');

let nombre = document.getElementById('nombre');
let fecha = document.getElementById('fecha');
let descripcion = document.getElementById('descripcion');
let video = document.getElementById('video');
let audio = document.getElementById('audio');

let listaTareas = document.getElementById('listaTareas');
let btnAgregar = document.getElementById('btnAgregar');
let listaTareasCompletadas = document.getElementById('listaTareasCompletadas');
let formularioEditar = document.getElementById('formularioEditar');

formulario.addEventListener("submit", (e) => {
    //previene que no se recargue la pagina
    e.preventDefault();
    agregarDatos();
    cerrarModal();
    mostrarTareas();
    formulario.reset();
});

let cerrarModal = () => {
    btnAgregar.setAttribute('data-bs-dismiss', 'modal');
    btnAgregar.click();
}

let tareas = [
    {
        nombre : "Agregar usuario",
        fecha : "2021-10-10",
        descripcion : "Camila",
        video :"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        audio : "https://s21.aconvert.com/convert/p3r68-cdx67/hn230-tjddn.mp3",
    },
    {
        nombre : "Agregar producto",
        fecha : "2011-09-02",
        descripcion : "Galletas de mantequilla",
        video : "https://images.pexels.com/photos/266706/pexels-photo-266706.jpeg?auto=compress&cs=tinysrgb&w=600",
        audio : "https://s19.aconvert.com/convert/p3r68-cdx67/f69xi-m1gd5.mp3"
    },
    {
        nombre : "Agregar producto",
        fecha : "2010-18-01",
        descripcion : "Chiles en nogada",
        video : "https://images.pexels.com/photos/17804954/pexels-photo-17804954/free-photo-of-plato-mexicano-mesa-frutas.jpeg?auto=compress&cs=tinysrgb&w=600",
        audio : "https://s31.aconvert.com/convert/p3r68-cdx67/xqg64-cfv7n.mp3"
    }
    
];

let agregarDatos = () =>{
    tareas.push({
        nombre : nombre.value,
        fecha : fecha.value,
        descripcion : descripcion.value,
        video : video.value,
        audio : audio.value
    });
    console.log(tareas);
}

let mostrarTareas = () => {
    //Le agregare codigo html
    listaTareas.innerHTML = '';
    //Agarrar cada dato de mi arreglo tarea
    tareas.forEach((tarea, indice) => {
        listaTareas.innerHTML += `
        <!-- Aquí se repetirá este bloque para cada tarea -->
        <div class="col-12 col-md-4">
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">${tarea.nombre}</h5>
                    <p class="card-text">Fecha: ${tarea.fecha}</p>
                    <p class="card-text">Descripción: ${tarea.descripcion}</p>

                    <!-- Código para la imagen -->
                    <div class="mb-3">
                        <strong><i class="bi bi-image"></i> &nbsp;Imagen:</strong>
                        ${tarea.video ? 
                        `<img src="${tarea.video}" class="card-img-top" alt="Imagen de tarea">` : 
                        '<p>No hay imagen disponible</p>'}
                    </div>

                    <!-- Código para el audio -->
                    <div class="mb-3">
                        <strong><i class="bi bi-music-note"></i> &nbsp;Audio:</strong>
                        ${tarea.audio ? 
                        `<audio src="${tarea.audio}" controls></audio>` : 
                        '<p>No hay audio disponible</p>'}
                    </div>
                    
                    <!-- Botones para editar y borrar -->
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editarModal" onClick="abrirModalEditar(${indice})"><i class="bi bi-pencil"></i> &nbsp;Editar</button>
                        <button class="btn btn-outline-danger" onClick="borrarTarea(this,${indice})"><i class="bi bi-trash"></i> &nbsp;Borrar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin del bloque repetido -->
        `;
    })
}

let indiceEditado;


let abrirModalEditar = (indice) => {
    indiceEditado = indice;
    
    let tarea = tareas[indice];
    
    //Aqui agrego los valores al modal, para que ya esten escritos
    document.getElementById('nombreEditar').value = tarea.nombre;
    document.getElementById('fechaEditar').value = tarea.fecha;
    document.getElementById('descripcionEditar').value = tarea.descripcion;
    document.getElementById('videoEditar').value = tarea.video;
    document.getElementById('audioEditar').value = tarea.audio;
}

formularioEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //Obteno los valores
    let nombreEditado = document.getElementById('nombreEditar').value;
    let fechaEditada = document.getElementById('fechaEditar').value;
    let descripcionEditada = document.getElementById('descripcionEditar').value;
    let videoEditado = document.getElementById('videoEditar').value; 
    let audioEditado = document.getElementById('audioEditar').value;
    
    tareas[indiceEditado] = {
        nombre: nombreEditado,
        fecha: fechaEditada,
        descripcion: descripcionEditada,
        video: videoEditado,
        audio: audioEditado
    };
    
    mostrarTareas();
    cerrarModalEditar();
});

let cerrarModalEditar = () => {
    btnGuardar.setAttribute('data-bs-dismiss', 'modal');
    btnGuardar.click();
}

let tareasCompletadas = [];

let borrarTarea = (boton,indice) => {
    if(confirm("¿Estas seguro de borrar esta tarea?")){
        //Lo quita de mi html
        boton.parentElement.parentElement.remove();
        //Quitar SOLO UN elemento de un arreglo  //Me lo quita de mi memoria
        let tareaEliminada = tareas.splice(indice, 1)[0];
        tareasCompletadas.push(tareaEliminada);
        mostrarTareasCompletadas();
        mostrarTareas()
    }else{
        alert("No se borro la tarea");
    }
}

let mostrarTareasCompletadas = () => {
    listaTareasCompletadas.innerHTML = '';
    let tarjetasHTML = '';

    // Iterar sobre las tareas completadas
    tareasCompletadas.forEach((tarea, index) => {
        // Agregar apertura de fila al inicio y cada tres tarjetas
        if (index % 3 === 0) {
            tarjetasHTML += '<div class="row">';
        }

        // Agregar tarjeta
        tarjetasHTML += `
        <div class="col-12 col-md-4 mb-4">
            <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title">${tarea.nombre}</h5>
                    <p class="card-text">Fecha: ${tarea.fecha}</p>
                    <p class="card-text">Descripción: ${tarea.descripcion}</p>

                    <!-- Código para la imagen -->
                    <div class="mb-3">
                        <strong><i class="bi bi-image"></i> &nbsp;Imagen:</strong>
                        ${tarea.video ? 
                        `<img src="${tarea.video}" class="card-img-top" alt="Imagen de la tarea">` : 
                        '<p>No hay imagen disponible</p>'}
                    </div>

                    <!-- Código para el audio -->
                    <div class="mb-3">
                        <strong><i class="bi bi-music-note"></i> &nbsp;Audio:</strong>
                        ${tarea.audio ? 
                        `<audio src="${tarea.audio}" controls></audio>` : 
                        '<p>No hay audio disponible</p>'}
                    </div>
                    <!-- Indicador de tarea completada -->
                    <div class="col-12 border">
                        <strong class="d-inline mb-3" style="max-width: 200px;"><i class="bi bi-calendar2-check"></i>&nbsp &nbsp &nbsp Tarea completada</strong>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Cerrar fila después de cada tres tarjetas o al final de la iteración
        if ((index + 1) % 3 === 0 || index === tareasCompletadas.length - 1) {
            tarjetasHTML += '</div>'; // Cerrar fila
        }
    });

    // Agregar tarjetas al contenedor
    listaTareasCompletadas.innerHTML = tarjetasHTML;
}

mostrarTareas();