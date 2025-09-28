// Expressões regulares para checar cada requisito individualmente
const regexLength = /.{6,}/;
const regexLower = /[a-z]/;
const regexUpper = /[A-Z]/;
const regexSpecial = /[^a-zA-Z0-9]/;

function validateEmail(email) {
  // \S+@\S+\.\S+ é uma regex simples que requer caracteres não-espaço antes e depois do @, e um ponto.
  return /\S+@\S+\.\S+/.test(email);
}

function checkPasswordRequirements(password) {
  // Verifica cada requisito
  const lengthValid = regexLength.test(password);
  const lowerValid = regexLower.test(password);
  const upperValid = regexUpper.test(password);
  const specialValid = regexSpecial.test(password);

  // Retorna um objeto com o status de cada requisito
  return {
    length: lengthValid,
    lower: lowerValid,
    upper: upperValid,
    special: specialValid,
    isValid: lengthValid && lowerValid && upperValid && specialValid
  };
}

function isPasswordValid() {
    // Retorna true somente se todos os requisitos forem válidos
    return checkPasswordRequirements(document.getElementById('senha').value).isValid;
}

function logar() {
  const email = document.getElementById('login').value;
  const password = document.getElementById('senha').value;
  const msgErroEmail = document.getElementById('msgErroEmail');
  const msgErroSenha = document.getElementById('msgErroSenha');
  const loginButton = document.getElementById('login-button');

  const emailValid = validateEmail(email);
  const passwordStatus = checkPasswordRequirements(password);

  // --- 1. Validação do E-MAIL ---
  if (email && !emailValid) {
    msgErroEmail.style.display = 'block'; 
  } else {
    msgErroEmail.style.display = 'none';
  }

  // --- 2. Validação da SENHA e feedback detalhado ---
  if (password.length > 0 && !passwordStatus.isValid) {
    // Se a senha não é válida E o campo não está vazio, mostre os erros detalhados.
    msgErroSenha.style.display = 'block'; 
    updatePasswordErrors(passwordStatus);
  } else if (passwordStatus.isValid) {
    // Se a senha é totalmente válida, esconda a mensagem de erro.
    msgErroSenha.style.display = 'none';
  } else if (password.length === 0) {
    // Se o campo de senha está vazio, esconda a mensagem de erro por padrão.
    msgErroSenha.style.display = 'none';
  }



  // O botão é habilitado APENAS se o e-mail for válido E a senha for totalmente válida
  loginButton.disabled = !(emailValid && passwordStatus.isValid);
}

function updatePasswordErrors(status) {
    const iconTrue = '✅';
    const iconFalse = '❌';

    // Lista de requisitos no HTML e seu status
    const requirements = [
        { id: 'req-length', check: status.length, message: 'Ter no mínimo 6 caracteres.' },
        { id: 'req-lower', check: status.lower, message: 'Ter pelo menos 1 letra minúscula (\'a\'-\'z\').' },
        { id: 'req-upper', check: status.upper, message: 'Ter pelo menos 1 letra maiúscula (\'A\'-\'Z\').' },
        { id: 'req-special', check: status.special, message: 'Ter pelo menos 1 caractere não alfanumérico.' }
    ];

    requirements.forEach(req => {
        const element = document.getElementById(req.id);
        if (element) {
            element.innerHTML = `${req.check ? iconTrue : iconFalse} ${req.message}`;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
  // garante que as mensagens de erro estão inicialmente ocultas
  const msgErroEmail = document.getElementById('msgErroEmail');
  const msgErroSenha = document.getElementById('msgErroSenha');
  if (msgErroEmail) msgErroEmail.style.display = 'none';
  if (msgErroSenha) msgErroSenha.style.display = 'none';

  // Configura os listeners de evento
  document.getElementById('login').addEventListener('input', logar);
  document.getElementById('senha').addEventListener('input', logar);
  
  // Define o estado inicial do botão e validações
  logar(); 
});