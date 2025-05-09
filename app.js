let mainContainer = null

let filer = 'ALL'
let sort = 'ASCENDING'

let searchPhrase = ''
let searchInputIsFocused = false
let newToDoName = ''
let newToDoInputIsFocused = false

let tasks = [
    {
        name: 'Wynieś śmieci',
        isCompleted: true,
    },
    {
        name: 'Zmyj naczynia',
        isCompleted: true,
    }
]

const appendArray = function(array, container){
    array.forEach(function(element){
        container.appendChild(element)
    })
}

const renderTask = function(task){
    const container = document.createElement('div')
    container.className = 'todo-list__list-item'

    if(task.isCompleted){
        container.className = container.className + ' todo-list__list-item--completed'
    }

    container.innerText = task.name

    return container
}

const renderTasksList = function(tasks){
    const container = document.createElement('div')
    container.className = 'todo-list__list'

    const tasksElements = tasks.map((task)=> {
        return renderTask(task)
    })

    appendArray(tasksElements, container)
    return container
}

const render = function(){
    const container = document.createElement('div')
    container.className = 'todo-list'

    const taskListElement = renderTasksList(tasks)

    container.appendChild(taskListElement)
    
    return container
}

const init = function(selector){
    const container = document.querySelector(selector)
    if(!container){
        console.log('Container do not exist!')
        return
    } 

    mainContainer = container

    const app = render()

    mainContainer.appendChild(app)
}

init('.root')