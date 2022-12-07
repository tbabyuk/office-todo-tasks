// DOM Elements

const inputNewItem = document.querySelector("#input_new_item");
const importanceLevels = document.getElementsByName("importance");
const btnAddItem = document.querySelector("#btn_add_item");
const itemsColumn = document.querySelector("#items_column");
const progressColumn = document.querySelector("#progress_column");
const completedColumn = document.querySelector("#completed_column");


// console.log(test)


// test.forEach(item => {
//     console.log(item.checked)
// })

inputNewItem.addEventListener("focus", () => {
    inputNewItem.value = "";
})

const createItem = (name, importance) => {
    const newItem = `
        <li class="to-do-item ${importance}">${name}<i class="far fa-trash-alt delete"></i></li>
    `;
    itemsColumn.innerHTML += newItem;
    inputNewItem.value = "";
    inputNewItem.focus();
}


btnAddItem.addEventListener("click", (e) => {
    e.preventDefault();

    if(inputNewItem.value != "") {

    const itemName = inputNewItem.value;
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


const deleteItem = (item) => {
    item.remove();
}



itemsColumn.addEventListener("click", e => {
    if(e.target.className.includes("to-do-item")) {
        console.log("you clicked on a to do item");
        const item = e.target;
        progressColumn.append(item);
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement)
    }
});


progressColumn.addEventListener("click", e => {
    if(e.target.className.includes("to-do-item")) {
        console.log("you clicked on a to do item");
        const item = e.target;
        completedColumn.append(item);
        item.classList.add("gray");
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement)
    }
});

completedColumn.addEventListener("click", e => {
    if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement)
    }
});



