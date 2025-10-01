const maiorNumeroSpana = document.getElementById('maiorNumero')
const menorNumeroSpana = document.getElementById('menorNumero')
const mediaNumerosSpana = document.getElementById('mediaNumeros')

const numeros = [1,8,3,5,9,2,4,7,6]

function analisarArray(numeros) {
    maiorNumeroSpana.innerText = Math.max(...numeros)
}


const maiorNumero = numeros.find (n => n === Math.max(...numeros))
const menorNumero = numeros.find (n => n === Math.min(...numeros))
const mediaNumeros = numeros.reduce((a,b) => a + b, 0) / numeros.length

console.log(mediaNumeros)
console.log(maiorNumero)
console.log(menorNumero)
