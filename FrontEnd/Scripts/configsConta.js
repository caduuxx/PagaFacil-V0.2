document.getElementById('account-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/usuario/atualizar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Conta atualizada com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

var icone = document.getElementById("icone");
            icone =  localStorage.getItem('valueText');
            console.log(icone);