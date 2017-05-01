//Model Pattern
var ConnectionFactory = (function (){

    const stores = ['negociaceos'];
    const version = 4;
    const dbNAme = 'aluraframe';

    var connection = null;

    var close = null;

    return class ConnectionFactory {

        constructor(){
            throw new Error('Não é possível criar instâncias de Connection.');
        }

        static getConnection(){

            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbNAme, version);

                openRequest.onupgradeneeded = (event) => {
                    
                    ConnectionFactory._createStore(event.target.result);
                }

                openRequest.onsuccess = (event) => {
                    
                    
                    if(!connection){ 
                        connection = event.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error('Não é possível fechar a conexão diretamente.');
                        }
                    }
                    resolve(event.target.resolve);
                }

                openRequest.onerror = (event) => {
                    reject(event.target.error.name);
                }
            });
        }

        static _createStore(connection){
            stores.forEach((store) => {

                if(connection.objectStoreNames.contains(store)) connection.objectDeleteStore(store);
                
                connection.createObjectStore(store, {autoIncrement: true});

            });
        }

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }

    }
})();