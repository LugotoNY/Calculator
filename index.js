// Pegar todos os elementos dos quais vamos precisar no HTML
const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')


/*Limita o usuario a digitar apenas os caracteres desejados*/
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

input.addEventListener('keydown',function(ev) {
    ev.preventDefault()
    if(allowedKeys.includes(ev.key)){
        input.value += ev.key
        return
}
if(ev.key === "Backspace") {
    input.value = input.value.slice(0, -1)
}
if(ev.key === 'Enter'){
    Calculate()
}
})

// Permitir que ooo usuario também digite os numeros clicando com o mouse
document.querySelectorAll('.charKey').forEach(function(charKeyButton){
    charKeyButton.addEventListener('click',function(){
        const value = charKeyButton.dataset.value
        input.value += value
    })
})

// Limpa o visor da calculadora

document.getElementById('clear').addEventListener('click',function(){
    input.value = ""
    input.focus()
})

//Executa o codigo digitado pelo usuario ao invés de criar
// uma função expecifica para cada operador
document.getElementById('equal').addEventListener('click', Calculate)

function Calculate(){
resultInput.value = 'Error 204!'
resultInput.classList.add('error')

const result = eval(input.value)

resultInput.value = result
resultInput.classList.remove('error')
}

//Copia o texto do resultado e mostra mensagemm de erro
document.getElementById('copyToClipboard').addEventListener('click',function(ev){
    const Button = ev.currentTarget
    if(Button.innerText === 'Copy'){
        Button.innerText = 'Copied'
        Button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    }else{
        Button.innerText = 'Copy'
        Button.classList.remove('success')
    }
})

//Dark mode e Light mode
document.getElementById('themeSwitcher').addEventListener('click',function(){
    if(main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color','#f1f5f9')
        root.style.setProperty('--border-color','#aaa')
        root.style.setProperty('--font-color','#212529')
        root.style.setProperty('--primary-color','#08a7f6')
        main.dataset.theme = 'light'
    }else{
        root.style.setProperty('--bg-color','#212529')
        root.style.setProperty('--border-color','#666')
        root.style.setProperty('--font-color','#f1f5f9')
        root.style.setProperty('--primary-color','#4dc4ff')
        main.dataset.theme = 'dark'
    }
})
