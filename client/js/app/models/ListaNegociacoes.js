class ListaNegociacoes {

    constructor(context, eventClosure){
        this._negociacoes = [];
        this._eventClosure = eventClosure;
        this._context = context;
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        this._execReflect();
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        this._execReflect();
    }

    _execReflect(){
        Reflect.apply(this._eventClosure, this._context, [this]);
    }
}