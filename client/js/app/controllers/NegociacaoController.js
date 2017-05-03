class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacaoView($('#negociacoesView')),
            ['adiciona','esvazia']
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView( $('#mensagemView') ),
            ['texto']
        );

        this._init();
    }

    _init(){
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao))
            ) 
            .catch((erro) => {
                console.log(`Erro ao listar todos: ${erro}`);
                this._mensagem.texto = erro;
            });

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event){

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then((connection) => {
                let negociacao = this._criaNegociacao();

                new NegociacaoDAO(connection)
                    .adiciona(negociacao)
                    .then( () => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso.';
                        this._limpaFormulario();
                    })
            })
            .catch((erro) => {
                console.log(erro);
                this._mensagem.texto = erro;
            });
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)  
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    apaga(){
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
    }

    importaNegociacoes(){
        let service = new NegociacaoService();

        service
        .obterNegociacoes()
        .then(
            negociacoes => negociacoes.filter(negociacao => 
                !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                )
            )
        )
        .then(
            negociacoes => {
                negociacoes
                    .reduce((arrayTransformado, array) => arrayTransformado.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
            }
        ).catch(erro => this._mensagem.texto = erro);

    }
}