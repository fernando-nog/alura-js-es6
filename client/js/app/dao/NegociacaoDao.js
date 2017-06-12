'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoDAO', NegociacaoDAO = function () {
                function NegociacaoDAO(connection) {
                    _classCallCheck(this, NegociacaoDAO);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDAO, [{
                    key: 'adiciona',
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (event) {
                                console.log('Negociação incluida com sucesso.');
                                resolve();
                            };

                            request.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Não foi possível incluir a negociação.');
                            };
                        });
                    }
                }, {
                    key: 'listaTodos',
                    value: function listaTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._connection.transaction(['negociacoes'], 'readwrite').objectStore('negociacoes').openCursor();

                            var negociacoes = [];

                            cursor.onsuccess = function (event) {
                                var ponteiroNegociacao = event.target.result;

                                if (ponteiroNegociacao) {
                                    var dado = ponteiroNegociacao.value;
                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                                    ponteiroNegociacao.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (event) {
                                console.log(event.target.error.name);
                            };
                        });
                    }
                }, {
                    key: 'apagaTodos',
                    value: function apagaTodos() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction(['negociacoes'], 'readwrite').objectStore('negociacoes').clear();

                            request.onsuccess = function (event) {
                                resolve('Todas as negocições foram apagas com sucesso.');
                            };

                            request.onerror = function (event) {
                                console.log(event.target.error);
                                reject('Não foi possível apagar todas a negociações');
                            };
                        });
                    }
                }]);

                return NegociacaoDAO;
            }());

            _export('NegociacaoDAO', NegociacaoDAO);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map