const maiorNumeroSpana = document.getElementById('maiorNumero')
const menorNumeroSpana = document.getElementById('menorNumero')
const mediaNumerosSpana = document.getElementById('mediaNumeros')
const numeros = document.getElementById('numeros')      

const numerosArray= []

numerosArray.push(numeros.value.split(',').map(Number))

const maiorNumero = numerosArray.find (n => n === Math.max(...numerosArray))
const menorNumero = numerosArray.find (n => n === Math.min(...numerosArray))
const mediaNumeros = numerosArray.reduce((a,b) => a + b, 0) / numeros.length

console.log(numerosArray)
console.log(mediaNumeros)
console.log(maiorNumero)
console.log(menorNumero)

