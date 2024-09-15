// Função para listar os boletos
document.addEventListener("DOMContentLoaded", function () {
    fetchBoletos();
});

function fetchBoletos() {
    fetch('http://localhost:8080/boleto/listar') // Ajustar a URL para o endpoint correto
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById("tabela-boletos");
            tabela.innerHTML = ""; // Limpa a tabela antes de popular
            
            data.forEach(boleto => {
                const row = document.createElement("tr");
                
                row.innerHTML = `
                    <td><input type="checkbox" class="checkbox-boleto" value="${boleto.id}"></td>
                    <td>${boleto.nfboleto}</td>
                    <td>${boleto.valor_boleto}</td>
                    <td>${boleto.vencimento_boleto}</td>
                    <td>${boleto.cnpj_emissor}</td>
                `;
                tabela.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar boletos:', error));
}

// Função para adicionar boleto
function adicionarBoleto() {
    const nfBoleto = document.getElementById('nfBoleto').value;
    const valor = document.getElementById('Valor').value;
    const vencimento = document.getElementById('Vencimento').value;
    const emissor = document.getElementById('Cnpj').value;
    const dtPagamento = document.getElementById('dtPagamento').value;

    const boleto = {
        nfboleto: nfBoleto,
        valor_boleto: valor,
        vencimento_boleto: vencimento,
        data_emissao_boleto: new Date().toISOString(), // Ajuste conforme o formato esperado
        cnpj_emissor: emissor,
        data_pagamento: dtPagamento
    };

    fetch('http://localhost:8080/boleto/cadastrar', {
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

// Função para somar boletos selecionados
function somarBoletos() {
    const checkboxes = document.querySelectorAll('.checkbox-boleto:checked');
    const ids = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (ids.length < 2) {
        alert('Selecione pelo menos dois boletos para somar.');
        return;
    }

    fetch('http://localhost:8080/boleto/somar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado-soma').innerText = `Total: ${data.valor_boleto}`;
    })
    .catch(error => {
        console.error('Erro ao somar boletos:', error);
    });
}
