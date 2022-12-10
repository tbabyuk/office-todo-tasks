// DOM Elements

const container = document.querySelector("#container");
const inputNewItem = document.querySelector("#new_item_input");
const importanceLevels = document.getElementsByName("importance");
const btnAddItem = document.querySelector("#add_item_btn");
const itemsColumn = document.querySelector("#items_column");
const progressColumn = document.querySelector("#progress_column");
const completedColumn = document.querySelector("#completed_column");



inputNewItem.addEventListener("focus", () => {
    inputNewItem.value = "";
})

const createItem = (name, importance) => {
    const newItem = `
        <li class="to-do-item ${importance}">${name}<i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></li>
    `;
    itemsColumn.innerHTML += newItem;
    inputNewItem.value = "";
    inputNewItem.focus();
}


btnAddItem.addEventListener("click", (e) => {
    e.preventDefault();

    if(inputNewItem.value != "") {

    const itemName = inputNewItem.value.toLowerCase();
    let importanceLevel = "";

    importanceLevels.forEach(level => {
        if(level.checked) {
            importanceLevel = level.value;
        }
    })

    createItem(itemName, importanceLevel);
} else {
    alert("please enter a to do item")
    inputNewItem.focus();
}
});



// FUNCTIONS

// move a todo item
const moveItem = item => {
    if(item.parentElement.id === "items_column") {
        progressColumn.append(item);
    } else {
        completedColumn.append(item);
        item.classList.add("completed");
    }
};


// delete a todo item
const deleteItem = (item) => {
    item.remove();
};


//edit a todo item
const editItem = (target, content) => {
    target.innerHTML = content + '<i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i>';
};



// EVENT LISTENER ON CONTAINER, WITH BUBBLING
container.addEventListener("click", e => {
    if(e.target.className.includes("move")) {
        moveItem(e.target.parentElement);
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement);
    } else if(e.target.className.includes("edit")) {
        let content = prompt("Enter new item name").toLowerCase();
        editItem(e.target.parentElement, content);
    }
});



