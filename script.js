// DATABASE SETUP

// CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getFirestore, doc, deleteDoc, getDoc, getDocs, query, orderBy, addDoc, collection, Timestamp, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqQj0yoLFJfXT0s2G5lWk95iuv7cDFlIM",
    authDomain: "dcam-to-dos.firebaseapp.com",
    projectId: "dcam-to-dos",
    storageBucket: "dcam-to-dos.appspot.com",
    messagingSenderId: "183298464467",
    appId: "1:183298464467:web:e404de14c5d41d9e575226",
    measurementId: "G-BPQ76FQ98J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ==================================================================== //


// DOM ELEMENTS
const table = document.querySelector("#table-items-container");
const inputNewItem = document.querySelector("#new-item-input");
const formCreateItem = document.querySelector("#create-item-form");
const importanceLevels = document.getElementsByName("importance");
const itemsColumn = document.querySelector("#items-column");
const progressColumn = document.querySelector("#progress-column");
const completedColumn = document.querySelector("#completed-column");
const date = document.querySelector("#date");


// DATE
const locale = navigator.language;
const today = new Date();
const dateFormatted = today.toLocaleString(locale, { dateStyle: "full" });
date.innerText = dateFormatted;



// FUNCTIONS


// RETRIEVE EXISTING TODOS FROM FIRESTORE UPON INITIAL RENDER
const retrieveTodos = async () => {

    const colRef = collection(db, "todos");
    const q = query(colRef, orderBy("created_at", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(todo => {

    const newItem = `
    <li class="to-do-item ${todo.data().importance} text-break border" data-id=${todo.id}>
        <span class="pe-3">${todo.data().name}</span>
        <span class="item-buttons d-flex justify-content-between align-items-center"><i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></span>
    </li>
    `;

    if(todo.data().column === "progress") {
        progressColumn.innerHTML += newItem
    } else if(todo.data().column === "completed") {
        completedColumn.innerHTML += newItem
        // newItem.classList.add("completed");
    } else {
        itemsColumn.innerHTML += newItem;
    }
});
};

retrieveTodos();


// CREATE NEW TODO
const createItem = async (name, importance) => {

    // add new todo to firestore
    const now = new Date();
    const colRef = collection(db, "todos");
    const newDoc = await addDoc(colRef, {
        name,
        importance,
        created_at: Timestamp.fromDate(now)
    })

    console.log("Document written with ID: ", newDoc.id);

    // add new todo to UI
    const newItem = `
        <li class="to-do-item ${importance} text-break border" data-id=${newDoc.id}>
            <span class="pe-3">${name}</span>
            <span class="item-buttons d-flex justify-content-between align-items-center"><i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></span>
        </li>
    `;

    itemsColumn.innerHTML += newItem;
    inputNewItem.value = "";
    inputNewItem.focus();
};


// EDIT TODO
const editItem = async (item, content) => {

    // edit todo in UI
    item.children[0].innerText = content;

    // edit item in firestore
    const docRef = doc(db, "todos", item.getAttribute("data-id"))
    await updateDoc(docRef, {
        name: content
    })
};


// DELETE TODO
const deleteItem = async item => {

    // remove todo from UI
    item.remove();

    // delete same item from firestore
    const docRef = doc(db, "todos", item.getAttribute("data-id"))
    await deleteDoc(docRef);
};


// MOVE TODO
const moveItem = async item => {
    if(item.parentElement.id === "items-column") {

        // move todo to progress column in UI
        progressColumn.append(item);

        // add column field to todo in firestore
        const docRef = doc(db, "todos", item.getAttribute("data-id"))
        await updateDoc(docRef, {
            column: "progress"
        })
        .then(() => console.log("item added to progress column"))
    
    } else {

        // move todo to completed column in UI
        completedColumn.append(item);

        // add column field to todo in firestore
        const docRef = doc(db, "todos", item.getAttribute("data-id"))
        await updateDoc(docRef, {
            column: "completed"
        })
        .then(() => console.log("item added to completed column"))
    }
};


// =========================================================


// EVENT LISTENERS

// submit event for creating a new to-do item
formCreateItem.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputNewItem.value != "") {
    const itemName = inputNewItem.value;
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
        let content = prompt("Enter new item name");
        editItem(e.target.parentElement.parentElement, content);
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement.parentElement);
    } else if(e.target.className.includes("move")) {
        moveItem(e.target.parentElement.parentElement);
    }
});

