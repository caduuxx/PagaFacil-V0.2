document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o envio padrão do formulário

    const cliente = {
        cpf: document.getElementById("CPF").value,
        cnpj: document.getElementById("CNPJ").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value
    };

    // Enviar o formulário para o back-end
    fetch('http://localhost:8080/cliente/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        alert("Cliente cadastrado com sucesso!");
        console.log(data);
    })
    .catch((error) => {
        alert("Erro ao cadastrar cliente.");
        console.error("Error:", error);
    });
});


