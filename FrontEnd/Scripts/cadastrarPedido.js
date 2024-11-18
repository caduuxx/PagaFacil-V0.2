//CADASTRAR

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

function onClick(){
    adicionarPedido();
}

function verificarData(idElemento){
    var dataElemento = document.getElementById(idElemento + "Linha").value;
    var date = dataElemento.split('');

    if (date.length >10){
        document.getElementById(idElemento + "Linha").value = "Data inválida";
        return 1;
    }
    else{
        document.getElementById(idElemento + "Linha").value = "";
        return 0;
    }
}

function adicionarPedido() {
    
    const pedido = {
        nf_pedido: document.getElementById("nfPedido").value,
        valor_total: document.getElementById("valorTotal").value,
        nome_social_emissor: document.getElementById("nomeSocialEmissor").value,
        cnpj_emissor: document.getElementById("cnpjEmissor").value,
        data_pedido: formatarData("dataPedido")
    };

    console.log(pedido); 
    fetch('http://localhost:8080/pedido/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
        alert("Boleto adicionado com sucesso!");
        console.log(data);
        // fetchBoletoList(); 
    })
    .catch((error) => {
        // alert("Erro ao adicionar boleto.");
        console.error("Error:", error);
    });
}