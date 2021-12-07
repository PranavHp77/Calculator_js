const keys = document.querySelector('.cal_key')
const display = document.querySelector('.cal_display')
const calculator = document.querySelector('.calculator');

keys.addEventListener('click', event => {
    const key = event.target
    console.log(key.textContent)
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

    if (type == 'number') {
        if (displayValue == '0') {
            display.textContent = keyValue
        } else if (previousKeyType == 'operator') {
            display.textContent = keyValue;
        }
        else {
            display.textContent = displayValue + keyValue
        }

    }

    if (type == 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = '' })
        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }



    if (type == 'equal') {


        const firstNumber = parseFloat(calculator.dataset.firstNumber)
        const operator = calculator.dataset.operator
        const secondNumber = parseFloat(displayValue)

        display.textContent = calculate(firstNumber, operator, secondNumber)

    }
    calculator.dataset.previousKeyType = type
})

function clearDisplay(firstNumber, secondNumber) {
    firstNumber = '';
    secondNumber = '';
    display.textContent = '0'
}

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)
    let result = ''
    if (operator == 'plus') result = firstNumber + secondNumber
    if (operator == 'minus') result = firstNumber - secondNumber
    if (operator == 'times') result = firstNumber * secondNumber
    if (operator == 'divide') result = firstNumber / secondNumber

    return result
}