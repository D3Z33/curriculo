// Script para adicionar a classe 'active' ao link do menu correspondente à página atual
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll('.sidebar ul li a');
  
  // Remover a classe 'active' de todos os links
  menuItems.forEach(function(item) {
      item.classList.remove('active');
  });

  // Adiciona a classe 'active' ao link da página atual
  menuItems.forEach(function(item) {
      const href = item.getAttribute('href');
      if (href === currentPage || (href === 'index.html' && currentPage === '')) {
          item.classList.add('active');
      }
  });
});

// Função para exibir texto gradualmente (efeito de escrita)
function typeWriter(element, speed, callback) {
const textArray = element.getAttribute('data-text').split(''); // Pega o texto original
element.innerHTML = ''; // Limpa o texto no início
let i = 0;
const interval = setInterval(() => {
  if (i < textArray.length) {
    element.innerHTML += textArray[i]; // Mostra cada letra gradualmente
    i++;
  } else {
    clearInterval(interval); // Para quando todas as letras forem exibidas
    if (callback) callback(); // Executa callback se existir
  }
}, speed);
}

// Função para fechar o texto gradualmente (efeito de fechamento)
function closeWriter(element, speed, callback) {
const textArray = element.innerHTML.split(''); // Divide o texto em letras
let i = textArray.length;
const interval = setInterval(() => {
  if (i > 0) {
    element.innerHTML = textArray.slice(0, i - 1).join(''); // Remove cada letra gradualmente
    i--;
  } else {
    clearInterval(interval); // Para quando todas as letras forem removidas
    if (callback) callback(); // Executa callback se necessário
  }
}, speed);
}

// Controla os efeitos de escrita ao carregar a página e ao clicar em links
document.addEventListener('DOMContentLoaded', function() {
const currentPage = window.location.pathname.split("/").pop();
const menuItems = document.querySelectorAll('.sidebar ul li a');

// Adiciona o efeito de escrita à seção ativa
menuItems.forEach(function(item) {
  const text = item.innerText; // Salva o texto original
  item.setAttribute('data-text', text); // Armazena o texto original no atributo data-text
  if (item.getAttribute('href') === currentPage) {
    // Se a página atual for igual ao link, aplica o efeito de escrita
    item.classList.add('active');
    typeWriter(item, 100); // Aplica o efeito de escrita na seção ativa
  } else {
    item.innerHTML = text; // Define o texto normalmente
  }
});

// Aplica o efeito de escrita na nova palavra clicada
menuItems.forEach(item => {
  item.addEventListener('click', function() {
    const activeItem = document.querySelector('.sidebar .active');
    if (activeItem && activeItem !== item) {
      // Fecha a palavra anterior
      closeWriter(activeItem, 100, () => {
        activeItem.classList.remove('active'); // Remove a classe ativa após fechar
      });
    }

    // Abre a nova palavra selecionada
    item.classList.add('active');
    typeWriter(item, 100); // Aplica o efeito de escrita na nova palavra
  });
});
});

// Exibe o site suavemente após a mensagem de boas-vindas
window.addEventListener('load', function() {
const welcomeMessage = document.getElementById('welcome-message');

setTimeout(function() {
  welcomeMessage.style.opacity = '0'; // Esconde a mensagem de boas-vindas
  document.body.classList.add('page-loaded'); // Mostra o site suavemente
}, 3000); // A mensagem de boas-vindas fica visível por 3 segundos
});

// Quando o usuário clica para mudar de seção
document.querySelectorAll('.sidebar ul li a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    
    // Exibe a mensagem de transição
    const transitionMessage = document.getElementById('transition-message');
    transitionMessage.style.display = 'flex'; // Mostra a mensagem
    transitionMessage.style.opacity = '1';
    
    // Esconde o conteúdo do site
    document.body.classList.remove('page-loaded');
    
    // Depois de um tempo, carrega a nova página
    setTimeout(function() {
      window.location.href = link.getAttribute('href'); // Navega para a nova página
    }, 2000); // Tempo da transição antes de mudar para a nova página (2s)
  });
});


