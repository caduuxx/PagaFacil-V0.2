function login(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

    const username = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;

    // Fazer a requisição para o back-end
    fetch('http://localhost:8080/autentificacao/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'username': username,
            'senha': senha
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha no login');
        }
        return response.text();
    })
    .then(data => {
        alert('Login realizado com sucesso!');
        // Redirecionar para outra página após o login, se necessário
        localStorage.setItem('valueText', cliente.cnpj);
        window.location.assign("app/home.html")
    })
    .catch(error => {
        alert('Erro no login: ' + error.message);
    });
}
