'use strict';

System.register(['../models/ListaNegociacoes'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, _typeof, _createClass, ProxyFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

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

            _export('ProxyFactory', ProxyFactory = function () {
                function ProxyFactory() {
                    _classCallCheck(this, ProxyFactory);
                }

                _createClass(ProxyFactory, null, [{
                    key: 'create',
                    value: function create(target, props, action) {
                        return new Proxy(new ListaNegociacoes(), {
                            get: function get(target, props, receiver) {

                                if (['adiciona', 'esvazia'].includes(props) && ProxyFactory._ehFuncao(target[props])) {

                                    return function () {
                                        Reflect.apply(target[props], target, arguments);
                                        return action(target);
                                    };
                                }
                                return Reflect.get(target, props, receiver);
                            },
                            set: function set(target, prop, value, receiver) {

                                var retorno = Reflect.set(target, prop, value, receiver);
                                if (props.includes(prop)) acao(target);
                                return retorno;
                            }
                        });
                    }
                }, {
                    key: '_ehFuncao',
                    value: function _ehFuncao(func) {
                        return (typeof func === 'undefined' ? 'undefined' : _typeof(func)) == (typeof Function === 'undefined' ? 'undefined' : _typeof(Function));
                    }
                }]);

                return ProxyFactory;
            }());

            _export('ProxyFactory', ProxyFactory);
        }
    };
});
//# sourceMappingURL=ProxyFactory.js.map