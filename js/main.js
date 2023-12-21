let tasks = [ 
  fetch("https://dev.adalab.es/api/todo")
    .then((response) => response.json())
    .then((data) => {
      tasks = data.results;
      renderAllTasks(tasks);
    })
    //{ name: "Recoger setas en el campo", id:"1657692730126289", completed: true },
    //{ name: "Comprar pilas", id:"16576927301283248", completed: true },
    //{ name: "Poner una lavadora de blancos", id:"16576927301315832", completed: true },
    //{
      //name: "Aprender cómo se realizan las peticiones al servidor en JavaScript", id:"16576927301332268",
      //completed: false,
    //},
  ];
const taskInput = document.querySelector(".js__main__text__tasks__add");
const taskFilter = document.querySelector(".js__main__text__tasks__filter");

const addTaskBtn = document.querySelector(".js__main__btn__add");
const filterTaskBtn = document.querySelector(".js__main__btn__filter");

const taskList = document.querySelector(".js__main__tasks__list");

const GITHUB_USER = '<tu_usuario_de_github_aqui>';
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;
//Variable con información fija
//let tasks = [];




//FUNCIONES
// Función para agregar una nueva tarea
function addTask() {
  const taskText = taskInput.value.trim();
  console.log(taskText);

  if (taskText !== "") {
    const uniqueId = uuidv4();

    tasks.push({
      id: uniqueId,
      name: taskText,
      completed: false,
    });
    renderAllTasks(tasks);
    taskInput.value = "";
    taskFilter.value="";
  }
}

const renderOneTask = (task) => {
  if (task.completed) {
    taskList.innerHTML += `<li class= "tachado" >
          <input id="${task.id}" type= "checkbox" checked/>
          ${task.name}
          </li>`;
  } else {
    taskList.innerHTML += `<li > 
    <input id= "${task.id}" type= "checkbox" /> ${task.name}
    </li>`;
  }
};
 
function actualizarInfoTareas() {
  const totalTareas = document.querySelector('.js__main__toDo').textContent;
  const tareasCompletadas = document.querySelector('.js__main__done').textContent;
  const tareasPendientes = document.querySelector('.js__main__undone').textContent;

  const frase = `Tienes ${totalTareas} tareas. ${tareasCompletadas} completadas y ${tareasPendientes} por realizar.`;

  const fraseTareas = document.createElement('div');
  fraseTareas.textContent = frase;

  const contenedorTareas = document.querySelector('.main__toDo');
  contenedorTareas.insertBefore(fraseTareas, contenedorTareas.firstChild);
}

// Llamada a la función cuando se carga la página para inicializar la frase
document.addEventListener('DOMContentLoaded', function() {
  actualizarInfoTareas();
});
const renderAllTasks = (tasks) => {
  taskList.innerHTML = "";
  let completadas = 0
  for (const eachTask of tasks) { 
    console.log(eachTask.completed)
    if (eachTask.completed){completadas++}
    renderOneTask(eachTask);
  }
  console.log (completadas)
};




function handleClickCheckbox(event) {
  //   Pero para aplicaciones más grandes que una lista de tareas
  // es mejor opción identificar el objeto que se ha representado
  // con el elemento clickado en el array de nuestros datos,
  // cambiar allí la información y volver a pintar todos los datos
  // en la página.
  // Obtengo el dato "gancho" del HTML:
  const idTask = parseInt (event.target.id)
  console.log (idTask)//dato gancho
  //   El "dato gancho" es aquel que pongo en el HTML al renderizarlo
  // que me permite identificar el objeto en el array de objetos
  // que corresponde en la tarea clickada.
  const indexTask = tasks.findIndex((task) => task.id === idTask);
  //   Ahora cambio en completed a lo contrario en el objeto con los
  // datos de la tarea clickada:
  tasks[indexTask].completed = !tasks[indexTask].completed;
  //   Y... vuelvo a pintar todas las tareas ahora que tengo los datos
  // actualizados:
  renderAllTasks(tasks);
}

function handleTaskKey(event){
    event.preventDefault();
    if (event.key === "Enter") {
        addTask(event);
    }
}

function handleTask(event){
    event.preventDefault();
        addTask(event);
}

function handleFilterTask(event){
    event.preventDefault();
    const filteredTasks = tasks.filter(item=>item.name.toLowerCase().includes(taskFilter.value.toLowerCase())); 
    renderAllTasks(filteredTasks); 
}

// SECCIÓN EVENTOS
taskList.addEventListener("click", handleClickCheckbox);

// Agregar una tarea al hacer clic en el botón "Agregar"
addTaskBtn.addEventListener("click", handleTask);

// Agregar una tarea al presionar la tecla "Enter" en el campo de entrada
//taskInput.addEventListener("keyup", handleTaskKey);

//filtrar
filterTaskBtn.addEventListener("click", handleFilterTask);

