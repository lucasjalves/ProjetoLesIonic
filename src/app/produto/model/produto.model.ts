import { Serializable } from '../../common/serializable.interface';

export class Produto implements Serializable<Produto> {
    public id;
    public nome: string;
    public descricao;
    public precoCompra;
    public precoVenda: string;
    public marca;
    public modelo: string;
    public altura;
    public detalhe;
    public largura;
    public comprimento;
    public peso;
    public especificacoes;
    public codigoBarras;
    public categoria: string;
    public estoque;
    public conteudoEmbalagem;
    public ativo;
    public qtdeCarrinho = 0;
    deserialize(object: any): Produto {
        this.id = object.id;
        this.nome = object.nome;
        this.descricao = object.descricao;
        this.precoCompra = object.precoCompra;
        this.precoVenda = object.precoVenda;
        this.marca = object.marca;
        this.modelo = object.modelo;
        this.altura = object.altura;
        this.largura = object.largura;
        this.comprimento = object.comprimento;
        this.peso = object.peso;
        this.detalhe = object.detalhe;
        this.especificacoes = object.especificacoes;
        this.peso = object.peso;
        this.especificacoes = object.especificacoes;
        this.codigoBarras = object.codigoBarras;
        this.categoria = object.categoria;
        this.estoque = object.estoque;
        this.conteudoEmbalagem = object.conteudoEmbalagem;
        this.ativo = object.ativo;
        return this;
    }
    serialize() {
       return {

       };
    }

    constructor() {
    }
}
