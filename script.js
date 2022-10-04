// No via CEP viacep.com.br/ws/01001000/json/
// Pode resultar em duas situações a consulta a API - Rejeitada ou fulfilled

// O objeto do tipo response retorna um corpo de resposta inacessivel, 
// dessa forma usamos o JSON para
// conseguir acessa-lo

// O corpo da resposta de uma requisição chega em formato de bytes. 
// Desta forma o .json() transforma o corpo e retorna um json formatado. O formato 
// JSON (JavaScript Object Notation) possui basicamente a mesma sintaxe que a de um objeto JS.


async function buscaEndereco(cep) {
    // Atribuindo uma mensagem de erro em branco de inicio
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML ="";
    try{
        // Criada variavel consultaCEP palavra-chave await recebe uma Promise 
        // e a transforma em um valor de retorno (ou lança uma exceção em caso de erro). 
        // Quando utilizamos await, o JavaScript vai aguardar até que a Promise finalize
        // Template strings - composto pela crase e pelo cifrão e chaves `${}`
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error('CEP não existente');
        }
        // Acessando cada campo
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        // Dando os valores para cada campo
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;


        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    }catch(erro){
        // Atribuindo uma mensagem de erro em caso de formato inválido
        mensagemErro.innerHTML =`<p>CEP inválido. Tente novamente </p>`;
        console.log(erro);
    }
}

// Criada variavel cep buscando o id do elemento
var cep = document.getElementById('cep');

// Criado o escutador de EventCounts, focusout é um evento quando a pessoa clica em outro local
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

// ASYNC Await - declarando uma função assincrona
// foi declarada para facilitara a leitura dos codigos assincronos
// Await so é aceita em função assincrona
// A declaração async function define uma função assíncrona e o operador await é utilizado 
// para esperar por uma Promise. Dessa maneira, nossa requisição funcionará corretamente.

// Toda promise retorna esse dois metodos:
// then() - caso for resolvida
// Em qualquer uma dessa situações retornara um OBJETO do tipo response
// e para acessa-lo usaremos o then()

//catch() - caso for recusada

// finally() -  ele executa uma ação quando o carregamento for finalizado