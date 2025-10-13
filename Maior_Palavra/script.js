function encontrarMaiorPalavra(frase) {
  // Remove pontuação e divide em palavras
  const palavras = frase.replace(/[.,!?;:]/g, "").split(" ");
  let maiorPalavra = palavras[0];

  for (let palavra of palavras) {
    if (palavra.length > maiorPalavra.length) {
      maiorPalavra = palavra;
    }
  }

  return maiorPalavra;
}

document.querySelector("#analisar").addEventListener("click", () => {
  const frase = document.querySelector("#frase").value.trim();
  const resultado = document.querySelector("#maior-palavra");

  if (!frase) {
    resultado.innerText = "Digite uma frase!";
    return;
  }

  const maior = encontrarMaiorPalavra(frase);
  resultado.innerText = maior;
});
