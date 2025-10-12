function processarNumeros() {
    const numerosInput = document.getElementById('numeros');
    const maiorNumeroSpana = document.getElementById('maiorNumero');
    const menorNumeroSpana = document.getElementById('menorNumero');
    const mediaNumerosSpana = document.getElementById('mediaNumeros');

    
    if (!numerosInput || !maiorNumeroSpana || !menorNumeroSpana || !mediaNumerosSpana) {
        console.error("Erro: Um ou mais elementos HTML necessários não foram encontrados.");
        return;
    }

    
    const valorDoInput = numerosInput.value.trim(); 

    if (!valorDoInput) {
        alert("Por favor, insira números antes de calcular.");
        return; 
    }

    
    const numerosLidos = valorDoInput
        .split(',')
        .map(numero => Number(numero.trim()))
        .filter(n => !isNaN(n));

    if (numerosLidos.length === 0) {
        alert("Nenhum número válido encontrado. Verifique sua entrada.");
        return;
    }
    
    
    const maiorNumero = Math.max(...numerosLidos); 
    const menorNumero = Math.min(...numerosLidos);

    
    const somaNumeros = numerosLidos.reduce((acumulador, numeroAtual) => acumulador + numeroAtual, 0);
    const mediaNumeros = somaNumeros / numerosLidos.length;

    
    maiorNumeroSpana.textContent = maiorNumero;
    menorNumeroSpana.textContent = menorNumero;
    
    mediaNumerosSpana.textContent = mediaNumeros.toFixed(2); 
}