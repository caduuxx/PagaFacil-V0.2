
// isso aqui e pra listar o boletos

document.addEventListener("DOMContentLoaded", function () {
    fetchBoletos();
});

function fetchBoletos() {
    fetch('/api/boletos')
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById("tabela-boletos");
            tabela.innerHTML = ""; // Limpa a tabela antes de popular
            
            data.forEach(boleto => {
                const row = document.createElement("tr");
                
                row.innerHTML = `
                    <td><input type="checkbox" class="checkbox-boleto" value="${boleto.valor}"></td>
                    <td>${boleto.nfBoleto}</td>
                    <td>${boleto.valor}</td>
                    <td>${boleto.vencimento}</td>
                    <td>${boleto.emissor}</td>
                `;
                tabela.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar boletos:', error));
}

// Adicionar Boleto 

function adicionarBoleto() {
    const nfBoleto = document.getElementById('nfBoleto').value;
    const valor = document.getElementById('Valor').value;
    const vencimento = document.getElementById('Vencimento').value;
    const emissor = document.getElementById('Cnpj').value;
    const dtPagamento = document.getElementById('dtPagamento').value;

    const boleto = {
        nfBoleto: nfBoleto,
        valor: valor,
        vencimento: vencimento,
        emissor: emissor,
        dtPagamento: dtPagamento
    };

    fetch('/api/boletos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boleto)
    })
    .then(response => response.json())
    .then(data => {
        alert('Boleto adicionado com sucesso!');
        fetchBoletos(); // Atualiza a lista de boletos
    })
    .catch(error => {
        console.error('Erro ao adicionar boleto:', error);
    });
}