const checkBox = document.querySelectorAll('.custom-checkbox');

const input = document.querySelectorAll('.goal-input');
const error = document.querySelector('.error-label');
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const quote = document.querySelector('.quote')
const btn = document.querySelector('.btn')
// const flag = 0;
const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

const bottomQuotes = [
    '“Move one step ahead, today!”',
    '"you can do more then, you can think.."',
    '“Keep Going, You’re making great progress!”',
    '"Well done, You achieved all your Goals :)"'
]


btn.addEventListener('click', (e) => {
    localStorage.clear();
    window.location.reload();
})

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoalsCount / input.length * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${input.length}completed`
progressLabel.innerText = allQuotes[completedGoalsCount]
quote.innerText = bottomQuotes[completedGoalsCount]

checkBox.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allInputFilled = [...input].every((i) => {
            return i.value
        })
        if (allInputFilled) {
            checkbox.parentElement.classList.toggle('completed');
            // progressValue.style.width = '33.33%';
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

            progressValue.style.width = `${completedGoalsCount / input.length * 100}%`
            progressLabel.innerText = allQuotes[completedGoalsCount]
            quote.innerText = bottomQuotes[completedGoalsCount]
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${input.length} completed`

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        } else {
            progressBar.classList.add('show-error')
        }

    })
})

input.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name
        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed');
        }
    }



    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            e.target.value = allGoals[input.id].name
            return
        }
        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
        } else {
            allGoals[input.id] = {
                name: input.value,
                completed: false
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })

})

