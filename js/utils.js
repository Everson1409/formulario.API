
export const somenteNumeros = (valor) => valor.replace(/\D/g, "");

export const cepValido = (cep) => cep.length === 8;

export const buscarCep = async (cep) => { 

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    return resposta.json();

};

 export const salvarLocalStorage = (chave, dados) => 
    localStorage.setItem(chave , JSON.stringify(dados));

export const carregarLocalStorage = (chave) =>
    JSON.parse(localStorage.getItem(chave));