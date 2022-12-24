// DOM Elements

const table = document.querySelector("#table-items-container");
const inputNewItem = document.querySelector("#new-item-input");
const formCreateItem = document.querySelector("#create-item-form");
const importanceLevels = document.getElementsByName("importance");
const itemsColumn = document.querySelector("#items-column");
const progressColumn = document.querySelector("#progress-column");
const completedColumn = document.querySelector("#completed-column");



// FUNCTIONS

// create a new to-do item
const createItem = (name, importance) => {
    const newItem = `
        <li class="to-do-item ${importance} text-break border">
            <span class="pe-3">${name}</span>
            <span class="item-buttons d-flex justify-content-between align-items-center"><i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></span>
        </li>
    `;
    console.log(newItem.children);
    itemsColumn.innerHTML += newItem;
    inputNewItem.value = "";
    inputNewItem.focus();
};


//edit a todo item
const editItem = (target, content) => {
    target.innerText = content;
};


// delete a todo item
const deleteItem = item => {
    item.remove();
};


// move a todo item
const moveItem = item => {
    if(item.parentElement.id === "items-column") {
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
table.addEventListener("click", e => {
    if(e.target.className.includes("edit")) {
        let content = prompt("Enter new item name").toLowerCase();
        editItem(e.target.parentElement.previousElementSibling, content);
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement.parentElement);
    } else if(e.target.className.includes("move")) {
        moveItem(e.target.parentElement.parentElement);
    }
});

