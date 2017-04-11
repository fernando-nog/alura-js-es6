class ListaNegociacoes {

    constructor(context, eventClosure){
        this._negociacoes = [];
        this._eventClosure = eventClosure;
        this._context = context;
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        this._eventClosure(this);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        this._eventClosure(this);
    }

    _execReflect(){
        Reflect.apply(this._eventClosure, this._context, [this]);
    }
}