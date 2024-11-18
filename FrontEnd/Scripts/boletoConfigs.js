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

    // verificarData("vencimento");
    // verificarData("dataEmissao") ; 
    // verificarData("dataPagamento");
    adicionarBoleto();

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

function adicionarBoleto() {
    
    const boleto = {
        nf_boleto: document.getElementById("nfBoleto").value,
        // cod_boleto: document.getElementById("codBoleto").value,
        valor_boleto: document.getElementById("valor").value,
        // vencimento_boleto: document.getElementById("vencimento").value,
        // vencimento_boleto: document.getElementById("dataEmissao").value,
        vencimento_boleto: formatarData("vencimento"),
        data_emissao_boleto: formatarData("dataEmissao"),
        cnpj_emissor: document.getElementById("cnpjEmissor").value,
    };

    console.log(boleto); // Verifica os dados do boleto
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
        // fetchBoletoList(); 
    })
    .catch((error) => {
        alert("Erro ao adicionar boleto.");
        console.error("Error:", error);
    });
}

async function listarBoleto() {
    try {
        const response = await fetch("http://localhost:8080/api/usuarios");
        if (!response.ok) throw new Error("Erro ao buscar usuários");

        const usuarios = await response.json();

        usuarios.forEach(usuario => {
            console.log(`ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}`);
            // Aqui você pode inserir o código para exibir os dados na página
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}


