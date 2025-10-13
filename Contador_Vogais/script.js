function contarLetras() {
  const palavra = document.getElementById("palavra").value.toLowerCase();
  const vogaisLista = ["a", "e", "i", "o", "u"];
  let vogais = 0;
  let consoantes = 0;

  for (let letra of palavra) {
    if (/[a-záéíóúàèìòùãõâêîôûç]/.test(letra)) {
      if (vogaisLista.includes(letra)) {
        vogais++;
      } else {
        consoantes++;
      }
    }
  }

  document.getElementById("vogais").textContent = vogais;
  document.getElementById("consoantes").textContent = consoantes;
}
