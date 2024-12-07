// //CADASTRAR


function formatarData(dataFormatada) {
    var vencimentoFormatado;
    var data_formatada = document.getElementById(dataFormatada).value;
    var data_formatada_array = data_formatada.split('');

    var ano = data_formatada_array[data_formatada_array.length - 4] +
              data_formatada_array[data_formatada_array.length - 3] +
              data_formatada_array[data_formatada_array.length - 2] +
              data_formatada_array[data_formatada_array.length - 1];

    var mes = data_formatada_array[data_formatada_array.length - 7] +
              data_formatada_array[data_formatada_array.length - 6];

    var dia;
    // verifica se ninguém botou uma data tipo 8/11/2001
    if (data_formatada_array[1] === "/") {
        dia = 0 + data_formatada_array[0];
    } else {
        dia = data_formatada_array[0] + data_formatada_array[1];
    }

    vencimentoFormatado = ano + "-" + mes + "-" + dia;

    return vencimentoFormatado;
}
// Adicionar boleto
document.getElementById("adicionarBoletoForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const boleto = {
        nfboleto: document.getElementById("nfBoleto").value,
        // cod_boleto: document.getElementById("codBoleto").value,
        valor_boleto: document.getElementById("valor").value,
        // vencimento_boleto: document.getElementById("vencimento").value,
        // vencimento_boleto: document.getElementById("dataEmissao").value,
        vencimento_boleto: formatarData("vencimento"),
        data_emissao_boleto: formatarData("dataEmissao"),
        cnpj_emissor: document.getElementById("cnpjEmissor").value,
        cnpj_cliente: icone
    };
    console.log(boleto);
    fetch("http://localhost:8080/boleto/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(boleto)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar boleto.");
            }
            return response.json();
        })
        .then(() => {
            alert("Boleto adicionado com sucesso!");
            listarBoletos();
        })
        .catch((error) => alert(error.message));
});

// Listar boletos
async function listarBoletos() {
    try {
        const response = await fetch("http://localhost:8080/boleto/listar");
        if (!response.ok) {
            throw new Error("Erro ao listar boletos.");
        }
        const boletos = await response.json();
        atualizarTabela(boletos);
    } catch (error) {
        alert(error.message);
    }
}


// Atualizar tabela
function atualizarTabela(boletos) {
    const tabelaBoletos = document.getElementById("tabela-boletos");
    tabelaBoletos.innerHTML = "";

    const boletosFiltrados = boletos.filter((boleto) => boleto.cnpj_cliente == icone);


    boletosFiltrados.forEach((boleto) => {
        const row = `
            <tr>
                <td><input type="checkbox" class="checkbox-boleto" data-valor="${boleto.id}" /></td>
                <td id="nf_${boleto.id}">${boleto.nfboleto}</td>
                <td id="valor_${boleto.id}">${boleto.valor_boleto.toFixed(2)}</td>
                <td id="vencimento_${boleto.id}">${boleto.vencimento_boleto}</td>
                <td id="cnpj_${boleto.id}">${boleto.cnpj_emissor}</td>
            </tr>
        `;
        const id_boleto = boleto.id;
        const dadosAtualizados = {
            "nfboleto": boleto.nfboleto,
            "valor_boleto": boleto.valor_boleto,
            "vencimento_boleto": boleto.vencimento_boleto,
            "data_emissao_boleto": boleto.data_emissao_boleto,
            "cnpj_emissor": boleto.cnpj_emissor,
            "data_pagamento": null,
            "cnpj_cliente":boleto.cnpj_cliente,
            "pago":1
        };
        tabelaBoletos.insertAdjacentHTML("beforeend", row);
    });
}


// Somar boletos selecionados
document.getElementById("botao-somar").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox-boleto:checked");
    let soma = 0;

    checkboxes.forEach(checkbox => {
        soma += parseFloat(checkbox.getAttribute("data-valor"));
    });

    document.getElementById("resultado-soma").textContent = `Total: R$ ${soma.toFixed(2)}`;
});


document.getElementById("botao-pagar").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox-boleto:checked");
    let pagamento = 0;
    let dataAtual = new Date();

    checkboxes.forEach((checkbox) => {

        pagamento += parseFloat(checkbox.getAttribute("data-valor"));
        
        
    });
console.log(pagamento);
console.log("valor_" + pagamento);
console.log(document.getElementById("valor_" + pagamento).textContent);

        const pagamentos = {
            valor_pagamento: document.getElementById("valor_" + pagamento).textContent,
            forma_de_pagamento: "PIX",
            data_pagamento: dataAtual,
            valor: document.getElementById("valor_" + pagamento).textContent,
            cod_boleto: pagamento,
            cod_cliente: 0,
        };
    
        fetch("http://localhost:8080/pagamento/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pagamentos)
        })
        
        atualizarDados(id_boleto, dadosAtualizados);
        console.log(pagamentos);
    
});

async function atualizarDados(id, dadosAtualizados) {
    try {
        const resposta = await fetch(`http://localhost:8080/boleto/atualizar/${id_boleto}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!resposta.ok) {
            throw new Error(`Erro na atualização: ${resposta.status}`);
        }

        const resultado = await resposta.json();
        console.log("Recurso atualizado com sucesso:", resultado);
    } catch (erro) {
        console.error("Erro na requisição PUT:", erro);
    }
}





var icone = document.getElementById("icone");
            icone =  localStorage.getItem('valueText');
            console.log(icone);

// Carregar boletos ao inicializar a página
document.addEventListener("DOMContentLoaded", listarBoletos);