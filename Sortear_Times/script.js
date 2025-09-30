// A função que obtém os elementos deve estar disponível.
const inputJogador1 = document.getElementById('jogador1');
const inputJogador2 = document.getElementById('jogador2');
const formularioDuplas = document.getElementById('formularioDuplas');
const resultadoDuplas = document.getElementById('resultadoDuplas');
const todasAsDuplas = []; // Array onde armazena o resultado

formularioDuplas.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o recarregamento da página

    const nome1 = inputJogador1.value.trim();
    const nome2 = inputJogador2.value.trim();

    // 1. Verificação de Preenchimento
    if (nome1 === '' || nome2 === '') {
        alert('Ambos os nomes devem ser preenchidos para formar uma dupla.');
        return; // Para a execução da função
    }

    // 2. Verificação de Nomes Duplicados na Dupla (Regra Comum)
    if (nome1.toLowerCase() === nome2.toLowerCase()) {
        alert('Os nomes dos dois jogadores não podem ser iguais. Por favor, corrija.');
        return; // Para a execução da função
    }
    
    // 3. Verificação de Integridade em Relação aos Nomes JÁ CADASTRADOS
    // Se você estiver salvando todos os nomes em uma lista única (para o sorteio final)
    // você pode querer garantir que um nome não seja usado em duas duplas diferentes.
    if (nomeJaCadastrado(nome1) || nomeJaCadastrado(nome2)) {
         alert('Um ou mais jogadores já foram cadastrados em outra dupla!');
         return;
    }


    // SE PASSOU POR TODAS AS VERIFICAÇÕES, a integridade está OK!
    
    // Salva a dupla e limpa os campos
    salvarDupla(nome1, nome2);
});


// Função auxiliar para verificar se o nome já está em alguma dupla salva (Exemplo)
function nomeJaCadastrado(nome) {
    // Percorre o array de duplas, verificando se o nome existe em alguma delas
    // O 'some' verifica se pelo menos uma dupla contém o nome
    return todasAsDuplas.some(dupla => 
        dupla[0].toLowerCase() === nome.toLowerCase() || 
        dupla[1].toLowerCase() === nome.toLowerCase()
    );
}

// Função de salvamento (adaptada do exemplo anterior)
function salvarDupla(nome1, nome2) {
    const novaDupla = [nome1, nome2];
    todasAsDuplas.push(novaDupla);
    console.log('Dupla salva com sucesso:', novaDupla);
    console.log('Todas as duplas:', todasAsDuplas);
    
    // Limpa os inputs após o sucesso
    inputJogador1.value = '';
    inputJogador2.value = '';
    
}

function mostraDuplas(){
    return resultadoDuplas;

    const listaDuplasSalvas = mostraDuplas();
}

