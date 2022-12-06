// DOM Elements

const inputNewItem = document.querySelector("#input_new_item");
const importanceLevels = document.getElementsByName("importance");
const btnAddItem = document.querySelector("#btn_add_item");
const itemsColumn = document.querySelector("#items_column");


// console.log(test)


// test.forEach(item => {
//     console.log(item.checked)
// })

const createItem = (name, importance) => {
    const newItem = `
        <li>${name} (${importance})</li>
    `;
    itemsColumn.innerHTML += newItem;
}


btnAddItem.addEventListener("click", (e) => {
    e.preventDefault();

    const itemName = inputNewItem.value;
    let importanceLevel = "";

    importanceLevels.forEach(level => {
        if(level.checked) {
            importanceLevel = level.value;
        }
    })

    createItem(itemName, importanceLevel);
});






