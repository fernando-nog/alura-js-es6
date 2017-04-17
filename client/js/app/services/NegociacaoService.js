class NegociacaoService {


    obterNegociacoesDaSemana(callBack){
        const READY_STATE_SUCESS = 4;
        const STATUS_CODE_OK = 200;

        let xhr = new XMLHttpRequest();

        console.log('Importando negociação');
        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == READY_STATE_SUCESS && xhr.status == STATUS_CODE_OK){
                
                let listaNegociacoesLocal = JSON.parse(xhr.responseText)
                .map( n => new Negociacao(n.data, n.quantidade, n.valor));

                callBack(null, listaNegociacoesLocal)
            }else{
                let error = 'Não foi possível obter as negociações da semana.';
                console.log(error);
                callBack(error);
            }
        };
        
        xhr.send();
    }

    obterNegociacoesDaSemanaRetrasada(callBack){
        const READY_STATE_SUCESS = 4;
        const STATUS_CODE_OK = 200;

        let xhr = new XMLHttpRequest();

        console.log('Importando negociação');
        xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == READY_STATE_SUCESS && xhr.status == STATUS_CODE_OK){
                
                let listaNegociacoesLocal = JSON.parse(xhr.responseText)
                .map( n => new Negociacao(n.data, n.quantidade, n.valor));

                callBack(null, listaNegociacoesLocal)
            }else{
                let error = 'Não foi possível obter as negociações da semana.';
                console.log(error);
                callBack(error);
            }
        };
        
        xhr.send();
    }

     obterNegociacoesDaSemanaAnterior(callBack){
        const READY_STATE_SUCESS = 4;
        const STATUS_CODE_OK = 200;

        let xhr = new XMLHttpRequest();

        console.log('Importando negociação');
        xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == READY_STATE_SUCESS && xhr.status == STATUS_CODE_OK){
                
                let listaNegociacoesLocal = JSON.parse(xhr.responseText)
                .map( n => new Negociacao(n.data, n.quantidade, n.valor));

                callBack(null, listaNegociacoesLocal)
            }else{
                let error = 'Não foi possível obter as negociações da semana.';
                console.log(error);
                callBack(error);
            }
        };
        
        xhr.send();
    }
}