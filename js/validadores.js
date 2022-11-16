
function descobreDigitoVerificadorConta() {
    let selectBox = document.getElementById("select-banco").value;
    let contaCorrente = document.getElementById("input-conta-corrente").value;
    let agencia = document.getElementById("input-agencia").value;
    let arrayConta = contaCorrente.split("");
    let arrayAgencia = agencia.split("");
    apagaPosicaoVazia(arrayConta);
    apagaPosicaoVazia(arrayAgencia);
    let digitoVerificador;


    switch(selectBox){
        case "1":
            digitoVerificador = verificaDigitoBancoBrasil(arrayConta);
            break;
        case "2":
            digitoVerificador = verificaDigitoBradesco(arrayConta);
            break;
        case "3":
            digitoVerificador = verificaDigitoCaixa(arrayConta, arrayAgencia);
            break;
        case "4":
            digitoVerificador = verificaDigitoItau(arrayConta, arrayAgencia);
            break;
        case "5":
            digitoVerificador = verificaDigitoNubank(arrayConta);
            break;
        default:
            exibeMensagemErro("Banco não selecionado");
    }

    if(isNaN(digitoVerificador) || digitoVerificador == undefined){
        return exibeMensagemErro("Deu ruim :(");
    }

    if (digitoVerificador != undefined) {
        let mensagem = `O dígito da conta corrente informada é ${digitoVerificador} <br>
                         <b>Conta Corrente:</b> ${contaCorrente}-${digitoVerificador} <br>`;
        mensagem = agencia != "" ? mensagem + `<b>Agência:</b> ${agencia}` : mensagem;       
        div.innerHTML = mensagem;
        $("#myModal").modal('toggle');
    }
   
}

function verificaDigitoBancoBrasil(arrayConta) {
    let arrayMultiplicadores = [9, 8, 7, 6, 5, 4, 3, 2];
    arrayConta = arrayConta.length < 8 ?
        adicionaNumerosNaConta(8, arrayConta) : arrayConta;
    let somaTotal = somaNumeros(arrayConta, arrayMultiplicadores);
    let modulo = 11 - (somaTotal % 11);
    if (modulo == 10) return 0;
    if (modulo == 11) return "X";
    return modulo;
}

function verificaDigitoBradesco(arrayConta) {
    arrayConta = arrayConta.length < 8 ?
    adicionaNumerosNaConta(8, arrayConta) : arrayConta;
    console.log(arrayConta);
    let arrayMultiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];
    let somaTotal = somaNumeros(arrayConta, arrayMultiplicadores);
    console.log("Soma total: " + somaTotal);
    let modulo = (somaTotal % 11);
    if (modulo == 0) return 0;
    if (modulo == 1) return "P";
    return (11 - modulo);
}


function verificaDigitoCaixa(arrayConta, arrayAgencia) {
    let arrayMultiplicadores = [8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    arrayConta = arrayConta.length < 11 ?
        adicionaNumerosNaConta(11, arrayConta) : arrayConta;
    let arrayFinal = arrayAgencia.concat(arrayConta);

    let somaTotal = somaNumeros(arrayFinal, arrayMultiplicadores);
    let somaFinal = (somaTotal * 10);
    let modulo = parseInt((somaFinal / 11), 10) * 11;
    let valorFinal = somaFinal - modulo;
    if (valorFinal == 10) return 0;
    return valorFinal;
}

function verificaDigitoItau(arrayConta, arrayAgencia) {
    let somaTotal = 0;
    let arrayMultiplicadores = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    arrayConta = arrayConta.length < 5 ?
    adicionaNumerosNaConta(5, arrayConta) : arrayConta;
    let arrayFinal = arrayAgencia.concat(arrayConta);
    for (let i = 0; i < arrayFinal.length; i++) {
        let numero = parseInt(arrayFinal[i]) * arrayMultiplicadores[i];
        console.log(numero);
        somaTotal += numero > 9 ? splitInteiro(numero) : numero;

    }
    let valorFinal = 10 - (somaTotal % 10);
    if (valorFinal == 10) return 0;
    return valorFinal;

}

function splitInteiro(numero) {
    return parseInt((numero / 10), 10) + numero % 10;
}

function apagaPosicaoVazia(array) {
    let posicaoVazia = " ";
    let indice = array.indexOf(posicaoVazia);
    while (indice >= 0) {
        array.splice(indice, 1);
        indice = array.indexOf(posicaoVazia);
    }
}

function adicionaNumerosNaConta(qtdNumerosConta, arrayConta) {
    for (i = qtdNumerosConta - arrayConta.length; i > 0; i--) {
        arrayConta.unshift(0);
    }
    console.log("Passou no adiciona: " + arrayConta);
    return arrayConta;
}

function somaNumeros(arrayFinal, arrayMultiplicadores) {
    let soma = 0;
    for (i = 0; i < arrayFinal.length; i++) {
        soma += parseInt(arrayFinal[i]) * arrayMultiplicadores[i];
        console.log(soma)
    }
    return soma;
}

function exibeMensagemErro(mensagem){
    let alerta = document.getElementById('alerta-agencia');
    alerta.style.display = 'block';
    alerta.innerHTML = mensagem;
}

function escondeAlert(){
    let alerta = document.getElementById('alerta-agencia');
    alerta.style.display = 'none';
}

function desabilitaBotao(condicao){
    let botao = document.getElementById("botao");
    botao.disabled = condicao;
}

function verificaBancoSelecionado(){
    let selectBox = document.getElementById("select-banco").value;
    let inputAgencia = document.getElementById('div-agencia');
    let bancoSelecionado = selectBox == "3" || selectBox == "4";
    if(bancoSelecionado){
        inputAgencia.style.display = 'block';
        return;
    }
    inputAgencia.style.display = 'none';
}

function verificaInputAgencia(){
    let agencia = document.getElementById("input-agencia").value;
    let agenciaInvalida = agencia.length > 4;
    
    if(agencia == ""){
        exibeMensagemErro("Campo agência está vazio!");
        desabilitaBotao(true);
        return;
    }

    if(agenciaInvalida){
        exibeMensagemErro("Número de agência inválido");
        desabilitaBotao(true);
        return;
    }
    escondeAlert();
    desabilitaBotao(false);
    
}

function verificaInputContaCorrente(){
    let contaCorrente = document.getElementById("input-conta-corrente").value;
    if(contaCorrente == ""){
        exibeMensagemErro("Campo conta corrente está vazio!");
        desabilitaBotao(true);
        return;
    }
    escondeAlert();
    desabilitaBotao(false);
}

