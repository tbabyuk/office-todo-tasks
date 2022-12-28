// DATABASE SETUP

// CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getFirestore, doc, deleteDoc, getDoc, getDocs, query, orderBy, addDoc, collection, Timestamp, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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


// retrieve todo items from firestore by date created

const retrieveTodos = async () => {


    const colRef = collection(db, "todos");
    const q = query(colRef, orderBy("created_at", "asc"));
    const docsSnap = await getDocs(q);
    docsSnap.forEach(doc => {

    const newItem = `
    <li class="to-do-item ${doc.data().importance} text-break border">
        <span class="pe-3">${doc.data().name}</span>
        <span class="item-buttons d-flex justify-content-between align-items-center"><i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></span>
    </li>
    `;
    itemsColumn.innerHTML += newItem;
});
};

retrieveTodos();


// create new todo item

const createItem = async (name, importance) => {
    const newItem = `
        <li class="to-do-item ${importance} text-break border">
            <span class="pe-3">${name}</span>
            <span class="item-buttons d-flex justify-content-between align-items-center"><i class="far fa-edit edit"></i><i class="far fa-trash-alt delete"></i><i class="fas fa-chevron-circle-right move"></i></span>
        </li>
    `;
    itemsColumn.innerHTML += newItem;
    inputNewItem.value = "";
    inputNewItem.focus();

    const now = new Date();
    const colRef = collection(db, "todos");
    const docRef = await addDoc(colRef, {
        name,
        importance,
        created_at: Timestamp.fromDate(now)
    })
    console.log("Document written with ID: ", docRef.id);
};


//edit a todo item
const editItem = (target, content) => {
    target.innerText = content;
};


// delete a todo item

const deleteFromDB = id => {
    const docRef = doc(db, "todos", id);
    deleteDoc(docRef);
}


const deleteItem = async item => {

    item.remove();
    const itemText = item.children[0].textContent;

    console.log(itemText)
    
    const colRef = collection(db, "todos");
    const q = query(colRef, where("name", "==", itemText));
    const result = await getDocs(q)
    const res = result.forEach(doc => deleteFromDB(doc.id));
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
        editItem(e.target.parentElement.previousElementSibling, content);
    } else if(e.target.className.includes("delete")) {
        deleteItem(e.target.parentElement.parentElement);
    } else if(e.target.className.includes("move")) {
        moveItem(e.target.parentElement.parentElement);
    }
});

