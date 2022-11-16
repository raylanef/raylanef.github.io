

    const linha = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2];
    const tabelaDigitoVerificador = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

    const tabelaLocalizacao = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];

    const tabelaIndiceInversao = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];



    function verificaDigitoNubank(contaCorrente) {
        let coluna = criaColuna(contaCorrente);
        let indicesLocalizacao = obterValoresLocalizacao(linha, coluna, tabelaLocalizacao);
        let coordenadas = obterCoordenadasTabelaDigitoVerificador(coluna, indicesLocalizacao);

        return obterDigitoVerificador(coordenadas);       
    }

    function criaColuna(array) {
        let arrayInvertido = [];
        let index = 0;
        while (index < array.length) {
            arrayInvertido.push(array.pop());
        }
        arrayInvertido.unshift(0);
        return arrayInvertido;
    }

    function obterValoresLocalizacao(linha, coluna, tabelaLocalizacao) {
        let indices = [];
        for (i = 0; i < coluna.length; i++) {
            let li = linha[i];
            let col = coluna[i];
            let indice = tabelaLocalizacao[li][col];
            indices.push(indice);
        }
        return indices;
    }

    function obterCoordenadasTabelaDigitoVerificador(coluna, indicesLocalizacao) {
        
        let valorVerificacao = [0];
        let indiceVerificador = [0];
        

        for (i = 0; i < coluna.length - 1; i++) {
            let indice = i + 1;
            valorVerificacao[indice] = indiceVerificador[i];
            
            let col = indicesLocalizacao[indice];
            let li = valorVerificacao[indice];
    
            indiceVerificador[indice] = tabelaIndiceInversao[li][col];
        }
        return indiceVerificador;
    }

    function obterDigitoVerificador(coordenadas){
        let indiceDigito = coordenadas[coordenadas.length - 1];
        return tabelaDigitoVerificador[indiceDigito];
    }