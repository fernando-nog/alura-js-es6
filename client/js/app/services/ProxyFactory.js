class ProxyFactory {


    static create(target, props, action){
        return new Proxy(new ListaNegociacoes(), {

            get(target, props, receiver){

                if(['adiciona','esvazia'].includes(props) && typeof(target[props]) == typeof(Function) ){

                    return function(){
                        Reflect.apply(target[props], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, props, receiver);
            }
        });
    }
}