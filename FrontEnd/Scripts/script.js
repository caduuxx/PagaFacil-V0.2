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
    const icpf = document.querySelector("#CPF");
    const icnpj = document.querySelector("#CNPJ");
    const inomeSocial = document.querySelector("#nomeSocial");
    const iemail = document.querySelector("#email");
    const isenha = document.querySelector("#senha");
    const isenhaRepetida = document.querySelector("#senhaRepetida");
    const itelefone = document.querySelector("#telefone");
    const iendereco = document.querySelector("#endereco");
  
    console.log(senha);
    console.log(senhaRepetida);
  
    const usuarioData = {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        cpf: cpf,
        cnpj: cnpj,
        email: email,
        senha: senha,
        telefone: telefone,
        endereco: endereco,
        

    };
  
    if(senha != confirmacaoSenha) {
      throw new Error('Senhas não estão iguais.')
    }
  
    fetch('http://localhost:8080/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioData)
    })
    .then(response => {
      if (response.ok) {
          return response.json(); // Se a resposta for positiva, converte o retorno para JSON
      } else {
          throw new Error('Erro desconhecido.');
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