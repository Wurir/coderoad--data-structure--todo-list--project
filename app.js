let container = null

let filer = 'ALL'
let sort = 'ASCENDING'

let searchPhrase = ''
let searchInputIsFocused = false
let newToDoName = ''
let newToDoInputIsFocused = false

let tasks = [
    {
        name: 'Wynieś śmieci',
        isCompleted: false,
    }
]

const appendArray = function(array, container){
    array.forEach(function(element){
        container.appendChild(element)
    })
}