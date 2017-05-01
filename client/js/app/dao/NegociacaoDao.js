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
}