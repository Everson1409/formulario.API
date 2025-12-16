// Carregar os dados do Localstorage
import { Usuario } from "./classes.js";
import { somenteNumeros, cepValido , buscarCep, salvarLocalStorage, carregarLocalStorage } from "./utils.js";

const campos = {
   nome : document.getElementById("nome"),
    cep: document.getElementById("cep"),
    logradouro: document.getElementById("logradouro"),
    bairro: document.getElementById("bairro"),
    cidade: document.getElementById("cidade"), 
    estado: document.getElementById("estado"),
    numero: document.getElementById("numero")
};
    const form = document.getElementById("formCadastro");
    const mensagem = document.getElementById("mensagem");

    campos.cep.addEventListener("blur", async () => {
    const cep = somenteNumeros(campos.cep.value);


    if (!cepValido(cep)) {
    mensagem.textContent = "CEP inválido";
    return;
    }

        try{
            const dados = await buscarCep(cep); 

        campos.logradouro.value = dados.logradouro || "";
        campos.bairro.value = dados.bairro || "";
        campos.cidade.value = dados.localidade || "";
        campos.estado.value = dados.uf || "";   
        
          mensagem.textContent = "";
          
        } catch{

            mensagem.textContent = "Erro ao buscar CEP";    
        }

          

    });

    form.addEventListener("submit", (e) =>{
        e.preventDefault(); 

        const usuario = new Usuario(

        campos.nome.value,
        campos.cep.value,
        campos.logradouro.value, 
        campos.bairro.value, 
        campos.cidade.value,
        campos.estado.value,
        campos.numero.value,
        );

        salvarLocalStorage("dadosUsuario" , usuario);
        mensagem.textContent = "Dados salvos com sucesso!"

    

      });




  
