const tasks = [
    { name: "Recoger setas en el campo", completed: true },
    { name: "Comprar pilas", completed: true },
    { name: "Poner una lavadora de blancos", completed: true },
    {
      name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
      completed: false,
    },
  ];
const taskInput = document.querySelector(".js__main__text__tasks__add");
const taskFilter = document.querySelector(".js__main__text__tasks__filter");

const addTaskBtn = document.querySelector(".js__main__btn__add");
const filterTaskBtn = document.querySelector(".js__main__btn__filter");

const taskList = document.querySelector(".js__main__tasks__list");

//Variable con información fija
let tasks = [];


fetch("https://dev.adalab.es/api/todo")
  .then((response) => response.json())
  .then((data) => {
    tasks = data.results;
    renderAllTasks(tasks);
  });


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

const renderAllTasks = (tasks) => {
  taskList.innerHTML = "";
  for (const eachTask of tasks) {
    renderOneTask(eachTask);
  }
};

function handleClickCheckbox(event) {
  //   Pero para aplicaciones más grandes que una lista de tareas
  // es mejor opción identificar el objeto que se ha representado
  // con el elemento clickado en el array de nuestros datos,
  // cambiar allí la información y volver a pintar todos los datos
  // en la página.
  // Obtengo el dato "gancho" del HTML:
  const idTask = parseInt(event.target.id); //dato gancho
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
taskInput.addEventListener("keyup", handleTaskKey);

//filtrar
filterTaskBtn.addEventListener("click", handleFilterTask);



