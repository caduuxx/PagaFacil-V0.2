const formulario = document.querySelector("form");
const botao = document.querySelector("btn");
const icnpj = document.querySelector("username");
const iemail = document.querySelector("email");
const isenha = document.querySelector("senha");
const isenhaRepetida = document.querySelector("senha");

function compararSenhas(){
    if (isenha.value == isenhaRepetida.value){
        cadastrar;
    }
    else {
        console.log("As senhas devem coincidir")
    }
}
function cadastrar(){
    fetch("http://localhost:5432/cliente",
        {
            headers:{
                "Accept": "application/json",
                "Content=Type": "application/json"
            },
            method:"POST",
            body: JSON.stringify({
                cnpj: icnpj.value,
                email: iemail.value,
                senha: isenha.value
            })
        }
    )
    .then(function (res){console.log(res)})
    .catch(function (res){console.log(res)})
}

function limpar(){
    icnpj.value = ""
    iemail.value = ""
    isenha.value = ""
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    compararSenhas
});