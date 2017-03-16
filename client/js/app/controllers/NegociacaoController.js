class NegociacaoController {

    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event){
        event.preventDefault();

        let data = new Date(
            ...this._inputData.value
                .split('-')
                .map( (item, indice) =>  item - indice % 2 )
        );
        console.log(data);

        let nefociacao = new nefociacao(
            data, 
            this._inputQuantidade.value,
            this._inputValor.value  
        )
    }
}