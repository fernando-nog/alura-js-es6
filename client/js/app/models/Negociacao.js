class Negociacao {
    
    constructor(data, quantidade, valor){

        this._data = new Date();
        this._quantidade = 1;
        this._valor = 0;

        Object.freeze(this);
    }

    get volume(){
        return this.quantidade * this.valor;
    }

    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}