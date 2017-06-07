'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Model Pattern
var ConnectionFactory = function () {

    var stores = ['negociaceos'];
    var version = 4;
    var dbNAme = 'aluraframe';

    var connection = null;

    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('Não é possível criar instâncias de Connection.');
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {

                return new Promise(function (resolve, reject) {
                    var openRequest = window.indexedDB.open(dbNAme, version);

                    openRequest.onupgradeneeded = function (event) {

                        ConnectionFactory._createStore(event.target.result);
                    };

                    openRequest.onsuccess = function (event) {

                        if (!connection) {
                            connection = event.target.result;
                            close = connection.close.bind(connection);
                            connection.close = function () {
                                throw new Error('Não é possível fechar a conexão diretamente.');
                            };
                        }
                        resolve(event.target.result);
                    };

                    openRequest.onerror = function (event) {
                        reject(event.target.error.name);
                    };
                });
            }
        }, {
            key: '_createStore',
            value: function _createStore(connection) {
                stores.forEach(function (store) {

                    if (connection.objectStoreNames.contains(store)) connection.objectDeleteStore(store);

                    connection.createObjectStore(store, { autoIncrement: true });
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connection) {
                    close();
                    connection = null;
                }
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map