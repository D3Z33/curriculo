// Script para adicionar a classe 'active' ao link do menu correspondente à página atual
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll('.sidebar ul li a');
  
  // Remover a classe 'active' de todos os links
  menuItems.forEach(function (item) {
    item.classList.remove('active');
  });

  // Adiciona a classe 'active' ao link da página atual
  menuItems.forEach(function (item) {
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
      if (callback) callback(); // Executa callback
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
      if (callback) callback(); // Executa callback
    }
  }, speed);
}

// Função para redefinir os eventos de clique da sidebar
function resetSidebarEvents() {
  const menuItems = document.querySelectorAll('.sidebar ul li a');

  // Aplica o efeito de escrita na nova palavra clicada
  menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault(); // Impede o comportamento padrão do link
      const activeItem = document.querySelector('.sidebar .active');
      
      if (activeItem && activeItem !== item) {
        // Fecha a palavra anterior
        closeWriter(activeItem, 150, () => { // Aumenta o tempo do efeito de fechamento
          activeItem.classList.remove('active'); // Remove a classe ativa após fechar
        });
      }

      // Abre a nova palavra selecionada
      item.classList.add('active');
      typeWriter(item, 200); // Aplica o efeito de escrita na nova palavra

      // Aplica o efeito de transição para a nova página
      setTimeout(() => {
        window.location.href = item.getAttribute('href'); // Navega para a nova página
      }, 800); // Aumenta o tempo para garantir a transição
    });
  });
}

// Exibe o site suavemente após a mensagem de boas-vindas
window.addEventListener('load', function () {
  const welcomeMessage = document.getElementById('welcome-message');

  setTimeout(function () {
    welcomeMessage.style.opacity = '0'; // Esconde a mensagem de boas-vindas
    document.body.classList.add('page-loaded'); // Mostra o site suavemente
    resetSidebarEvents(); // Reseta os eventos de clique após a página carregar
  }, 4000); // Aumentado para 4 segundos para garantir a transição completa
});

// Quando o usuário clica para mudar de seção
document.querySelectorAll('.sidebar ul li a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    
    const transitionMessage = document.getElementById('transition-message');
    transitionMessage.style.display = 'flex';
    transitionMessage.style.opacity = '1';
    
    document.body.classList.remove('page-loaded');

    const currentPage = document.querySelector('.page-container');
    currentPage.style.transform = 'translateX(100%)';
    currentPage.style.opacity = '0';

    setTimeout(function () {
      window.location.href = link.getAttribute('href');
    }, 1500); // Aumenta o tempo para garantir que a transição seja visível
  });
});

// Chamada inicial para resetar os eventos de clique
resetSidebarEvents();

// Função para iniciar as transições entre páginas
function transitionToPage(href) {
  const transitionMessage = document.getElementById('transition-message');
  const pageContainer = document.querySelector('.page-container');

  // Exibe a mensagem de transição
  transitionMessage.style.display = 'flex';
  transitionMessage.style.opacity = '1';

  // Esconde a página atual
  pageContainer.style.transform = 'translateX(100%)';
  pageContainer.style.opacity = '0';

  // Aguarda a transição antes de carregar a nova página
  setTimeout(() => {
    window.location.href = href;
  }, 1500); // Tempo aumentado para garantir transição completa
}

// Script para iniciar as transições ao carregar a página
window.addEventListener('load', function () {
  const welcomeMessage = document.getElementById('welcome-message');
  const pageContainer = document.querySelector('.page-container');

  // Apresenta a mensagem de boas-vindas
  setTimeout(() => {
    welcomeMessage.style.opacity = '0'; // Some com a mensagem de boas-vindas
  }, 3000); // Mantém a mensagem visível por 3 segundos

  // Após a mensagem de boas-vindas desaparecer, exibe a página
  setTimeout(() => {
    document.body.classList.add('page-loaded'); // Exibe o site suavemente
  }, 4000); // Atraso para a transição da página ser visível
});

// Gerencia os cliques nos links da sidebar para trocar de sessão
document.querySelectorAll('.sidebar ul li a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    const href = link.getAttribute('href');
    transitionToPage(href); // Inicia a transição para a nova página
  });
});

