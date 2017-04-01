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

        let negociacao = new Negociacao(
            data, 
            this._inputQuantidade.value,
            this._inputValor.value  
        )
        let diaMesAno = negociacao.data.getDate() 
            + '/' + negociacao.data.getMonth() 
            + '/' + negociacao.data.getFullYear();
    
        console.log('Data formatada: '+diaMesAno);
    }
}