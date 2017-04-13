class Negociacao {
    
    constructor(data, quantidade, valor){

        console.log(`data: ${data}`);

        this._data = new Date();
        this._quantidade = quantidade;
        this._valor = valor;

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

    set quantidade(quantidade){
        return this._quantidade = quantidade;
    }

    set valor(valor){
        return this._valor = valor;
    }
}