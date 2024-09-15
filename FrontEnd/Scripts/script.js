// const formulario = document.querySelector("form");
// const icpf = document.querySelector("#CPF");
// const icnpj = document.querySelector("#CNPJ");
// const inomeSocial = document.querySelector("#nomeSocial");
// const iemail = document.querySelector("#email");
// const isenha = document.querySelector("#senha");
// const isenhaRepetida = document.querySelector("#senhaRepetida");
// const itelefone = document.querySelector("#telefone");
// const iendereco = document.querySelector("#endereco");

// function compararSenhas(){
//     if (isenha.value === isenhaRepetida.value){
//         cadastrar();
//         limpar();
//     } else {
//         console.log("As senhas devem coincidir");
//     }
// }

// function cadastrar(){
//     fetch("http://localhost:8080/Clientes",
//         {
//             headers:{
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: "POST",
//             body: JSON.stringify({
//             id: Math.floor(Date.now() * Math.random()).toString(36),
        // cpf: cpf,
        // cnpj: cnpj,
        // email: email,
        // senha: senha,
        // telefone: telefone,
        // endereco: endereco,
//             })
//         }
//     )
//     .then(function (res){console.log(res)})
//     .catch(function (res){console.log(res)})
// }

// function limpar(){
//     icnpj.value = "";
//     iemail.value = "";
//     isenha.value = "";
//     isenhaRepetida.value = "";
// }

// formulario.addEventListener('submit', function (event) {
//     event.preventDefault();
//     cadastrar();
//     limpar();
// });



  
  function cadastrar() {
    console.log("Algo aconteceu");
    const icpf = document.querySelector("#CPF");
    const icnpj = document.querySelector("#CNPJ");
    const inomeSocial = document.querySelector("#nomeSocial");
    const iemail = document.querySelector("#email");
    const isenha = document.querySelector("#senha");
    const isenhaRepetida = document.querySelector("#senhaRepetida");
    const itelefone = document.querySelector("#telefone");
    const iendereco = document.querySelector("#endereco");
  
    console.log(isenha.value);
    console.log(senhaRepetida);
  
    const clienteData = {
        id: 11,
        cpf: icpf.value,
        cnpj: icnpj.value,
        nome_social: inomeSocial.value,
        email: iemail.value,
        senha: isenha.value,
        telefone: itelefone.value,
        endereco: iendereco.value
    };
  
    if(isenha.value != isenhaRepetida.value) {
      throw new Error('Senhas não estão iguais.')
    }
  
    fetch('/api/auth/cadastrar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(clienteData)
    })
    .then(response => {
      if (response.ok) {
          return response.json(); // Se a resposta for positiva, converte o retorno para JSON
      } else {
          throw new Error(error.message);
      }
    })
    .then(data => {
      console.log('Usuário cadastrado:', data);
      //TODO: Redirecionar ou tomar alguma ação após o sucesso do login
    })
    .catch(error => {
      console.error('Erro:', error);
      document.getElementById("msgError").innerText = error.message;
    });
  }