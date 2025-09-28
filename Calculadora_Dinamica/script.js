const inputNumero = document.getElementById('numero')
const selectOperacao = document.getElementById('operacao')
const btnGerar = document.getElementById('btn-gerar')
const resultado = document.getElementById('resultado')

btnGerar.addEventListener('click', () => {
    const n = Number(inputNumero.value);
    const op = selectOperacao.value;

    if (!Number.isFinite(n)) {
    resultado.innerHTML = '<p style="color:red;">Informe um número válido.</p>'
    return
    }

    let html = '<ul>'
    for (let i = 1; i <= 10; i++) {
    let calc;
    switch (op) {
        case '*':
        calc = n * i
        html += `<li>${n} × ${i} = ${calc}</li>`
        break
        case '/':
        calc = (i / n); // duas casas decimais
        html += `<li>${i} ÷ ${n} = ${calc}</li>`
        break
        case '+':
        calc = n + i
        html += `<li>${n} + ${i} = ${calc}</li>`
        break
        
        case '-':
        calc = n - i
        html += `<li>${n} - ${i} = ${calc}</li>`
        break;
    }
    }
    html += '</ul>'
    resultado.innerHTML = html
})