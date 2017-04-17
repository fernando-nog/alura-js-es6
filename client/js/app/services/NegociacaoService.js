class NegociacaoService {

    constructor(){
        this._READY_STATE_SUCESS = 3;
        this._STATUS_CODE_OK = 200;
    }
    
    obterNegociacoesDaSemana(){

        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/semana');

            xhr.onreadystatechange = () => {

                if(xhr.readyState == this._READY_STATE_SUCESS && xhr.status == this._STATUS_CODE_OK && xhr.responseText != ""){
                     
                    let listaNegociacoesLocal = JSON.parse(xhr.responseText)
                    .map( n => new Negociacao(n.data, n.quantidade, n.valor));
                    
                    resolve(listaNegociacoesLocal)
                }else{
                    let error = 'Não foi possível obter as negociações da semana.';
                    console.log(error);
                    reject(error);
                }
            };
            
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaRetrasada(){


        return new Promise((resolve, reject)=>{

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');

            xhr.onreadystatechange = () => {
                if(xhr.readyState == _READY_STATE_SUCESS && xhr.status == _STATUS_CODE_OK){
                    
                    let listaNegociacoesLocal = JSON.parse(xhr.responseText)
                    .map( n => new Negociacao(n.data, n.quantidade, n.valor));

                    resolve(listaNegociacoesLocal)
                }else{
                    let error = 'Não foi possível obter as negociações da semana retrasada.';
                    console.log(error);
                    reject(error);
                }
            };
            
            xhr.send();

        });
    }

     obterNegociacoesDaSemanaAnterior(callBack){

        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');

            xhr.onreadystatechange = () => {
                if(xhr.readyState == _READY_STATE_SUCESS && xhr.status == _STATUS_CODE_OK){
                    
                    let listaNegociacoesLocal = JSON.parse(xhr.responseText)
                    .map( n => new Negociacao(n.data, n.quantidade, n.valor));

                    resolve(listaNegociacoesLocal);
                }else{
                    let error = 'Não foi possível obter as negociações da semana anterior.';
                    console.log(error);
                    reject(error);
                }
            };
            
            xhr.send();
        });
    }
}