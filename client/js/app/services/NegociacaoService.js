class NegociacoesService {


    obeterNegociacoesDaSemana(){
        const READY_STATE_SUCESS = 4;
        const STATUS_CODE_OK = 200;

        let xhr = new XMLHttpRequest();

        console.log('Importando negociação');
        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == READY_STATE_SUCESS && xhr.status == STATUS_CODE_OK){

                console.log('Obetendo as negociações do servidor.');

                console.log(JSON.parse(xhr.responseText));

                JSON.parse(xhr.responseText)
                .map( objeto => {new Negociacao(objeto.data, objeto.quantidade, objeto.valor)})
                .forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));

                this._mensagem.texto = 'Negociações importadas com sucesso.';
            }else{
                console.log('Não foi possível obter as negociações da semana.');
            }
        };
        
        xhr.send();
    }
}