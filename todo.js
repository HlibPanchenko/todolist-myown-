const form = document.querySelector("#form");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector(".todo__list"); //ul
const emptyLi = document.querySelector(".todo__empty");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);

// checkEmptyList();

function addTask(e) {
  // console.log(taskList.children);

  e.preventDefault();
  let textFromInput = input.value;
  console.log(textFromInput);

  const markup = `<li class="todo__task">
	 <div class="todo__left">
		<p>
		  ${textFromInput}
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
