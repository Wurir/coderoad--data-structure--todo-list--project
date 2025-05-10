// App state

let mainContainer = null

let filter = 'ALL'
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
        isCompleted: false,
    }
]

// State changing functions

const onNewToDoNameChange = function (e) {
    newToDoName = e.target.value
    searchInputIsFocused = false
    newToDoInputIsFocused = true
    update()
}

const onNewToDoSubmit = function (e) {
    e.preventDefault()

    tasks = tasks.concat({
        name: newToDoName,
        isCompleted: false
    })

    newToDoName = ''

    update()
}

const onTaskCompleteToggle = function (indexToToggle) {

    tasks = tasks.map(function (task, index) {
        if (index !== indexToToggle) return task

        return {
            name: task.name,
            isCompleted: !task.isCompleted
        }
    })

    update()
}

const onTaskDelete = function (indexToDelete) {
    tasks = tasks.filter(function (task, index) {
        return index !== indexToDelete
    })

    update()
}

const filterByCompleted = function (task) {
    if (filter === 'ALL') return true

    if (filter === 'DONE') return task.isCompleted

    if (filter === 'NOT-DONE') return !task.isCompleted

    return true
}

const onFilterChange = function (filterValue) {
    filter = filterValue

    update()
}

const filterBySearchPhrase = function(task){
    const name = task.name.toLowerCase()
    const search = searchPhrase.toLowerCase()

    if(name.includes(search)) return true
    return false
}

const onSearchPhraseChange = function (e) {
    searchPhrase = e.target.value
    newToDoInputIsFocused = false
    searchInputIsFocused = true
    update()
}

// Generic / helper functions

const focus = function (condition, input) {
    if (condition) {
        setTimeout(function () {
            input.focus()
        }, 0)
    }
}

const appendArray = function (array, container) {
    array.forEach(function (element) {
        container.appendChild(element)
    })
}

// Rendering

const renderTask = function (task, onTaskToggle, onDelete) {
    const container = document.createElement('li')
    const wrapper = document.createElement('div')
    const textContainer = document.createElement('span')

    container.className = 'todo-list__list-item'
    wrapper.className = 'todo-list__list-item-wrapper'
    textContainer.className = 'todo-list__list-item-text-container'

    if (task.isCompleted) {
        container.className = container.className + ' todo-list__list-item--completed'
    }

    const onDeleteButton = renderButton('X', onDelete, 'todo-list__button todo-list__button--delete')

    container.addEventListener('click', onTaskToggle)

    const text = document.createTextNode(task.name)

    textContainer.appendChild(text)
    wrapper.appendChild(textContainer)
    wrapper.appendChild(onDeleteButton)
    container.appendChild(wrapper)

    return container
}

const renderTasksList = function (tasks) {
    const container = document.createElement('ol')
    container.className = 'todo-list__list'

    const tasksElements = tasks.map(function (task, index) {
        return renderTask(task, () => onTaskCompleteToggle(index), () => onTaskDelete(index))
    })

    appendArray(tasksElements, container)
    return container
}

const renderInput = function (onChange, value, focusCondition, className) {
    const input = document.createElement('input')
    input.className = className

    input.value = value

    input.addEventListener('input', onChange)

    focus(focusCondition, input)

    return input
}

const renderButton = function (label, onClick, className) {
    const button = document.createElement('button')
    button.className = className

    if (onClick) {
        button.addEventListener('click', onClick)
    }

    button.innerText = label

    return button
}

const renderNewTaskButton = function (label) {
    return renderButton(label, null, 'todo-list__button')
}

const renderNewTaskInput = function () {
    return renderInput(
        onNewToDoNameChange,
        newToDoName,
        newToDoInputIsFocused,
        'todo-list__input'
    )
}

const renderNewTaskForm = function () {
    const container = document.createElement('form')
    container.className = 'todo-list__form '

    container.addEventListener('submit', onNewToDoSubmit)

    const inputElement = renderNewTaskInput()
    const buttonElement = renderNewTaskButton('ADD')

    container.appendChild(inputElement)
    container.appendChild(buttonElement)

    return container
}

const renderFilterButton = function(filterValue, activeFilter){
    let className = 'todo-list__button todo-list__button--filter'
    if(filterValue === activeFilter){
        className = className + ' todo-list__button--filter-active'
    }

        return renderButton(filterValue, () => onFilterChange(filterValue), className)       
}

const renderFilters = function (activeFilter) {
    const container = document.createElement('div')
    container.className = 'todo-list__filters'

    const buttonAll = renderFilterButton('ALL', activeFilter)
    const buttonDone = renderFilterButton('DONE', activeFilter)
    const buttonNotDone = renderFilterButton('NOT-DONE', activeFilter)

    container.appendChild(buttonAll)
    container.appendChild(buttonDone)
    container.appendChild(buttonNotDone)

    return container
}

const renderSearch = function () {
    const container = document.createElement('div')
    container.className = 'todo-list__filters'

    const input = renderInput(onSearchPhraseChange, searchPhrase, searchInputIsFocused, 'todo-list__input')
    input.placeholder = 'Search'

    container.appendChild(input)

    return container
}

const render = function () {
    const container = document.createElement('div')
    container.className = 'todo-list'

    const filteredTasks = tasks
        .filter(filterByCompleted)
        .filter(filterBySearchPhrase)
    

    const searchElement = renderSearch()
    const filtersElement = renderFilters(filter)
    const newTaskFormElement = renderNewTaskForm()
    const taskListElement = renderTasksList(filteredTasks)

    container.appendChild(searchElement)
    container.appendChild(filtersElement)
    container.appendChild(newTaskFormElement)
    container.appendChild(taskListElement)

    return container
}

const update = function () {
    mainContainer.innerHTML = ''

    const app = render()

    mainContainer.appendChild(app)
}

const init = function (selector) {
    const container = document.querySelector(selector)
    if (!container) {
        console.log('Container do not exist!')
        return
    }

    mainContainer = container

    const app = render()

    mainContainer.appendChild(app)
}

init('.root')