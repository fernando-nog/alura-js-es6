import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';

export class NegociacaoController {

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

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init(){

        this._negociacaoService
        .lista()
        .then(negociacoes => 
            negociacoes.forEach(negociacao =>
                this._listaNegociacoes.adiciona(negociacao))
        ) 
        .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event){

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._negociacaoService
            .cadastra(negociacao)
            .then( mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso.';
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro); 
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

        this._negociacaoService
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro); 
    }

    importaNegociacoes(){
        
        this._negociacaoService
        .importa(this._listaNegociacoes.negociacoes)
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