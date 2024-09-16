//CADASTRAR

function adicionarBoleto() {
    const boleto = {
        nfBoleto: document.getElementById("nfBoleto").value,
        valor: document.getElementById("valor").value,
        vencimento: document.getElementById("vencimento").value,
        dataEmissao: document.getElementById("dataEmissao").value,
        cnpjEmissor: document.getElementById("cnpjEmissor").value,
        dataPagamento: document.getElementById("dataPagamento").value
    };

    console.log(boleto); // Adicione isto para verificar os dados

    fetch('http://localhost:8080/boleto/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boleto)
    })
    .then(response => response.json())
    .then(data => {
        alert("Boleto adicionado com sucesso!");
        console.log(data);
        fetchBoletoList(); // Atualize a lista de boletos após adicionar
    })
    .catch((error) => {
        alert("Erro ao adicionar boleto.");
        console.error("Error:", error);
    });
}