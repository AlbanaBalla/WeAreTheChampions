import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-da4ff-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const endorsementEl = document.getElementById("endorsement-el")
const fromEl = document.getElementById("from-el")
const toEL = document.getElementById("to-el")
const btn = document.getElementById("button")
const endorsementList = document.getElementById("endorsement-list")


btn.addEventListener("click", function() {
    let fromValue = (fromEl.value)
    let toValue = toEL.value
    let inputValue = endorsementEl.value
    const allEl = `
    To ${toValue}
    ${inputValue}
    From ${fromValue}
    `
    
    push(endorsementListInDB, allEl)
    
    clearEndorsementEl()
    clearFromEl()
    clearToEl()
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementlist()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementList(currentItem)
        }    
    } else {
        endorsementList.innerHTML = "No endorsements jet..."
    }
})


function clearEndorsementEl() {
    endorsementEl.value = ""
}

function clearFromEl() {
    fromEl.value = ""
}

function clearToEl () {
    toEL.value = ""
}

function clearEndorsementlist() {
    endorsementList.innerHTML = ""
}


function appendItemToEndorsementList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfEndorsementlistDB = ref(database, `endorsementList/${itemID}`)
        
        remove(exactLocationOfEndorsementlistDB)
    })
    
    endorsementList.append(newEl)
}