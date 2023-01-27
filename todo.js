const form = document.querySelector("#form");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector(".todo__list"); //ul
const emptyLi = document.querySelector(".todo__empty");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);

// checkEmptyList();

let arrayOfTasksForLS = [];

// При загрузке страницы провряем есть ли что-то в LS, если есть, тогда отрисовываем
// console.log(localStorage.getItem("task"));
if (localStorage.getItem("task")) {
  let arrOfTasksFromLS = localStorage.getItem("task");
  let parsedArrTasksFromLS = JSON.parse(arrOfTasksFromLS);
  //   console.log(arrOfTasksFromLS);
  //   console.log(parsedArrTasksFromLS);

  parsedArrTasksFromLS.forEach((task) => {
    //  console.log(task);
    arrayOfTasksForLS.push(task);
    const markup = `<li class="todo__task" id="${task.id}">
	 <div class="todo__left">
		<p>
		  ${task.text}
		</p>
	 </div>
	 <div class="todo__right button-todo">
		<button class="button-todo__green" id="done-button">
		  <img class="button-todo" src="/img/tick.svg" alt="" />
		</button>
		<button class="button-todo__red" id="delete-button">
		  <img class="button-todo" src="/img/cross.svg" alt="" />
		</button>
	 </div>
  </li>`;

    taskList.insertAdjacentHTML("beforeend", markup);
  });

  if (taskList.children.length > 0) {
    emptyLi.classList.add("none");
  }
}

function addTask(e) {
  // console.log(taskList.children);

  e.preventDefault();
  let textFromInput = input.value;
  //   console.log(textFromInput);

  // Запишем текст с формы в Local Storage

  let taskObj = {
    id: Date.now(),
    text: textFromInput,
    done: false,
  };

  //   console.log(taskObj);

  arrayOfTasksForLS.push(taskObj);
  //   console.log(arrayOfTasksForLS);

  localStorage.setItem("task", JSON.stringify(arrayOfTasksForLS));

  //

  const markup = `<li class="todo__task" id="${taskObj.id}">
	 <div class="todo__left">
		<p>
		  ${taskObj.text}
		</p>
	 </div>
	 <div class="todo__right button-todo">
		<button class="button-todo__green" id="done-button">
		  <img class="button-todo" src="/img/tick.svg" alt="" />
		</button>
		<button class="button-todo__red" id="delete-button">
		  <img class="button-todo" src="/img/cross.svg" alt="" />
		</button>
	 </div>
  </li>`;

  taskList.insertAdjacentHTML("beforeend", markup);

  input.value = "";

  // Убираем "Я пустой", если нету тасок
  console.log(taskList.children.length);
  if (taskList.children.length > 1) {
    emptyLi.classList.add("none");
  }
}

function deleteTask(e) {
  if (e.target.className == "button-todo__red") {
    // если нажали на крестик, ищем li (таску) и удаляем ее.
    let task = e.target.closest("li");
    // let task = deleteButton.closest('li');
    console.log(task);
    task.remove();
  }

  // Еcли удаляем все таски, то показываем "я пустой"
  if (taskList.children.length == 1) {
    emptyLi.classList.remove("none");
  }

  //   console.log(e.target.closest("li").id);

  // удаляет объекты с LS
  let arrOfTasksFromLS = localStorage.getItem("task");
  let parsedArrTasksFromLS = JSON.parse(arrOfTasksFromLS);
  console.log(parsedArrTasksFromLS);
  let indexOfDeletedEl = parsedArrTasksFromLS.findIndex(
    (el) => el.id == e.target.closest("li").id
  );
  console.log(indexOfDeletedEl);
  parsedArrTasksFromLS.splice(indexOfDeletedEl, 1);
  arrayOfTasksForLS.splice(indexOfDeletedEl, 1);

  localStorage.setItem("task", JSON.stringify(parsedArrTasksFromLS));

  //   parsedArrTasksFromLS.forEach((taskInLs) => {
  // 	if (e.target.closest("li").id == taskInLs.id) {
  // 		// Ищем индекс этого элемента в массиве, чтобы потом его по этому индексу удалить
  // 		parsedArrTasksFromLS.findIndex(el => el.id == e.target.closest("li").id);
  // 	}
  //   })
}

// function checkEmptyList() {
// 	const emptyList = `<li class="todo__empty empty-li">
// 	<p>Я пустой</p>
//  </li>`;

//  if (taskList.children.length == 0) {
// 	taskList.insertAdjacentHTML('afterbegin', emptyList);
//  }

//  if (taskList.children.length > 0) {
// 	emptyLi ? emptyLi.remove() : null;
//  }
// }
