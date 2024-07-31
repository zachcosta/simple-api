// import * as mongoose from "mongoose";
import {CardSchema} from "./lib/models/CardSchema.js";
import {getConnection, queryCards} from "./lib/utils/mongoose-utils";
// const Card = require('../models/CardSchema.js')


document.addEventListener("DOMContentLoaded", function(event) {
    alert('Hey')
});

const people = [
    { name: 'adri'},
    { name: 'becky'},
    { name: 'chris'},
    { name: 'dillon'},
    { name: 'evan'},
    { name: 'frank'},
    { name: 'georgette'},
    { name: 'hugh'},
    { name: 'igor'},
    { name: 'jacoby'},
    { name: 'kristina'},
    { name: 'lemony'},
    { name: 'matilda'},
    { name: 'nile'},
    { name: 'ophelia'},
    { name: 'patrick'},
    { name: 'quincy'},
    { name: 'roslyn'},
    { name: 'solene'},
    { name: 'timothy'},
    { name: 'uff'},
    { name: 'violet'},
    { name: 'wyatt'},
    { name: 'x'},
    { name: 'yadri'},
    { name: 'zack'},
]

const searchInput = document.querySelector('.input');
const clearButton = document.getElementById('clear-button')
const searchButton = document.getElementById('search-button')

const resultsList = document.getElementById('list')

searchInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        console.log(value)
    } else {
        clearList();
        console.log(value);
    }
})

searchButton.addEventListener("click", () => {
    let value = searchInput.value;

    alert("Test!")

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        console.log(value)

        submitSearchQuery(value);

        renderList(people.filter(person => {
            return person.name.includes(value)
        }))
    } else {
        clearList();
        console.log(value);
    }
})

clearButton.addEventListener("click", () => {
    clearList();
})

function renderList(results) {
    clearList();

    for (const person of results) {
        const resultItem = document.createElement('li');
        const text = document.createTextNode(person.name);

        resultItem.classList.add('result-item');
        resultItem.appendChild(text);

        resultsList.appendChild(resultItem);
    }

    if (results.length === 0) {
        noResults();
    }
}

function clearList() {
    resultsList.innerHTML = "";
}

function noResults() {
    const errorMessage = document.createElement('li');
    const text = document.createTextNode('No results found. Sorry!')

    errorMessage.classList.add('error-message');
    errorMessage.appendChild(text);
    resultsList.appendChild(errorMessage);
}

function submitSearchQuery(query) {
    const regexString = new RegExp(`/`+query+'/i')
    getConnection().then((Card) => {
        const searchQuery = { name: regexString, reprint: false, booster: true }
        queryCards(searchQuery, Card).then(cards => {
            console.log(`Found ${cards.length} cards containing "dwell"`)
            cards.forEach(card => {
                console.log(`"${card.name}" (${card.set} # ${card.collector_number})`);
            })
        })
    })

}