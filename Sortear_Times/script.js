// A função que obtém os elementos deve estar disponível.
// NOTA: É fundamental que esses IDs existam no seu HTML!
const inputJogador1 = document.getElementById('jogador1');
const inputJogador2 = document.getElementById('jogador2');
const formularioDuplas = document.getElementById('formularioDuplas');

// Elementos para exibição no HTML (IDs corrigidos/definidos)
const contadorDuplasSpan = document.getElementById('contadorDuplas'); // ID do elemento que mostrará a contagem
const listaDuplasUL = document.getElementById('listaDuplasCadastradas'); // ID do UL que mostrará a lista
const todasAsDuplas = []; // Array onde armazena o resultado

// --- Funções de Escopo e Eventos ---

// Função auxiliar para verificar se o nome já está em alguma dupla salva
function nomeJaCadastrado(nome) {
    return todasAsDuplas.some(dupla => 
        dupla[0].toLowerCase() === nome.toLowerCase() || 
        dupla[1].toLowerCase() === nome.toLowerCase()
    );
}

// Função que atualiza o contador e a lista no HTML
function atualizarExibicaoDuplas() {
    // 1. Atualizar o Contador (Se o elemento existir)
    if (contadorDuplasSpan) {
        const totalDuplas = todasAsDuplas.length;
        contadorDuplasSpan.textContent = totalDuplas;
    }

    // 2. Limpar e Atualizar a Lista (Se o elemento existir)
    if (listaDuplasUL) {
        listaDuplasUL.innerHTML = ''; // Limpa a lista anterior

        todasAsDuplas.forEach((dupla, index) => {
            const li = document.createElement('li');
            
            // Formata a dupla para exibição (ex: "Dupla 1: Ana e Carlos")
            li.textContent = `Dupla ${index + 1}: ${dupla.join(' e ')}`; 
            
            listaDuplasUL.appendChild(li);
        });
    }
}

// Função de salvamento (adaptada do exemplo anterior)
function salvarDupla(nome1, nome2) {
    const novaDupla = [nome1, nome2];
    todasAsDuplas.push(novaDupla);
    console.log('Dupla salva com sucesso:', novaDupla);
    console.log('Todas as duplas:', todasAsDuplas);
    
    // CHAMADA CHAVE: Atualiza o HTML após salvar
    atualizarExibicaoDuplas();

    // Limpa os inputs após o sucesso
    inputJogador1.value = '';
    inputJogador2.value = '';
    
    // Volta o segundo campo para o estado desabilitado
    inputJogador2.setAttribute('disabled', true);
}


// --- Lógica Principal de Validação e Envio ---

formularioDuplas.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nome1 = inputJogador1.value.trim();
    const nome2 = inputJogador2.value.trim();

    // 1. Verificação de Preenchimento
    if (nome1 === '' || nome2 === '') {
        alert('Ambos os nomes devem ser preenchidos para formar uma dupla.');
        return; 
    }

    // 2. Verificação de Nomes Duplicados na Dupla
    if (nome1.toLowerCase() === nome2.toLowerCase()) {
        alert('Os nomes dos dois jogadores não podem ser iguais. Por favor, corrija.');
        return;
    }
    
    // 3. Verificação de Integridade em Relação aos Nomes JÁ CADASTRADOS
    if (nomeJaCadastrado(nome1) || nomeJaCadastrado(nome2)) {
         alert('Um ou mais jogadores já foram cadastrados em outra dupla!');
         return;
    }

    // Se todas as validações passarem, salva a dupla
    salvarDupla(nome1, nome2);
});

// --- Lógica para Habilitar/Desabilitar o Input 2 ---
// Adicionado para garantir que o input 2 só ative após preenchimento do input 1

if (inputJogador1 && inputJogador2) {
    inputJogador1.addEventListener('input', function() {
        if (inputJogador1.value.trim() !== '') {
            inputJogador2.removeAttribute('disabled');
        } else {
            inputJogador2.setAttribute('disabled', true);
            inputJogador2.value = ''; // Limpa se desabilitar
        }
    });
}

// Inicializa a exibição ao carregar a página (mostrará 0)
atualizarExibicaoDuplas();
sortearDuplas();

function sortearDuplas(){
    if (todasAsDuplas.length === 0) {
  console.log("O array está vazio");
} else if (todasAsDuplas.length % 2 === 0) {
  console.log("O array tem quantidade PAR de elementos");
} else {
  console.log("O array tem quantidade ÍMPAR de elementos");
}
}

