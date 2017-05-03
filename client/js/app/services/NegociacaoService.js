class NegociacaoService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    obterNegociacoesDaSemana() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  
       });        
    }
    
    obterNegociacoesDaSemanaAnterior() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  
       }); 
       
        
    }
    
    obterNegociacoesDaSemanaRetrasada() {
       
       return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  
       }); 
    }    
    
    
    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }    

    cadastra(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negocição adicionada com sucesso.')
            .catch(()=>  {
                throw new Error('Não foi possível adicionar a negociação.')
            });
    }

    lista(){

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listaTodos())
            .catch((erro) => {
                console.log(`Erro ao listar todos: ${erro}`);
                throw new Errror('Não foi possível listar todos.');
            });
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => 'Negociacoes apagadas com sucesso.')
            .catch((erro) => {
                console.log(`Erro ao apagar todos: ${erro}`);
                throw new Errror('Não foi possível listar todos.');
            });
    }

    importa(listAtual){
        return this.obterNegociacoes()
        .then(
            negociacoes => negociacoes.filter(negociacao => 
                !listAtual.some(negociacaoExistente =>
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                )
            )
        ).catch((erro) => {
            console.log(`Erro ao apagar todos: ${erro}`);
            throw new Errror('Não foi possível listar todos.');
        });
    }
}

