const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logaut)');

sideLinks.forEach(item =>{
    const li =  item.parentElement;
    item.addEventListener('click', () =>{
        sideLinks.forEach(i =>{
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar')
 
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector(' .content nav form .form-input button');
const searchBtnIcon = document.querySelector(' .content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

// searchBtn.addEventListener('click', function (e){
//     if(window.innerWidth < 576){
//         e.preventDefault;
//         searchForm.classList.toggle('show');
//         if(searchForm.classList.contains('show')){
//             searchBtnIcon.classList.replace('bx-search','bx-x');
//         }else{
//             searchBtnIcon.classList.replace('bx-x','bx-search');
//         }
//     }
// });

window.addEventListener('resize', () =>{
    if(window.innerWidth < 768){
        sideBar.classList.add('close');
    }else{
        sideBar.classList.remove('close');
    }
    // if(window.innerWidth > 576){
    //     searchBtnIcon.classList.replace('bx-x','bx-search');
    //     searchForm.classList.remove('show');
    // }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if(this.checked){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
    }
});

// User Page

// document.querySelector('.btn-edit').addEventListener('click', function() {
//     alert('Abrir modal para editar perfil');
// });

// document.querySelector('.btn-password').addEventListener('click', function() {
//     alert('Abrir modal para alterar senha');
// });

var icone = document.getElementById("icone");
            icone =  localStorage.getItem('valueText');
            console.log(icone);

// async function buscarCliente() {
//     try {
//         const response = await fetch("http://localhost:8080/cliente/listar");
//         if (!response.ok) {
//             throw new Error("Erro ao listar cliente.");
//         }
//         const cliente = await response.json();
//         atualizarTabela(cliente);
//     } catch (error) {
//         alert(error.message);
//     }
// }


// function atualizarTabela(clientes) {
//     const tabelaClientes = document.getElementById("tabela-clientes");
//     tabelaClientes.innerHTML = "";

//     const clientesFiltrados = clientes.filter((cliente) => cliente.cnpj == "1241");


//     clientesFiltrados.forEach((cliente) => {
//        document.getElementById("email").value = "a";
//        });
// }