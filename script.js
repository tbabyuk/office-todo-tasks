// DOM Elements

const container = document.querySelector("#container");
const inputNewItem = document.querySelector("#new_item_input");
const formCreateItem = document.querySelector("#create_item_form");
const importanceLevels = document.getElementsByName("importance");
const itemsColumn = document.querySelector("#items_column");
const progressColumn = document.querySelector("#progress_column");
const completedColumn = document.querySelector("#completed_column");



// FUNCTIONS

// create a new to-do item
const createItem = (name, importance) => {
    const newItem = `
        <li class="to-do-item ${importance}">${name}<i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></li>
    `;
    itemsColumn.innerHTML += newItem;
    inputNewItem.value = "";
    inputNewItem.focus();
};


//edit a todo item
const editItem = (target, content) => {
    target.innerHTML = content + '<i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i>';
};


// delete a todo item
const deleteItem = item => {
    item.remove();
};


// move a todo item
const moveItem = item => {
    if(item.parentElement.id === "items_column") {
        progressColumn.append(item);
    } else {
        completedColumn.append(item);
        item.classList.add("completed");
    }
};


// =========================================================


// EVENT LISTENERS

// submit event for creating a new to-do item
formCreateItem.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputNewItem.value != "") {
    const itemName = inputNewItem.value.toLowerCase();
    let importanceLevel = "";
    importanceLevels.forEach(level => {
        if(level.checked) {
            importanceLevel = level.value;
        }
    });
    createItem(itemName, importanceLevel);
} else {
    alert("please enter a to-do item")
    inputNewItem.focus();
}
});


// clearning text from input
inputNewItem.addEventListener("focus", () => {
    inputNewItem.value = "";
});


// event bubbling on container, for editing, deleting, and moving to-do items
container.addEventListener("click", e => {
    if(e.target.className.includes("edit")) {
        let content = prompt("Enter new item name").toLowerCase();
        editItem(e.target.parentElement, content);
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement);
    } else if(e.target.className.includes("move")) {
        moveItem(e.target.parentElement);
    }
});


