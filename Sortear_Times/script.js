const inputJogador1 = document.getElementById('jogador1');
const inputJogador2 = document.getElementById('jogador2');
const formularioDuplas = document.getElementById('formularioDuplas');

// Elementos para exibição no HTML
const contadorDuplasSpan = document.getElementById('contadorDuplas'); 
const listaDuplasUL = document.getElementById('listaDuplasCadastradas'); 
const botaoSortear = document.getElementById('sortearBotao'); 
const resultadoDuplasDiv = document.getElementById('resultadoDuplas'); 


const todasAsDuplas = []; 
const chaveamento = []; 


function nomeJaCadastrado(nome) {
    return todasAsDuplas.some(dupla => 
        dupla[0].toLowerCase() === nome.toLowerCase() || 
        dupla[1].toLowerCase() === nome.toLowerCase()
    );
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// --- Funções de Exibição (Renderização) ---

// Função que atualiza o contador e a lista no HTML
function atualizarExibicaoDuplas() {
    // 1. Atualizar o Contador
    if (contadorDuplasSpan) {
        contadorDuplasSpan.textContent = todasAsDuplas.length;
    }

    // 2. Limpar e Atualizar a Lista
    if (listaDuplasUL) {
        listaDuplasUL.innerHTML = ''; // Limpa a lista anterior

        todasAsDuplas.forEach((dupla, index) => {
            const li = document.createElement('li');
            li.textContent = `Dupla ${index + 1}: ${dupla.join(' e ')}`; 
            listaDuplasUL.appendChild(li);
        });
    }
}

// Função que exibe o resultado do chaveamento no elemento HTML
function exibirChaveamento() {
    if (resultadoDuplasDiv) {
        if (chaveamento.length === 0) {
            resultadoDuplasDiv.innerHTML = '<p>Nenhum sorteio realizado.</p>';
        } else {
            // Formata a lista de confrontos com quebras de linha
            resultadoDuplasDiv.innerHTML = `<h3>Chaveamento Gerado</h3>${chaveamento.join("<br>")}`;
        }
    }
}

// --- Funções de Ação ---

// Função de salvamento
function salvarDupla(nome1, nome2) {
    const novaDupla = [nome1, nome2];
    todasAsDuplas.push(novaDupla);
    
    // Atualiza o HTML após salvar
    atualizarExibicaoDuplas();

    // Limpa os inputs após o sucesso
    inputJogador1.value = '';
    inputJogador2.value = '';
    
    // Volta o segundo campo para o estado desabilitado
    inputJogador2.setAttribute('disabled', true);
    
    // Limpa o resultado do sorteio anterior
    chaveamento.length = 0;
    exibirChaveamento();
}

// Função de sorteio
function sortearDuplas(){
    // Limpa o chaveamento anterior
    chaveamento.length = 0; 
    
    if (todasAsDuplas.length === 0) {
        showALert('Nenhuma dupla cadastrada');
        return;
    } 
    
    // Verifica se o número de duplas é par
    if (todasAsDuplas.length % 2 !== 0) {
        showALert("Atenção: A quantidade de duplas é ímpar! Para um chaveamento completo (todos jogam), é preciso um número par de duplas.");
        return;
    }
    
    const duplasSorteadas = [...todasAsDuplas];
    embaralharArray(duplasSorteadas);

    const totalDuplas = duplasSorteadas.length;
    for (let i = 0; i < totalDuplas; i += 2){
        const dupla1 = duplasSorteadas[i];
        const dupla2 = duplasSorteadas[i + 1];

        chaveamento.push(`<div class="confronto-item">
                     <span class="dupla">${dupla1.join(" e ")}</span> 
                     <span class="vs">VS</span> 
                     <span class="dupla">${dupla2.join(" e ")}</span>
                  </div>`);
    }

    exibirChaveamento(); 
}

formularioDuplas.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nome1 = inputJogador1.value.trim();
    const nome2 = inputJogador2.value.trim();

    if (nome1 === '' || nome2 === '') {
        showALert('Ambos os nomes devem ser preenchidos para formar uma dupla.');
        return; 
    }
    if (nome1.toLowerCase() === nome2.toLowerCase()) {
        showALert('Os nomes dos dois jogadores não podem ser iguais. Por favor, corrija.');
        return;
    }
    if (nomeJaCadastrado(nome1) || nomeJaCadastrado(nome2)) {
        showALert('Um ou mais jogadores já foram cadastrados em outra dupla!');
        return;
    }

    salvarDupla(nome1, nome2);
});

if (inputJogador1 && inputJogador2) {
    inputJogador1.addEventListener('input', function() {
        if (inputJogador1.value.trim() !== '') {
            inputJogador2.removeAttribute('disabled');
        } else {
            inputJogador2.setAttribute('disabled', true);
            inputJogador2.value = ''; 
        }
    });
}


if (botaoSortear) {
    botaoSortear.addEventListener("click", sortearDuplas);
}


atualizarExibicaoDuplas();
exibirChaveamento();

function showALert(msg = '') {
  document.querySelector('#alert').innerHTML = msg;
}