class ProxyFactory {

    static create(target, props, action){
        return new Proxy(new ListaNegociacoes(), {

            get(target, props, receiver){

                if(['adiciona','esvazia'].includes(props) && ProxyFactory._ehFuncao(target[props])){

                    return function(){
                        Reflect.apply(target[props], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, props, receiver);
            },

            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) acao(target);
                return retorno; 
            }
        });
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function) ;
    }
}