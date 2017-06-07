class NegociacaoDAO {

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (event) => {
                console.log('Negociação incluida com sucesso.');
                resolve();
            };

            request.onerror = (event) => {
                console.log(event.target.error);
                reject('Não foi possível incluir a negociação.');
            };
        });
    }

    listaTodos(){

        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction(['negociacoes'],'readwrite')
                .objectStore('negociacoes')
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = (event) => {
                let ponteiroNegociacao = event.target.result;

                if(ponteiroNegociacao){
                    var dado =  ponteiroNegociacao.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    ponteiroNegociacao.continue();
                }else{
                    resolve(negociacoes);
                }
            };

            cursor.onerror = (event) => {
                console.log(event.target.error.name);
            };
        });
    }

    apagaTodos(){
        return new Promise((resolve, reject) =>{
            let request = this._connection
                .transaction(['negociacoes'],'readwrite')
                .objectStore('negociacoes')
                .clear();

            request.onsuccess = (event) => {
                resolve('Todas as negocições foram apagas com sucesso.');
            };

            request.onerror = (event) => {
                console.log(event.target.error);
                reject('Não foi possível apagar todas a negociações');
            };
        });
    }
}