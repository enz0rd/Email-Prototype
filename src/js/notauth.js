function delayRedirect() {
    setTimeout(function() {
      window.location.href = '/signin';
    }, 3000); // 5000 milissegundos = 5 segundos
  }
  
  // Chame a função para iniciar o atraso de redirecionamento
  delayRedirect();
  