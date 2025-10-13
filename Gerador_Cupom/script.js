function gerarCupom() {
  const tamanho = Number(document.getElementById("tamanho").value);
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let cupom = "";

  if (tamanho < 4 || tamanho > 20 || isNaN(tamanho)) {
    alert("Por favor, insira um tamanho entre 4 e 20.");
    return;
  }

  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    cupom += caracteres[randomIndex];
  }

  document.getElementById("cupom").textContent = cupom;
}
