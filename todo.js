const form = document.querySelector("#form");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector(".todo__list"); //ul
const emptyLi = document.querySelector(".todo__empty");
const modal = document.querySelector("._modal"); // модальное окно

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", openModal);
// checkEmptyList();

let arrayOfTasksForLS = [];

// При загрузке страницы провряем есть ли что-то в LS, если есть, тогда отрисовываем

if (localStorage.getItem("task")) {
  arrayOfTasksForLS = JSON.parse(localStorage.getItem("task"));
  // console.log(tasks);
  // отрисуем на странице то, что лежит в LS
  arrayOfTasksForLS.forEach((task) => {
    //  console.log(task);
    // arrayOfTasksForLS.push(task);
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
        <button class="button-todo__edit" id="edit-button">
                      <img class="button-todo" src="/img/pencil.png" alt="" />
                    </button>
    	 </div>
      </li>`;

    taskList.insertAdjacentHTML("beforeend", markup);
  });
}

if (taskList.children.length > 0) {
  emptyLi.classList.add("none");
}

// console.log(localStorage.getItem("task"));
// if (localStorage.getItem("task")) {
//   let arrOfTasksFromLS = localStorage.getItem("task");
//   let parsedArrTasksFromLS = JSON.parse(arrOfTasksFromLS);
//   //   console.log(arrOfTasksFromLS);
//   //   console.log(parsedArrTasksFromLS);

//   parsedArrTasksFromLS.forEach((task) => {
//     //  console.log(task);
//     arrayOfTasksForLS.push(task);
//     const markup = `<li class="todo__task" id="${task.id}">
// 	 <div class="todo__left">
// 		<p>
// 		  ${task.text}
// 		</p>
// 	 </div>
// 	 <div class="todo__right button-todo">
// 		<button class="button-todo__green" id="done-button">
// 		  <img class="button-todo" src="/img/tick.svg" alt="" />
// 		</button>
// 		<button class="button-todo__red" id="delete-button">
// 		  <img class="button-todo" src="/img/cross.svg" alt="" />
// 		</button>
//     <button class="button-todo__edit" id="edit-button">
//                   <img class="button-todo" src="/img/pencil.png" alt="" />
//                 </button>
// 	 </div>
//   </li>`;

//     taskList.insertAdjacentHTML("beforeend", markup);
//   });

//   if (taskList.children.length > 0) {
//     emptyLi.classList.add("none");
//   }
// }

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
    <button class="button-todo__edit" id="edit-button">
                  <img class="button-todo" src="/img/pencil.png" alt="" />
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

    // Еcли удаляем все таски, то показываем "я пустой"
    if (taskList.children.length == 1) {
      emptyLi.classList.remove("none");
    }

    //   console.log(e.target.closest("li").id);

    // удаляет объекты с LS
    // let arrOfTasksFromLS = localStorage.getItem("task");
    // let parsedArrTasksFromLS = JSON.parse(arrOfTasksFromLS);
    // console.log(parsedArrTasksFromLS);
    // let indexOfDeletedEl = parsedArrTasksFromLS.findIndex(
    //   (el) => el.id == e.target.closest("li").id
    // );
    // console.log(indexOfDeletedEl);
    // // parsedArrTasksFromLS.splice(indexOfDeletedEl, 1);
    // arrayOfTasksForLS.splice(indexOfDeletedEl, 1);

    const id = task.id;

    // Находим индекс задачи в массиве
    const index = arrayOfTasksForLS.findIndex((task) => {
      console.log(task);
      if (task.id == id) {
        return true;
      }
    });

    // Удаляем задачу из массива
    arrayOfTasksForLS.splice(index, 1);
    // localStorage.setItem("task", JSON.stringify(parsedArrTasksFromLS));
    localStorage.setItem("task", JSON.stringify(arrayOfTasksForLS));

    //   parsedArrTasksFromLS.forEach((taskInLs) => {
    // 	if (e.target.closest("li").id == taskInLs.id) {
    // 		// Ищем индекс этого элемента в массиве, чтобы потом его по этому индексу удалить
    // 		parsedArrTasksFromLS.findIndex(el => el.id == e.target.closest("li").id);
    // 	}
    //   })

    task.remove();
  }
}

//modal
function openModal(e) {
  if (e.target.className == "button-todo__edit") {
    console.log("meow");
    modal.classList.add("active");
    // повесим класс на боди, который оапретит скролл когда модальное окно открыто
    let body = document.querySelector("body");
    body.classList.add("_locked");

    //input
    let liWeWantToEdit = e.target.closest("li");
    console.log(liWeWantToEdit);
    let textFromInput = liWeWantToEdit.querySelector("p").textContent.trim();
    console.log(textFromInput);
    let markupModal = `
    <input class="modal-callback__input" type="text" value="${textFromInput}" autofocus id="${liWeWantToEdit.id}">
    <button class="modal-callback__btn" type="submit"> Внести изменения </button>
    `;
    document
      .querySelector(".modal-callback__text")
      .insertAdjacentHTML("afterbegin", markupModal);

    let inputEdit = document.querySelector(".modal-callback__input");
    console.log(inputEdit);
  }
}

modal.addEventListener("click", closeModal);

function closeModal(e) {
  if (
    e.target.classList.contains("modal-close") ||
    e.target.classList.contains("modal-bg")
  ) {
    modal.classList.remove("active");
    let body = document.querySelector("body");
    body.classList.remove("_locked");

    // Чтобы каждый раз когда выходим с модального окна, разметка внутри этого окна удаляется
    document.querySelector(".modal-callback__input").remove();
    document.querySelector(".modal-callback__btn").remove();
  }
}

// вынес в глобальную область видимости чтобы другие функции видели
// let newText = '';

// document.querySelector('.modal-callback__btn').addEventListener('click', editTextInput);
// внести изменения которые ввели в инпут в модальном окне
modal.addEventListener("click", editTextInput);

function editTextInput(e) {
  if (e.target.classList.contains("modal-callback__btn")) {
    // arrayOfTasksForLS = [];

    let inputInModal = document.querySelector(".modal-callback__input");
    // console.log(inputInModal);
    let newText = inputInModal.value;
    console.log(newText);

    console.log(arrayOfTasksForLS);
    // по нажатию на кнопку меняется массив с данными, меняем value у таски и закрываем модальное окно
    arrayOfTasksForLS.forEach((el) => {
      if (el.id == inputInModal.id) {
        el.text = newText;
        console.log(el);
      }

      console.log(arrayOfTasksForLS);
    });
    // вносим изменения в LS
    localStorage.setItem("task", JSON.stringify(arrayOfTasksForLS));

    // отрисовываем
    // let arrOfTasksFromLS = localStorage.getItem("task");
    // let parsedArrTasksFromLS = JSON.parse(arrOfTasksFromLS);
    // console.log(arrOfTasksFromLS);
    // console.log(parsedArrTasksFromLS);

    // arrayOfTasksForLS = [];
    // вот тут ниже надо исправлять (строки 277-301)
    taskList.innerHTML = ""; // очищаем разметку потому что дублировалось когда вносили изменения в таску
    // и уже в расчищеную разметку вставляем обновленные liшки
    arrayOfTasksForLS.forEach((task) => {
      //  console.log(task);

      // arrayOfTasksForLS.push(task);
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
      <button class="button-todo__edit" id="edit-button">
                    <img class="button-todo" src="/img/pencil.png" alt="" />
                  </button>
     </div>
    </li>`;

      taskList.insertAdjacentHTML("beforeend", markup);
    });

    if (taskList.children.length > 0) {
      emptyLi.classList.add("none");
    }

    modal.classList.remove("active");
    // Чтобы каждый раз когда выходим с модального окна, разметка внутри этого окна удаляется
    document.querySelector(".modal-callback__input").remove();
    document.querySelector(".modal-callback__btn").remove();
  }
}