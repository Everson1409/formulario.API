// Carregar os dados do Localstorage
window.onload = function () {
    const dadosSalvos = JSON.parse(localStorage.getItem("dadosUsuario"));

    if (dadosSalvos) {
        document.getElementById("nome").value = dadosSalvos.nome || "";
        document.getElementById("cep").value = dadosSalvos.cep || "";
        document.getElementById("logradouro").value = dadosSalvos.logradouro || "";
        document.getElementById("bairro").value = dadosSalvos.bairro || "";
        document.getElementById("cidade").value = dadosSalvos.cidade || "";
        document.getElementById("estado").value = dadosSalvos.estado || "";
        document.getElementById("numero").value = dadosSalvos.numero || "";
    }

    // Quando sair do campo CEP
    document.getElementById("cep").addEventListener("blur", (evento) => {

        const elemento = evento.target;
        const cepInformado = elemento.value;

        // Remover caracteres não numéricos
        const cep = cepInformado.replace(/\D/g, '');
        if (cep.length !== 8) {
            alert("CEP invalido. Digite 8 números.");
            return;
        }

        // Buscar no ViaCep
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("logradouro").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => console.error("Erro ao buscar o CEP:", error));
    });

    // Botão para salvar no LocalStorage
    document.getElementById("salvar").addEventListener("click", function () {
        const dados = {
            nome: document.getElementById("nome").value,
            cep: document.getElementById("cep").value,
            logradouro: document.getElementById("logradouro").value,
            bairro: document.getElementById("bairro").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            numero: parseFloat(document.getElementById("numero").value)
        };

        localStorage.setItem("dadosUsuario", JSON.stringify(dados));

        alert("Dados salvos com sucesso!");
    });
};
