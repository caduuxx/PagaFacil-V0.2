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
        valor_boleto: document.getElementById("valor").value,
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
    var estilo;

    const boletosFiltrados = boletos.filter((boleto) => boleto.cnpj_cliente == icone );


    boletosFiltrados.forEach((boleto) => {
        if (boleto.pago){
            estilo = "color: green;"
        }
        else{
            estilo = "color: red;"
        }
        const row = `
            <tr style="${estilo}">
                <td><input type="checkbox" class="checkbox-boleto" data-valor="${boleto.id}" /></td>
                <td id="nf_${boleto.id}">${boleto.nfboleto}</td>
                <td id="valor_${boleto.id}">${boleto.valor_boleto.toFixed(2)}</td>
                <td id="vencimento_${boleto.id}">${boleto.vencimento_boleto}</td>
                <td id="cnpj_${boleto.id}">${boleto.cnpj_emissor}</td>
            </tr>
        `;
        
        
        
        
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
            cod_cliente: icone,
        };
        localStorage.setItem(
            'dadosBoleto',
            JSON.stringify({
              'nfboleto': document.getElementById("nf_"+pagamento).textContent,
              'valor_boleto': document.getElementById("valor_"+pagamento).textContent,
              'vencimento_boleto': document.getElementById("vencimento_"+pagamento).textContent,
              'data_emissao_boleto': "2005-02-12",
              'cnpj_emissor': document.getElementById("cnpj_"+pagamento).textContent,
              'data_pagamento': null,
              'cnpj_cliente': icone,
              'pago': 1
            })
          );
        fetch("http://localhost:8080/pagamento/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pagamentos)
        })
        dadosAtualizados = localStorage.getItem('dadosBoleto');
        boletoboleto =  pagamento;
        atualizarDados(boletoboleto, dadosAtualizados);
        const id_boleto = pagamentos.cod_boleto;
        localStorage.setItem('idBoleto', id_boleto );
        console.log(pagamentos);
        console.log(dadosAtualizados);
        console.log(boletoboleto);
    
});

async function atualizarDados(boletoboleto, dadosAtualizados) {
    try {   
        
        const resposta = await fetch(`http://localhost:8080/boleto/atualizar/${boletoboleto}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: dadosAtualizados,
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