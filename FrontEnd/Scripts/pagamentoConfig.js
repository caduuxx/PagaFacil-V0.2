async function fetchPayments() {
    try {
        const response = await fetch('http://localhost:8080/pagamento/listar');
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const payments = await response.json();

        const paymentTable = document.querySelector('#payment-list tbody');
        paymentTable.innerHTML = ''; // Limpa a tabela

        payments.forEach(payment => {
            const valor = payment.valor ? payment.valor.toFixed(2) : '0.00';
            const status = payment.status ? 'Pago' : 'Pendente';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${valor} R$</td>
                <td>${status}</td>
            `;
            paymentTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar os pagamentos:', error);
    }
}

// Carregar os pagamentos ao carregar a página
document.addEventListener('DOMContentLoaded', fetchPayments);
