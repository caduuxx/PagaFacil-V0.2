// Listar boletos
async function listarBoletos() {
    try {
        const response = await fetch("http://localhost:8080/boleto/listar");
        if (!response.ok) {
            throw new Error("Erro ao listar boletos.");
        }
        const boletos = await response.json();
        atualizarTabela(boletos);
        totalBoleto =  localStorage.getItem('valorBoletos');
        document.getElementById("totalAPagar").innerText = "R$ "+totalBoleto;
    } catch (error) {
        alert(error.message);
    }
}


// Atualizar tabela
function atualizarTabela(boletos) {
    const tabelaBoletos = document.getElementById("mini-tabela-boletos");
    tabelaBoletos.innerHTML = "";

    const boletosFiltrados = boletos.filter((boleto) => boleto.cnpj_cliente == icone && boleto.pago == 0);
    var totalBoleto = 0;

    boletosFiltrados.forEach((boleto) => {
        const row = `
            <tr>
                <td id="nf_${boleto.id}">${boleto.nfboleto}</td>
                <td id="valor_${boleto.id}">${boleto.valor_boleto.toFixed(2)}</td>
                <td id="vencimento_${boleto.id}">${boleto.vencimento_boleto}</td>
            </tr>
        `;
        totalBoleto = totalBoleto + boleto.valor_boleto;
        tabelaBoletos.insertAdjacentHTML("beforeend", row);
        console.log(totalBoleto);
        localStorage.setItem('valorBoletos', totalBoleto);
    });
    
}

var icone = document.getElementById("icone");
            icone =  localStorage.getItem('valueText');
            console.log(icone);
            
document.addEventListener("DOMContentLoaded", listarBoletos);