
const formulario = document.getElementById("formulario");
const campoTarea = document.getElementById("tarea");
const listaTareas = document.getElementById("listaTareas");

// Arreglo donde se guardan las tareas
let tareas = [];

// Agregar una tarea
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const texto = campoTarea.value.trim();

    if (texto === "") {
        return;
    }

    const nuevaTarea = {
        descripcion: texto,
        completada: false
    };

    tareas.push(nuevaTarea);

    campoTarea.value = "";
    renderTasks();
});

// Mostrar las tareas
function renderTasks() {
    listaTareas.innerHTML = "";

    // Primero las pendientes y luego las completadas
    const ordenadas = [
        ...tareas.filter(tarea => !tarea.completada),
        ...tareas.filter(tarea => tarea.completada)
    ];

    ordenadas.forEach(function(tarea) {
        const elemento = document.createElement("li");
        const checkbox = document.createElement("input");
        const texto = document.createElement("span");
        const boton = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;

        texto.textContent = tarea.descripcion;

        boton.textContent = "Eliminar";
        boton.className = "eliminar";

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        // Marcar o desmarcar tarea
        checkbox.addEventListener("change", function() {
            tarea.completada = checkbox.checked;
            renderTasks();
        });

        // Eliminar tarea
        boton.addEventListener("click", function() {
            tareas = tareas.filter(function(item) {
                return item !== tarea;
            });

            renderTasks();
        });

        elemento.appendChild(checkbox);
        elemento.appendChild(texto);
        elemento.appendChild(boton);

        listaTareas.appendChild(elemento);
    });
}
