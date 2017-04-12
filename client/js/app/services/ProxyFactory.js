class ProxyFactory {


    static create(target, props, action){

        new Proxy(new ListaNegociacoes(), {

            get(target, props, receiver){

                if(['adiciona','esvazia'].includes(prop) && typeof(target[props]) == typeof(Function) ){

                    return function(){
                        console.log(`interceptor: ${props}`);
                        Reflect.apply(target[props], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, props, receiver);
            }
        });
    }
}